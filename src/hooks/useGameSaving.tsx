
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { GameState } from '@/utils/types';
import { logAction, saveGame } from '@/utils/gameLogic';

export const useGameSaving = (
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  user: any | null
) => {
  const { toast } = useToast();

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

  return { saveGameState };
};
