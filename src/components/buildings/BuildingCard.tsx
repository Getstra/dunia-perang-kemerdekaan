
import React from "react";
import { Building, Resources } from "../../utils/types";
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
      
      <BuildingProgress building={building} />
      
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
