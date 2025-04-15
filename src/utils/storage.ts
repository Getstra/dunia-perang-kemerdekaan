
import { GameState } from './types';

// Save game to localStorage
export const saveGame = (state: GameState): void => {
  try {
    localStorage.setItem('utopia_game_save', JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save game:', error);
  }
};

// Load game from localStorage
export const loadGame = (): GameState | null => {
  try {
    const savedGame = localStorage.getItem('utopia_game_save');
    if (savedGame) {
      return JSON.parse(savedGame) as GameState;
    }
  } catch (error) {
    console.error('Failed to load game:', error);
  }
  return null;
};
