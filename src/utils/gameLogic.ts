
import { GameState } from './types';
import { getInitialBuildings, startBuilding } from './buildings';
import { logAction } from './gameActions';
import { createKingdom } from './kingdom';
import { calculateProduction } from './resources';
import { saveGame, loadGame } from './storage';
import { updateGameState } from './gameUpdate';

// Initial state for a new game
export const getInitialState = (): GameState => ({
  kingdom: {
    id: '',
    name: '',
    ruler: '',
    age: 0,
    lastUpdated: Date.now(),
  },
  resources: {
    gold: 1000,
    land: 100,
    population: 50,
    food: 200,
    wood: 100,
    stone: 50,
    specialists: {
      farmers: 5,
      miners: 3,
      soldiers: 2,
      scholars: 1,
    },
  },
  buildings: getInitialBuildings(),
  actions: [{
    type: 'GAME_CREATED',
    message: 'Your kingdom awaits your leadership!',
    timestamp: Date.now(),
  }],
  gameStarted: false,
});

// Export all functionality 
export {
  startBuilding,
  logAction,
  createKingdom,
  calculateProduction,
  saveGame,
  loadGame,
  updateGameState
};
