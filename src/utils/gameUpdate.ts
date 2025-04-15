
import { GameState } from './types';
import { calculateProduction } from './resources';
import { logAction } from './gameActions';

// Update game state (tick)
export const updateGameState = (state: GameState): GameState => {
  const now = Date.now();
  const hoursSinceLastUpdate = (now - state.kingdom.lastUpdated) / (1000 * 60 * 60);
  
  if (hoursSinceLastUpdate < 0.1) return state; // Only update every 6 minutes
  
  // Check for building completion
  const updatedBuildings = state.buildings.map(building => {
    if (!building.completed && building.completionTime && now >= building.completionTime) {
      return { ...building, completed: true };
    }
    return building;
  });

  // Calculate production
  const production = calculateProduction(state);
  const productionMultiplier = Math.max(0.1, Math.min(hoursSinceLastUpdate, 24)); // Cap at 24 hours

  // Update resources
  const updatedResources = {
    gold: Math.floor(state.resources.gold + (production.gold * productionMultiplier)),
    land: state.resources.land,
    population: Math.floor(state.resources.population + (production.population * productionMultiplier)),
    food: Math.floor(state.resources.food + (production.food * productionMultiplier)),
    wood: Math.floor(state.resources.wood + (production.wood * productionMultiplier)),
    stone: Math.floor(state.resources.stone + (production.stone * productionMultiplier)),
    specialists: { ...state.resources.specialists },
  };

  // Update kingdom age
  const daysSinceCreation = (now - state.kingdom.lastUpdated) / (1000 * 60 * 60 * 24);
  const updatedKingdom = {
    ...state.kingdom,
    age: state.kingdom.age + daysSinceCreation,
    lastUpdated: now,
  };

  // Log resource production if significant
  let actions = state.actions;
  if (hoursSinceLastUpdate >= 1) {
    actions = logAction(
      state,
      'RESOURCES_PRODUCED',
      `Your kingdom produced: ${Math.floor(production.gold * productionMultiplier)} gold, ${Math.floor(production.food * productionMultiplier)} food, ${Math.floor(production.wood * productionMultiplier)} wood, ${Math.floor(production.stone * productionMultiplier)} stone.`,
    );
  }

  return {
    ...state,
    kingdom: updatedKingdom,
    resources: updatedResources,
    buildings: updatedBuildings,
    actions,
  };
};
