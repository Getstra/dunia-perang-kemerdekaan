
import { useEffect } from 'react';
import { GameState } from '@/utils/types';
import { updateGameState, saveGame } from '@/utils/gameLogic';

export const useGameUpdater = (
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  user: any | null
) => {
  // Update the game state at regular intervals
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
  }, [gameState.gameStarted, user, setGameState]);
};
