
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { GameState, Kingdom } from '@/utils/types';
import { getInitialState, createKingdom as createLocalKingdom, logAction, saveGame } from '@/utils/gameLogic';

export const useKingdomCreation = (
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  user: any | null
) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

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

  return {
    createKingdom,
    loading
  };
};
