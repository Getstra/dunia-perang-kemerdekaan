
import React, { useState } from 'react';
import { Building, Resources } from '../utils/types';
import { Clock, Hourglass, Building2, AlertTriangle, CheckCircle, HelpCircle, Info, Coins, Sword, Sparkles } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface BuildingsProps {
  buildings: Building[];
  resources: Resources;
  onBuild: (buildingId: string) => void;
}

const Buildings: React.FC<BuildingsProps> = ({ buildings, resources, onBuild }) => {
  const [showBuildingDetails, setShowBuildingDetails] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  
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

  // Calculate completion percentage
  const calculateProgress = (building: Building): number => {
    if (!building.completionTime || building.completed) return 100;
    
    const now = Date.now();
    const totalTime = building.constructionTime * 60 * 1000; // Convert minutes to ms
    const elapsedTime = now - (building.completionTime - totalTime);
    
    return Math.min(100, Math.max(0, (elapsedTime / totalTime) * 100));
  };

  const handleShowDetails = (building: Building) => {
    setSelectedBuilding(building);
    setShowBuildingDetails(true);
  };

  const getBuildingTypeLabel = (type: string): string => {
    switch (type) {
      case 'resource': return 'Resource Buildings';
      case 'military': return 'Military Buildings';
      case 'special': return 'Special Buildings';
      case 'infrastructure': return 'Infrastructure Buildings';
      default: return `${type.charAt(0).toUpperCase() + type.slice(1)} Buildings`;
    }
  };

  const getBuildingTypeIcon = (type: string) => {
    switch (type) {
      case 'resource': return <Coins className="h-4 w-4 mr-2 text-amber-600" />;
      case 'military': return <Sword className="h-4 w-4 mr-2 text-amber-600" />;
      case 'special': return <Sparkles className="h-4 w-4 mr-2 text-amber-600" />;
      case 'infrastructure': return <Building2 className="h-4 w-4 mr-2 text-amber-600" />;
      default: return <Building2 className="h-4 w-4 mr-2 text-amber-600" />;
    }
  };
  
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Building2 className="w-6 h-6 mr-2 text-amber-600" /> Buildings
      </h2>
      
      {Object.entries(groupedBuildings).map(([type, typeBuildings]) => (
        <div key={type} className="mb-6 bg-amber-900/5 border border-amber-800/20 rounded-md p-4">
          <h3 className="font-semibold text-lg mb-3 flex items-center">
            {getBuildingTypeIcon(type)} {getBuildingTypeLabel(type)}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {typeBuildings.map(building => (
              <div 
                key={building.id} 
                className={`border rounded-md p-3 ${
                  building.completed 
                    ? 'border-green-600/30 bg-green-600/5' 
                    : building.completionTime 
                      ? 'border-amber-600/30 bg-amber-900/10' 
                      : 'border-amber-800/20 bg-amber-900/5'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium text-lg">
                        {building.name} {building.level > 0 && `(Level ${building.level})`}
                      </h4>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-5 w-5 ml-1" onClick={() => handleShowDetails(building)}>
                              <Info className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View building details</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="text-sm text-muted-foreground">{building.description}</p>
                  </div>
                  
                  {building.completionTime && !building.completed && (
                    <div className="flex items-center text-amber-600">
                      <Hourglass className="w-4 h-4 mr-1" />
                      <span className="text-sm">{formatTimeRemaining(building.completionTime)}</span>
                    </div>
                  )}
                  
                  {building.completed && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm">Complete</span>
                    </div>
                  )}
                </div>
                
                {building.completionTime && !building.completed && (
                  <div className="mt-2">
                    <Progress value={calculateProgress(building)} className="h-1.5" />
                  </div>
                )}
                
                {!building.completionTime && (
                  <div className="space-y-2 mt-3">
                    <div className="flex flex-wrap gap-2 text-sm">
                      {building.cost.gold && (
                        <span className={resources.gold < building.cost.gold ? 'text-red-600' : ''}>
                          Gold: {building.cost.gold}
                        </span>
                      )}
                      {building.cost.wood && (
                        <span className={resources.wood < building.cost.wood ? 'text-red-600' : ''}>
                          Wood: {building.cost.wood}
                        </span>
                      )}
                      {building.cost.stone && (
                        <span className={resources.stone < building.cost.stone ? 'text-red-600' : ''}>
                          Stone: {building.cost.stone}
                        </span>
                      )}
                      {building.cost.food && (
                        <span className={resources.food < building.cost.food ? 'text-red-600' : ''}>
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
                          ? 'bg-amber-600 hover:bg-amber-700 text-white border-amber-700 transition-colors'
                          : 'bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed'
                        }`}
                    >
                      {building.level === 0 ? 'Build' : 'Upgrade'} {building.name}
                    </button>
                    
                    {!canBuild(building) && (
                      <div className="flex items-center mt-1 text-sm text-red-600">
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
      
      {/* Building Details Dialog */}
      <Dialog open={showBuildingDetails} onOpenChange={setShowBuildingDetails}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedBuilding?.name} Details</DialogTitle>
          </DialogHeader>
          
          {selectedBuilding && (
            <div className="py-4">
              <div className="space-y-4">
                <div className="p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
                  <p className="text-lg font-bold">{selectedBuilding.name}</p>
                  <p className="text-sm">{selectedBuilding.description}</p>
                  
                  <div className="mt-3 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium">Type</p>
                      <p className="text-sm capitalize">{selectedBuilding.type}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium">Level</p>
                      <p className="text-sm">{selectedBuilding.level}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
                  <p className="font-medium">Building Effects</p>
                  
                  {selectedBuilding.production && Object.keys(selectedBuilding.production).length > 0 ? (
                    <div className="mt-2 space-y-2">
                      {Object.entries(selectedBuilding.production)
                        .filter(([_, value]) => value)
                        .map(([key, value], index) => (
                          <div key={index} className="flex justify-between">
                            <span className="text-sm">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                            <span className="text-sm text-green-600">+{value} per day</span>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">
                      This building provides special effects rather than resource production.
                    </p>
                  )}
                </div>
                
                <div className="p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
                  <p className="font-medium">Upgrade Information</p>
                  
                  {!selectedBuilding.completed ? (
                    <div className="mt-2">
                      <p className="text-sm">This building is currently under construction.</p>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{calculateProgress(selectedBuilding)}%</span>
                        </div>
                        <Progress value={calculateProgress(selectedBuilding)} className="h-1.5 mt-1" />
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2 space-y-2">
                      <p className="text-sm">Upgrade to Level {selectedBuilding.level + 1} requires:</p>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {selectedBuilding.cost.gold && (
                          <div className="flex justify-between">
                            <span>Gold</span>
                            <span>{selectedBuilding.cost.gold * (selectedBuilding.level + 1)}</span>
                          </div>
                        )}
                        {selectedBuilding.cost.wood && (
                          <div className="flex justify-between">
                            <span>Wood</span>
                            <span>{selectedBuilding.cost.wood * (selectedBuilding.level + 1)}</span>
                          </div>
                        )}
                        {selectedBuilding.cost.stone && (
                          <div className="flex justify-between">
                            <span>Stone</span>
                            <span>{selectedBuilding.cost.stone * (selectedBuilding.level + 1)}</span>
                          </div>
                        )}
                        {selectedBuilding.cost.food && (
                          <div className="flex justify-between">
                            <span>Food</span>
                            <span>{selectedBuilding.cost.food * (selectedBuilding.level + 1)}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center text-sm mt-2">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{selectedBuilding.constructionTime * (selectedBuilding.level + 1) / 2} minutes</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setShowBuildingDetails(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Buildings;
