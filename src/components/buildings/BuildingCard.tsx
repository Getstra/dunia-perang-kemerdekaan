import React from "react";
import { Building2, Hammer, Warehouse, Castle, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Building, Resources, BuildingType } from "../../utils/types";
import BuildingHeader from "./BuildingHeader";
import BuildingProgress from "./BuildingProgress";
import BuildingCost from "./BuildingCost";
import BuildingProduction from "./BuildingProduction";
import BuildingActionButton from "./BuildingActionButton";

interface BuildingCardProps {
  building: Building;
  resources: Resources;
  onBuild: (buildingId: string) => void;
  onShowDetails: (building: Building) => void;
}

const BuildingCard: React.FC<BuildingCardProps> = ({
  building,
  resources,
  onBuild,
  onShowDetails,
}) => {
  const getBuildingIcon = (type: string) => {
    switch (type) {
      case BuildingType.RESOURCE:
        return Warehouse;
      case BuildingType.MILITARY:
        return Castle;
      case BuildingType.INFRASTRUCTURE:
        return Hammer;
      case BuildingType.SPECIAL:
        return Sparkles;
      default:
        return Building2;
    }
  };

  const getBuildingColor = (type: string) => {
    switch (type) {
      case BuildingType.RESOURCE:
        return "text-green-600";
      case BuildingType.MILITARY:
        return "text-red-600";
      case BuildingType.INFRASTRUCTURE:
        return "text-blue-600";
      case BuildingType.SPECIAL:
        return "text-purple-600";
      default:
        return "text-amber-600";
    }
  };

  const canBuild = () => {
    return (
      resources.gold >= building.cost.gold &&
      resources.iron >= building.cost.iron &&
      resources.wood >= building.cost.wood
    );
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    } else {
      return `${remainingSeconds}s`;
    }
  };

  const constructionProgress = building.completionTime
    ? Math.min(100, Math.max(0, ((building.completionTime - Date.now()) / (building.constructionTime * 60 * 1000)) * 100))
    : 0;

  return (
    <div
      className={`glass-panel rounded-lg p-5 shadow-lg backdrop-blur-sm border transition-all duration-300 hover:shadow-xl ${
        building.completed
          ? "border-green-600/30 bg-green-600/10 hover:bg-green-600/15"
          : building.completionTime
            ? "border-amber-600/30 bg-amber-900/20 hover:bg-amber-900/25"
            : "border-amber-500/20 bg-amber-50/10 dark:bg-amber-950/10 hover:bg-amber-50/20 dark:hover:bg-amber-950/20"
      }`}
    >
      <BuildingHeader building={building} onShowDetails={onShowDetails} />
      
      {building.completionTime && (
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-amber-600">Construction Progress</span>
            <span className="text-amber-600">
              {formatTime(building.completionTime - Date.now())} remaining
            </span>
          </div>
          <div className="relative">
            <Progress 
              value={constructionProgress} 
              className="h-2 bg-amber-900/20"
            />
            <div 
              className="absolute inset-0 h-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 animate-pulse"
              style={{ width: `${constructionProgress}%` }}
            />
          </div>
        </div>
      )}
      
      {!building.completionTime && (
        <div className="space-y-3 mt-4">
          <BuildingCost building={building} resources={resources} />
          <BuildingProduction building={building} />
          <BuildingActionButton 
            building={building} 
            resources={resources} 
            onBuild={onBuild} 
          />
        </div>
      )}
    </div>
  );
};

export default BuildingCard;
