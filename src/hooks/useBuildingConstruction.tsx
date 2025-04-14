
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { GameState } from '@/utils/types';
import { startBuilding } from '@/utils/gameLogic';

export const useBuildingConstruction = (
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  user: any | null
) => {
  const { toast } = useToast();
  const [buildingInProgress, setBuildingInProgress] = useState(false);

  const handleBuild = async (buildingId: string) => {
    try {
      setBuildingInProgress(true);
      const updatedState = startBuilding(gameState, buildingId);
      
      // If there was no change (maybe not enough resources), return early
      if (updatedState === gameState) {
        setBuildingInProgress(false);
        return;
      }
      
      // If user is authenticated, save to database
      if (user && gameState.kingdom.id) {
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
    } finally {
      setBuildingInProgress(false);
    }
  };

  return {
    handleBuild,
    buildingInProgress
  };
};
