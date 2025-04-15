
import { Building, BuildingType, GameState } from './types';
import { v4 as uuidv4 } from 'uuid';
import { logAction } from './gameActions';

// Available buildings
export const getInitialBuildings = (): Building[] => [
  // Resource Buildings
  {
    id: uuidv4(),
    name: 'Farm',
    level: 0,
    type: BuildingType.RESOURCE,
    cost: { gold: 100, wood: 50 },
    production: { food: 20 },
    description: 'Produces food for your population',
    constructionTime: 5, // 5 minutes
    completed: false,
  },
  {
    id: uuidv4(),
    name: 'Mine',
    level: 0,
    type: BuildingType.RESOURCE,
    cost: { gold: 200, wood: 100 },
    production: { gold: 10, stone: 5 },
    description: 'Produces gold and stone',
    constructionTime: 10, // 10 minutes
    completed: false,
  },
  {
    id: uuidv4(),
    name: 'Lumbermill',
    level: 0,
    type: BuildingType.RESOURCE,
    cost: { gold: 150, stone: 50 },
    production: { wood: 15 },
    description: 'Produces wood for construction',
    constructionTime: 7, // 7 minutes
    completed: false,
  },
  {
    id: uuidv4(),
    name: 'Trade Post',
    level: 0,
    type: BuildingType.RESOURCE,
    cost: { gold: 250, wood: 150, stone: 75 },
    production: { gold: 25 },
    description: 'Increases gold production through trade',
    constructionTime: 12, // 12 minutes
    completed: false,
  },
  // Infrastructure Buildings
  {
    id: uuidv4(),
    name: 'House',
    level: 0,
    type: BuildingType.INFRASTRUCTURE,
    cost: { gold: 100, wood: 100, stone: 25 },
    production: { population: 10 },
    description: 'Houses your population',
    constructionTime: 15, // 15 minutes
    completed: false,
  },
  {
    id: uuidv4(),
    name: 'Marketplace',
    level: 0,
    type: BuildingType.INFRASTRUCTURE,
    cost: { gold: 300, wood: 150, stone: 100 },
    production: { gold: 15 },
    description: 'Improves kingdom commerce',
    constructionTime: 18, // 18 minutes
    completed: false,
  },
  {
    id: uuidv4(),
    name: 'Granary',
    level: 0,
    type: BuildingType.INFRASTRUCTURE,
    cost: { gold: 200, wood: 200, stone: 50 },
    production: { food: 10 },
    description: 'Stores food and improves production',
    constructionTime: 16, // 16 minutes
    completed: false,
  },
  // Military Buildings
  {
    id: uuidv4(),
    name: 'Barracks',
    level: 0,
    type: BuildingType.MILITARY,
    cost: { gold: 300, wood: 150, stone: 100 },
    production: {},
    description: 'Trains soldiers to defend your kingdom',
    constructionTime: 20, // 20 minutes
    completed: false,
  },
  {
    id: uuidv4(),
    name: 'Watchtower',
    level: 0,
    type: BuildingType.MILITARY,
    cost: { gold: 200, wood: 100, stone: 200 },
    production: {},
    description: 'Improves kingdom defenses',
    constructionTime: 14, // 14 minutes
    completed: false,
  },
  // Special Buildings
  {
    id: uuidv4(),
    name: 'Castle',
    level: 0,
    type: BuildingType.SPECIAL,
    cost: { gold: 1000, wood: 500, stone: 750 },
    production: { gold: 50, population: 20 },
    description: 'The heart of your kingdom',
    constructionTime: 60, // 60 minutes
    completed: false,
  },
  {
    id: uuidv4(),
    name: 'Academy',
    level: 0,
    type: BuildingType.SPECIAL,
    cost: { gold: 500, wood: 250, stone: 250 },
    production: {},
    description: 'Research new technologies',
    constructionTime: 30, // 30 minutes
    completed: false,
  },
];

// Start building construction
export const startBuilding = (state: GameState, buildingId: string): GameState => {
  const buildingIndex = state.buildings.findIndex(b => b.id === buildingId);
  if (buildingIndex === -1) return state;

  const building = state.buildings[buildingIndex];
  const cost = building.cost;
  
  // Check if we have enough resources
  if (
    (cost.gold && state.resources.gold < cost.gold) ||
    (cost.wood && state.resources.wood < cost.wood) ||
    (cost.stone && state.resources.stone < cost.stone) ||
    (cost.food && state.resources.food < cost.food)
  ) {
    return {
      ...state,
      actions: logAction(state, 'BUILD_FAILED', `Not enough resources to build ${building.name}.`),
    };
  }

  // Deduct resources
  const updatedResources = {
    ...state.resources,
    gold: state.resources.gold - (cost.gold || 0),
    wood: state.resources.wood - (cost.wood || 0),
    stone: state.resources.stone - (cost.stone || 0),
    food: state.resources.food - (cost.food || 0),
  };

  // Set building completion time
  const completionTime = Date.now() + (building.constructionTime * 60 * 1000);
  const updatedBuilding = {
    ...building,
    level: building.level + 1,
    completionTime,
    completed: false,
  };

  const updatedBuildings = [...state.buildings];
  updatedBuildings[buildingIndex] = updatedBuilding;

  return {
    ...state,
    resources: updatedResources,
    buildings: updatedBuildings,
    actions: logAction(state, 'BUILD_STARTED', `Started building ${building.name} (Level ${updatedBuilding.level}). Will complete in ${building.constructionTime} minutes.`),
  };
};
