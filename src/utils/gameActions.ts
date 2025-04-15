
import { GameAction, GameState } from './types';

// Log an action
export const logAction = (state: GameState, type: string, message: string): GameAction[] => {
  const newAction: GameAction = {
    type,
    message,
    timestamp: Date.now(),
  };
  return [...state.actions, newAction];
};
