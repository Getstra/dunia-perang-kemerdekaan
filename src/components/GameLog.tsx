
import React from 'react';
import { GameAction } from '../utils/types';
import { MessageSquare, Clock } from 'lucide-react';

interface GameLogProps {
  actions: GameAction[];
}

const GameLog: React.FC<GameLogProps> = ({ actions }) => {
  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Get the most recent actions first
  const recentActions = [...actions].reverse().slice(0, 15);
  
  return (
    <div className="parchment">
      <div className="flex items-center mb-2">
        <MessageSquare className="w-5 h-5 mr-2 text-royal-blue" />
        <h2 className="medieval-heading text-xl">Kingdom Chronicle</h2>
      </div>
      
      <div className="max-h-64 overflow-y-auto">
        {recentActions.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            Your kingdom's history will be written here...
          </div>
        ) : (
          <ul className="space-y-2">
            {recentActions.map((action, index) => (
              <li key={index} className="border-b border-wood-light pb-2 last:border-0">
                <div className="flex items-start">
                  <div className="flex items-center text-sm text-muted-foreground mr-2">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{formatTimestamp(action.timestamp)}</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium">{action.type}</div>
                    <div className="text-sm">{action.message}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GameLog;
