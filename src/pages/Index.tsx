
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import GameHeader from '../components/GameHeader';
import KingdomCreate from '../components/KingdomCreate';
import Resources from '../components/Resources';
import Buildings from '../components/Buildings';
import GameLog from '../components/GameLog';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../providers/ThemeProvider';
import { GameState, Kingdom } from '../utils/types';
import { 
  getInitialState, 
  createKingdom as createLocalKingdom, 
  updateGameState, 
  startBuilding, 
  saveGame, 
  loadGame, 
  logAction
} from '../utils/gameLogic';

const Index = () => {
  // Get theme
  const { theme } = useTheme();
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Game state
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
            type: b.type,
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
  const handleCreateKingdom = async (name: string, ruler: string) => {
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
  const handleNewGame = () => {
    // If game already started, confirm reset
    if (gameState.gameStarted) {
      if (!window.confirm('Are you sure you want to abandon your kingdom and start anew?')) {
        return;
      }
    }
    
    setGameState(getInitialState());
  };
  
  // Handle save game
  const handleSaveGame = async () => {
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
  
  // Handle building construction
  const handleBuild = async (buildingId: string) => {
    try {
      const updatedState = startBuilding(gameState, buildingId);
      
      // If user is authenticated, save to database
      if (user && gameState.kingdom.id && updatedState !== gameState) {
        const building = updatedState.buildings.find(b => b.id === buildingId);
        
        if (building) {
          // Update building in database
          const { error: buildingError } = await supabase
            .from('buildings')
            .upsert({
              id: building.id,
              kingdom_id: gameState.kingdom.id,
              name: building.name,
              level: building.level,
              type: building.type,
              completed: building.completed,
              completion_time: building.completionTime ? new Date(building.completionTime).toISOString() : null,
            });
          
          if (buildingError) throw buildingError;
          
          // Update resources
          const { error: resourcesError } = await supabase
            .from('resources')
            .update({
              gold: updatedState.resources.gold,
              wood: updatedState.resources.wood,
              stone: updatedState.resources.stone,
              food: updatedState.resources.food,
            })
            .eq('kingdom_id', gameState.kingdom.id);
          
          if (resourcesError) throw resourcesError;
          
          // Insert build log
          const buildAction = updatedState.actions[updatedState.actions.length - 1];
          if (buildAction) {
            const { error: logError } = await supabase
              .from('game_logs')
              .insert({
                kingdom_id: gameState.kingdom.id,
                type: buildAction.type,
                message: buildAction.message,
              });
            
            if (logError) throw logError;
          }
        }
      }
      
      setGameState(updatedState);
    } catch (error: any) {
      console.error('Error building:', error);
      toast({
        title: 'Error',
        description: 'Failed to construct building.',
        variant: 'destructive',
      });
    }
  };
  
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'light' ? 'bg-neu-bg-light' : 'bg-neu-bg-dark'}`}>
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-neu-accent-primary mb-4"></div>
          <p>Loading your kingdom...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-neu-bg-light' : 'bg-neu-bg-dark'}`}>
      <div className="container mx-auto px-4 py-6 flex-grow">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        
        <div className={`neu-card ${theme}`}>
          <GameHeader 
            kingdomName={gameState.kingdom.name}
            rulerName={gameState.kingdom.ruler}
            age={gameState.kingdom.age}
            onNewGame={handleNewGame}
            onSaveGame={handleSaveGame}
            gameStarted={gameState.gameStarted}
          />
          
          {!gameState.gameStarted ? (
            <KingdomCreate onCreateKingdom={handleCreateKingdom} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="md:col-span-3">
                <div className={`neu-card ${theme}`}>
                  <Resources resources={gameState.resources} />
                </div>
              </div>
              
              <div className="md:col-span-2">
                <div className={`neu-card ${theme}`}>
                  <Buildings 
                    buildings={gameState.buildings}
                    resources={gameState.resources}
                    onBuild={handleBuild}
                  />
                </div>
              </div>
              
              <div className="md:col-span-1">
                <div className={`neu-card ${theme}`}>
                  <GameLog actions={gameState.actions} />
                </div>
              </div>
            </div>
          )}
        </div>
        
        <footer className={`text-center mt-8 text-sm ${theme === 'light' ? 'text-neu-text-light/60' : 'text-neu-text-dark/60'}`}>
          <p>© {new Date().getFullYear()} Utopia Kingdoms - A Medieval Text-Based Strategy Game</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
