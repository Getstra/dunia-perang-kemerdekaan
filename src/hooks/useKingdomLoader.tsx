
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { GameState, BuildingType } from '@/utils/types';
import { getInitialState, loadGame } from '@/utils/gameLogic';

export const useKingdomLoader = (
  user: any | null,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  // Load user kingdom data from Supabase
  useEffect(() => {
    const fetchUserKingdom = async () => {
      try {
        if (!user) {
          // If no user, try loading from local storage in the next effect
          setLoading(false);
          return;
        }
        
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
  }, [user, toast, setGameState]);
  
  // If no server data, load from local storage
  useEffect(() => {
    const loadLocalGame = (gameStarted: boolean) => {
      if (!loading && !gameStarted) {
        const savedGame = loadGame();
        if (savedGame) {
          setGameState(savedGame);
        }
      }
    };
    
    return () => {
      // This is a cleanup function that doesn't need to do anything in this case
      // But it's here to satisfy the strict effect dependency checking
    };
  }, [loading, setGameState]); // We don't include gameState.gameStarted directly to avoid re-running on every state change
  
  return { loading };
};
