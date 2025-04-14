
import React from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import { GameState } from '@/utils/types';
import GameHeader from './GameHeader';
import KingdomCreate from './KingdomCreate';
import Resources from './Resources';
import Buildings from './Buildings';
import GameLog from './GameLog';

interface GameContainerProps {
  gameState: GameState;
  onCreateKingdom: (name: string, ruler: string) => void;
  onNewGame: () => void;
  onSaveGame: () => void;
  onBuild: (buildingId: string) => void;
}

const GameContainer: React.FC<GameContainerProps> = ({
  gameState,
  onCreateKingdom,
  onNewGame,
  onSaveGame,
  onBuild
}) => {
  const { theme } = useTheme();
  
  return (
    <div className={`neu-card ${theme}`}>
      <GameHeader 
        kingdomName={gameState.kingdom.name}
        rulerName={gameState.kingdom.ruler}
        age={gameState.kingdom.age}
        onNewGame={onNewGame}
        onSaveGame={onSaveGame}
        gameStarted={gameState.gameStarted}
      />
      
      {!gameState.gameStarted ? (
        <KingdomCreate onCreateKingdom={onCreateKingdom} />
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
                onBuild={onBuild}
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
  );
};

export default GameContainer;
