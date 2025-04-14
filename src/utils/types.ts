
export interface Kingdom {
  id: string;
  name: string;
  ruler: string;
  age: number; // Age in days
  lastUpdated: number; // Timestamp
}

export interface Resources {
  gold: number;
  land: number;
  population: number;
  food: number;
  wood: number;
  stone: number;
  specialists: {
    farmers: number;
    miners: number;
    soldiers: number;
    scholars: number;
  };
}

export interface Building {
  id: string;
  name: string;
  level: number;
  type: BuildingType;
  cost: Partial<Resources>;
  production: Partial<Resources>;
  description: string;
  constructionTime: number; // Time in minutes
  completed: boolean;
  completionTime?: number; // Timestamp
}

export enum BuildingType {
  RESOURCE = "resource",
  MILITARY = "military", 
  SPECIAL = "special",
  INFRASTRUCTURE = "infrastructure"
}

export interface GameAction {
  type: string;
  message: string;
  timestamp: number;
}

export interface GameState {
  kingdom: Kingdom;
  resources: Resources;
  buildings: Building[];
  actions: GameAction[];
  gameStarted: boolean;
}
