import React from "react";
import { Map, Mountain, Trees, Droplets, Factory, Home } from "lucide-react";

interface Territory {
  id: string;
  name: string;
  type: "mountain" | "forest" | "water" | "industrial" | "residential";
  size: number;
  resources: {
    gold?: number;
    iron?: number;
    wood?: number;
    food?: number;
  };
  development: number;
  population: number;
  buildings: number;
}

interface LandProps {
  territories: Territory[];
  onDevelop: (territoryId: string) => void;
  onBuild: (territoryId: string) => void;
}

const Land: React.FC<LandProps> = ({ territories, onDevelop, onBuild }) => {
  const getTerritoryIcon = (type: string) => {
    switch (type) {
      case "mountain":
        return Mountain;
      case "forest":
        return Trees;
      case "water":
        return Droplets;
      case "industrial":
        return Factory;
      case "residential":
        return Home;
      default:
        return Map;
    }
  };

  const getTerritoryColor = (type: string) => {
    switch (type) {
      case "mountain":
        return "text-gray-600";
      case "forest":
        return "text-green-600";
      case "water":
        return "text-blue-600";
      case "industrial":
        return "text-amber-600";
      case "residential":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="mb-6 px-4 py-3 rounded-xl bg-emerald-50/30 dark:bg-emerald-950/20 backdrop-blur-sm shadow-lg border border-emerald-200/30 dark:border-emerald-800/30">
      <h2 className="text-3xl font-bold mb-4 flex items-center pb-3 border-b border-emerald-800/20">
        <Map className="w-8 h-8 mr-3 text-emerald-600 drop-shadow-md" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-800 dark:from-emerald-400 dark:to-emerald-600 drop-shadow-sm">
          Land
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {territories.map((territory) => {
          const TerritoryIcon = getTerritoryIcon(territory.type);
          
          return (
            <div
              key={territory.id}
              className="p-4 bg-emerald-900/10 rounded-lg border border-emerald-800/30 hover:border-emerald-700/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <TerritoryIcon className={`w-5 h-5 mr-2 ${getTerritoryColor(territory.type)}`} />
                  <h3 className="font-semibold">{territory.name}</h3>
                </div>
                <span className="text-sm text-emerald-600 font-medium">
                  {territory.size} km²
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Development: {territory.development}%</span>
                  <span>Population: {territory.population}</span>
                  <span>Buildings: {territory.buildings}</span>
                </div>

                {Object.entries(territory.resources).length > 0 && (
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {territory.resources.gold && (
                      <span className="bg-amber-900/20 px-2 py-1 rounded">
                        {territory.resources.gold} Gold
                      </span>
                    )}
                    {territory.resources.iron && (
                      <span className="bg-gray-900/20 px-2 py-1 rounded">
                        {territory.resources.iron} Iron
                      </span>
                    )}
                    {territory.resources.wood && (
                      <span className="bg-green-900/20 px-2 py-1 rounded">
                        {territory.resources.wood} Wood
                      </span>
                    )}
                    {territory.resources.food && (
                      <span className="bg-emerald-900/20 px-2 py-1 rounded">
                        {territory.resources.food} Food
                      </span>
                    )}
                  </div>
                )}

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => onDevelop(territory.id)}
                    className="flex-1 py-1.5 px-3 rounded-md text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                  >
                    Develop
                  </button>
                  <button
                    onClick={() => onBuild(territory.id)}
                    className="flex-1 py-1.5 px-3 rounded-md text-sm font-medium bg-amber-600 text-white hover:bg-amber-700 transition-colors"
                  >
                    Build
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Land; 