
import React from 'react';
import { Building, Resources } from '../utils/types';
import { Clock, Hourglass, Building2, AlertTriangle } from 'lucide-react';

interface BuildingsProps {
  buildings: Building[];
  resources: Resources;
  onBuild: (buildingId: string) => void;
}

const Buildings: React.FC<BuildingsProps> = ({ buildings, resources, onBuild }) => {
  // Group buildings by type
  const groupedBuildings: Record<string, Building[]> = {};
  
  buildings.forEach(building => {
    if (!groupedBuildings[building.type]) {
      groupedBuildings[building.type] = [];
    }
    groupedBuildings[building.type].push(building);
  });
  
  // Helper to check if we have enough resources to build
  const canBuild = (building: Building): boolean => {
    if (building.cost.gold && resources.gold < building.cost.gold) return false;
    if (building.cost.wood && resources.wood < building.cost.wood) return false;
    if (building.cost.stone && resources.stone < building.cost.stone) return false;
    if (building.cost.food && resources.food < building.cost.food) return false;
    return true;
  };
  
  // Format time remaining
  const formatTimeRemaining = (completionTime: number | undefined): string => {
    if (!completionTime) return '0m';
    
    const now = Date.now();
    const remaining = Math.max(0, completionTime - now);
    const minutes = Math.floor(remaining / (1000 * 60));
    
    if (minutes < 1) return 'Completing...';
    return `${minutes}m remaining`;
  };
  
  return (
    <div className="parchment mb-4">
      <h2 className="medieval-heading text-xl mb-2">Buildings</h2>
      
      {Object.entries(groupedBuildings).map(([type, typeBuildings]) => (
        <div key={type} className="mb-4">
          <h3 className="medieval-heading text-lg border-b border-wood mb-2 pb-1 capitalize">
            {type} Buildings
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {typeBuildings.map(building => (
              <div 
                key={building.id} 
                className={`border rounded-sm p-3 ${
                  building.completed 
                    ? 'border-wood bg-parchment-light' 
                    : building.completionTime 
                      ? 'border-royal-blue bg-blue-50' 
                      : 'border-wood-light bg-parchment-light'
                }`}
              >
                <div className="flex justify-between">
                  <h4 className="font-medium text-lg">
                    {building.name} {building.level > 0 && `(Level ${building.level})`}
                  </h4>
                  
                  {building.completionTime && !building.completed && (
                    <div className="flex items-center text-royal-blue">
                      <Hourglass className="w-4 h-4 mr-1" />
                      <span className="text-sm">{formatTimeRemaining(building.completionTime)}</span>
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{building.description}</p>
                
                {!building.completionTime && (
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2 text-sm">
                      {building.cost.gold && (
                        <span className={resources.gold < building.cost.gold ? 'text-royal-red' : ''}>
                          Gold: {building.cost.gold}
                        </span>
                      )}
                      {building.cost.wood && (
                        <span className={resources.wood < building.cost.wood ? 'text-royal-red' : ''}>
                          Wood: {building.cost.wood}
                        </span>
                      )}
                      {building.cost.stone && (
                        <span className={resources.stone < building.cost.stone ? 'text-royal-red' : ''}>
                          Stone: {building.cost.stone}
                        </span>
                      )}
                      {building.cost.food && (
                        <span className={resources.food < building.cost.food ? 'text-royal-red' : ''}>
                          Food: {building.cost.food}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{building.constructionTime} minutes</span>
                    </div>
                    
                    {building.production && Object.keys(building.production).length > 0 && (
                      <div className="text-sm">
                        <span className="font-medium">Produces: </span>
                        {Object.entries(building.production)
                          .filter(([_, value]) => value)
                          .map(([key, value]) => `${value} ${key}`)
                          .join(', ')}
                      </div>
                    )}
                    
                    <button
                      onClick={() => onBuild(building.id)}
                      disabled={!canBuild(building)}
                      className={`w-full mt-2 py-1 px-3 rounded-sm border text-sm font-medium
                        ${canBuild(building)
                          ? 'medieval-button'
                          : 'bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed'
                        }`}
                    >
                      {building.level === 0 ? 'Build' : 'Upgrade'} {building.name}
                    </button>
                    
                    {!canBuild(building) && (
                      <div className="flex items-center mt-1 text-sm text-royal-red">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        <span>Not enough resources</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Buildings;
