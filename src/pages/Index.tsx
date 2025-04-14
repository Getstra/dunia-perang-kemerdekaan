
import React, { useState, useEffect } from 'react';
import GameHeader from '../components/GameHeader';
import KingdomCreate from '../components/KingdomCreate';
import Resources from '../components/Resources';
import Buildings from '../components/Buildings';
import GameLog from '../components/GameLog';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../providers/ThemeProvider';
import { 
  GameState, 
  Kingdom, 
} from '../utils/types';
import { 
  getInitialState, 
  createKingdom, 
  updateGameState, 
  startBuilding, 
  saveGame, 
  loadGame, 
  logAction
} from '../utils/gameLogic';

const Index = () => {
  // Get theme
  const { theme } = useTheme();
  
  // Game state
  const [gameState, setGameState] = useState<GameState>(getInitialState());
  
  // Load saved game on initial render
  useEffect(() => {
    const savedGame = loadGame();
    if (savedGame) {
      setGameState(savedGame);
    }
  }, []);
  
  // Update the game state every minute
  useEffect(() => {
    if (!gameState.gameStarted) return;
    
    // Update once immediately 
    setGameState(currentState => updateGameState(currentState));
    
    // Then set up interval
    const interval = setInterval(() => {
      setGameState(currentState => {
        const updatedState = updateGameState(currentState);
        saveGame(updatedState);
        return updatedState;
      });
    }, 60000); // 1 minute
    
    return () => clearInterval(interval);
  }, [gameState.gameStarted]);
  
  // Handle creating a new kingdom
  const handleCreateKingdom = (name: string, ruler: string) => {
    const newKingdom: Kingdom = createKingdom(name, ruler);
    
    const newGameState: GameState = {
      ...gameState,
      kingdom: newKingdom,
      gameStarted: true,
      actions: logAction(gameState, 'KINGDOM_FOUNDED', `The kingdom of ${name} was founded by ${ruler}.`),
    };
    
    setGameState(newGameState);
    saveGame(newGameState);
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
  const handleSaveGame = () => {
    saveGame(gameState);
    
    // Add a save action to the log
    const updatedState = {
      ...gameState,
      actions: logAction(gameState, 'GAME_SAVED', 'Your kingdom progress has been saved.'),
    };
    
    setGameState(updatedState);
    saveGame(updatedState);
    
    alert('Game saved successfully!');
  };
  
  // Handle building construction
  const handleBuild = (buildingId: string) => {
    const updatedState = startBuilding(gameState, buildingId);
    setGameState(updatedState);
    saveGame(updatedState);
  };
  
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
