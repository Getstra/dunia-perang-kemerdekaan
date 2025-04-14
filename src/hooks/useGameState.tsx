
import { useState, useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { GameState, BuildingType, Kingdom } from '@/utils/types';
import { 
  getInitialState, 
  updateGameState, 
  saveGame, 
  loadGame, 
  logAction, 
  createKingdom as createLocalKingdom
} from '@/utils/gameLogic';

export const useGameState = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [gameState, setGameState] = useState<GameState>(getInitialState());
  const [loading, setLoading] = useState(true);

  // Load user kingdom data from Supabase
  useEffect(() => {
    const fetchUserKingdom = async () => {
      try {
        if (!user) return;
        
        setLoading(true);
        
        // Check if user has a kingdom
        const { data: kingdoms, error: kingdomError } = await supabase
          .from('kingdoms')
          .select('*')
          .eq('profile_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1);
        
        if (kingdomError) throw kingdomError;
        
        // If no kingdom, use initial state
        if (!kingdoms || kingdoms.length === 0) {
          setGameState(getInitialState());
          setLoading(false);
          return;
        }
        
        const kingdom = kingdoms[0];
        
        // Fetch kingdom resources
        const { data: resources, error: resourcesError } = await supabase
          .from('resources')
          .select('*')
          .eq('kingdom_id', kingdom.id)
          .single();
        
        if (resourcesError) throw resourcesError;
        
        // Fetch kingdom buildings
        const { data: buildings, error: buildingsError } = await supabase
          .from('buildings')
          .select('*')
          .eq('kingdom_id', kingdom.id);
        
        if (buildingsError) throw buildingsError;
        
        // Fetch kingdom logs
        const { data: logs, error: logsError } = await supabase
          .from('game_logs')
          .select('*')
          .eq('kingdom_id', kingdom.id)
          .order('timestamp', { ascending: false })
          .limit(50);
        
        if (logsError) throw logsError;
        
        // Convert database data to game state
        const loadedState: GameState = {
          kingdom: {
            id: kingdom.id,
            name: kingdom.name,
            ruler: kingdom.ruler,
            age: kingdom.age,
            lastUpdated: new Date(kingdom.last_updated).getTime(),
          },
          resources: {
            gold: resources.gold,
            land: resources.land,
            population: resources.population,
            food: resources.food,
            wood: resources.wood,
            stone: resources.stone,
            specialists: {
              farmers: resources.farmers,
              miners: resources.miners,
              soldiers: resources.soldiers,
              scholars: resources.scholars,
            },
          },
          buildings: buildings.map(b => ({
            id: b.id,
            name: b.name,
            level: b.level,
            type: b.type as BuildingType,
            cost: {}, // This would need to be handled differently
            production: {}, // This would need to be handled differently
            description: '',
            constructionTime: 0,
            completed: b.completed,
            completionTime: b.completion_time ? new Date(b.completion_time).getTime() : undefined,
          })),
          actions: logs.map(log => ({
            type: log.type,
            message: log.message,
            timestamp: new Date(log.timestamp).getTime(),
          })),
          gameStarted: true,
        };
        
        setGameState(loadedState);
      } catch (error: any) {
        console.error('Error loading kingdom:', error);
        toast({
          title: 'Error',
          description: 'Failed to load your kingdom data.',
          variant: 'destructive',
        });
        setGameState(getInitialState());
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserKingdom();
  }, [user, toast]);
  
  // If no server data, load from local storage
  useEffect(() => {
    if (!loading && !gameState.gameStarted) {
      const savedGame = loadGame();
      if (savedGame) {
        setGameState(savedGame);
      }
    }
  }, [loading, gameState.gameStarted]);
  
  // Update the game state every minute
  useEffect(() => {
    if (!gameState.gameStarted) return;
    
    // Update once immediately 
    setGameState(currentState => updateGameState(currentState));
    
    // Then set up interval
    const interval = setInterval(() => {
      setGameState(currentState => {
        const updatedState = updateGameState(currentState);
        
        // If using local storage, save locally
        if (!user) {
          saveGame(updatedState);
        }
        
        return updatedState;
      });
    }, 60000); // 1 minute
    
    return () => clearInterval(interval);
  }, [gameState.gameStarted, user]);

  // Handle creating a new kingdom
  const createKingdom = async (name: string, ruler: string) => {
    try {
      setLoading(true);
      
      const newKingdom: Kingdom = createLocalKingdom(name, ruler);
      
      const newGameState: GameState = {
        ...gameState,
        kingdom: newKingdom,
        gameStarted: true,
        actions: logAction(gameState, 'KINGDOM_FOUNDED', `The kingdom of ${name} was founded by ${ruler}.`),
      };
      
      // If user is authenticated, save to database
      if (user) {
        // Insert kingdom
        const { data: kingdomData, error: kingdomError } = await supabase
          .from('kingdoms')
          .insert({
            profile_id: user.id,
            name: name,
            ruler: ruler,
            age: 0,
          })
          .select()
          .single();
        
        if (kingdomError) throw kingdomError;
        
        // Insert resources
        const { error: resourcesError } = await supabase
          .from('resources')
          .insert({
            kingdom_id: kingdomData.id,
            gold: newGameState.resources.gold,
            land: newGameState.resources.land,
            population: newGameState.resources.population,
            food: newGameState.resources.food,
            wood: newGameState.resources.wood,
            stone: newGameState.resources.stone,
            farmers: newGameState.resources.specialists.farmers,
            miners: newGameState.resources.specialists.miners,
            soldiers: newGameState.resources.specialists.soldiers,
            scholars: newGameState.resources.specialists.scholars,
          });
        
        if (resourcesError) throw resourcesError;
        
        // Insert initial buildings
        for (const building of gameState.buildings) {
          const { error: buildingError } = await supabase
            .from('buildings')
            .insert({
              kingdom_id: kingdomData.id,
              name: building.name,
              type: building.type,
              level: 0,
              completed: true,
            });
          
          if (buildingError) throw buildingError;
        }
        
        // Insert initial log
        const { error: logError } = await supabase
          .from('game_logs')
          .insert({
            kingdom_id: kingdomData.id,
            type: 'KINGDOM_FOUNDED',
            message: `The kingdom of ${name} was founded by ${ruler}.`,
          });
        
        if (logError) throw logError;
        
        // Update kingdom ID in game state
        newGameState.kingdom.id = kingdomData.id;
        
        toast({
          title: 'Kingdom Created',
          description: `Your kingdom ${name} has been founded!`,
        });
      } else {
        // Use local storage if no user
        saveGame(newGameState);
      }
      
      setGameState(newGameState);
    } catch (error: any) {
      console.error('Error creating kingdom:', error);
      toast({
        title: 'Error',
        description: 'Failed to create your kingdom.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Handle starting a new game
  const startNewGame = () => {
    // If game already started, confirm reset
    if (gameState.gameStarted) {
      if (!window.confirm('Are you sure you want to abandon your kingdom and start anew?')) {
        return;
      }
    }
    
    setGameState(getInitialState());
  };
  
  // Handle save game
  const saveGameState = async () => {
    try {
      // Add a save action to the log
      const updatedState = {
        ...gameState,
        actions: logAction(gameState, 'GAME_SAVED', 'Your kingdom progress has been saved.'),
      };
      
      // If user is authenticated, save to database
      if (user && gameState.kingdom.id) {
        // Update kingdom
        const { error: kingdomError } = await supabase
          .from('kingdoms')
          .update({
            name: updatedState.kingdom.name,
            ruler: updatedState.kingdom.ruler,
            age: updatedState.kingdom.age,
            last_updated: new Date().toISOString(),
          })
          .eq('id', updatedState.kingdom.id);
        
        if (kingdomError) throw kingdomError;
        
        // Update resources
        const { error: resourcesError } = await supabase
          .from('resources')
          .update({
            gold: updatedState.resources.gold,
            land: updatedState.resources.land,
            population: updatedState.resources.population,
            food: updatedState.resources.food,
            wood: updatedState.resources.wood,
            stone: updatedState.resources.stone,
            farmers: updatedState.resources.specialists.farmers,
            miners: updatedState.resources.specialists.miners,
            soldiers: updatedState.resources.specialists.soldiers,
            scholars: updatedState.resources.specialists.scholars,
          })
          .eq('kingdom_id', updatedState.kingdom.id);
        
        if (resourcesError) throw resourcesError;
        
        // Insert save log
        const { error: logError } = await supabase
          .from('game_logs')
          .insert({
            kingdom_id: updatedState.kingdom.id,
            type: 'GAME_SAVED',
            message: 'Your kingdom progress has been saved.',
          });
        
        if (logError) throw logError;
        
        toast({
          title: 'Game Saved',
          description: 'Your kingdom progress has been saved to the cloud.',
        });
      } else {
        // Use local storage if no user
        saveGame(updatedState);
        toast({
          title: 'Game Saved',
          description: 'Your kingdom progress has been saved locally.',
        });
      }
      
      setGameState(updatedState);
    } catch (error: any) {
      console.error('Error saving game:', error);
      toast({
        title: 'Error',
        description: 'Failed to save your kingdom.',
        variant: 'destructive',
      });
    }
  };
  
  return {
    gameState,
    loading,
    createKingdom,
    startNewGame,
    saveGameState,
    setGameState
  };
};
