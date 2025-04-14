
import React from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useTheme } from '@/providers/ThemeProvider';
import ThemeToggle from '../components/ThemeToggle';
import GameContainer from '../components/GameContainer';
import LoadingScreen from '../components/LoadingScreen';
import GameFooter from '../components/GameFooter';
import { useGameState } from '../hooks/useGameState';
import { useBuildingConstruction } from '../hooks/useBuildingConstruction';

const Index = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { gameState, loading, createKingdom, startNewGame, saveGameState, setGameState } = useGameState();
  const { handleBuild } = useBuildingConstruction(gameState, setGameState, user);
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-neu-bg-light' : 'bg-neu-bg-dark'}`}>
      <div className="container mx-auto px-4 py-6 flex-grow">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        
        <GameContainer 
          gameState={gameState}
          onCreateKingdom={createKingdom}
          onNewGame={startNewGame}
          onSaveGame={saveGameState}
          onBuild={handleBuild}
        />
        
        <GameFooter />
      </div>
    </div>
  );
};

export default Index;
