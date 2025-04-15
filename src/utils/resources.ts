
import { GameState, Resources } from './types';

// Calculate resource production based on buildings
export const calculateProduction = (state: GameState): Resources => {
  const baseProduction: Resources = {
    gold: 5,
    land: 0,
    population: 1,
    food: 10,
    wood: 5,
    stone: 2,
    specialists: {
      farmers: 0,
      miners: 0,
      soldiers: 0,
      scholars: 0,
    },
  };

  // Add production from completed buildings
  state.buildings
    .filter(building => building.completed && building.level > 0)
    .forEach(building => {
      if (building.production.gold) baseProduction.gold += building.production.gold * building.level;
      if (building.production.food) baseProduction.food += building.production.food * building.level;
      if (building.production.wood) baseProduction.wood += building.production.wood * building.level;
      if (building.production.stone) baseProduction.stone += building.production.stone * building.level;
      if (building.production.population) baseProduction.population += building.production.population * building.level;
    });

  return baseProduction;
};
