
import React from 'react';
import { Scroll, Home, Settings } from 'lucide-react';

interface GameHeaderProps {
  kingdomName: string;
  rulerName: string;
  age: number;
  onNewGame: () => void;
  onSaveGame: () => void;
  gameStarted: boolean;
}

const GameHeader: React.FC<GameHeaderProps> = ({
  kingdomName,
  rulerName,
  age,
  onNewGame,
  onSaveGame,
  gameStarted
}) => {
  return (
    <header className="border-b border-wood-dark pb-2 mb-4">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center">
          <Scroll className="w-10 h-10 text-royal-red mr-2" />
          <h1 className="medieval-heading text-3xl">Utopia Kingdoms</h1>
        </div>
        
        {gameStarted && (
          <div className="text-center md:text-right mt-2 md:mt-0">
            <div className="text-xl"><span className="font-semibold">{kingdomName}</span></div>
            <div className="text-sm text-muted-foreground">
              Ruled by {rulerName} • Age: {Math.floor(age)} days
            </div>
          </div>
        )}
        
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button 
            onClick={onNewGame}
            className="medieval-button flex items-center"
          >
            <Home className="w-4 h-4 mr-1" />
            {gameStarted ? 'New Kingdom' : 'Start Game'}
          </button>
          
          {gameStarted && (
            <button 
              onClick={onSaveGame}
              className="medieval-button flex items-center"
            >
              <Settings className="w-4 h-4 mr-1" />
              Save Game
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default GameHeader;
