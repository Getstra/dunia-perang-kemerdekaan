
import { Building, BuildingType, GameAction, GameState, Kingdom, Resources } from './types';
import { v4 as uuidv4 } from 'uuid';

// Initial state for a new game
export const getInitialState = (): GameState => ({
  kingdom: {
    id: uuidv4(),
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

// Create a new kingdom
export const createKingdom = (name: string, ruler: string): Kingdom => ({
  id: uuidv4(),
  name,
  ruler,
  age: 0,
  lastUpdated: Date.now(),
});

// Log an action
export const logAction = (state: GameState, type: string, message: string): GameAction[] => {
  const newAction: GameAction = {
    type,
    message,
    timestamp: Date.now(),
  };
  return [...state.actions, newAction];
};

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
  const updatedResources: Resources = {
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
  const updatedResources: Resources = {
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
