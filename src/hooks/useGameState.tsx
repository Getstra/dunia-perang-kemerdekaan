
import { useState, useEffect } from 'react';
import { GameState } from '@/utils/types';
import { getInitialState } from '@/utils/gameLogic';
import { useKingdomLoader } from './useKingdomLoader';
import { useKingdomCreation } from './useKingdomCreation';
import { useGameSaving } from './useGameSaving';
import { useGameUpdater } from './useGameUpdater';
import { useAuth } from '@/providers/AuthProvider';

export const useGameState = () => {
  const { user } = useAuth();
  const [gameState, setGameState] = useState<GameState>(getInitialState());
  
  // Use our custom hooks
  const { loading } = useKingdomLoader(user, setGameState);
  const { createKingdom, loading: creatingKingdom } = useKingdomCreation(gameState, setGameState, user);
  const { saveGameState } = useGameSaving(gameState, setGameState, user);
  
  // Set up game updater
  useGameUpdater(gameState, setGameState, user);
  
  // Handle starting a new game
  const startNewGame = () => {
    setGameState(getInitialState());
  };
  
  return {
    gameState,
    setGameState,
    loading: loading || creatingKingdom,
    createKingdom,
    startNewGame,
    saveGameState
  };
};

export default useGameState;
