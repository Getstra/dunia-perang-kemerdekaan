
import React from "react";
import { Building, Resources } from "../../utils/types";
import { Coins, Sword, Sparkles, Building2 } from "lucide-react";
import BuildingCard from "./BuildingCard";

interface BuildingGroupProps {
  type: string;
  buildings: Building[];
  resources: Resources;
  onBuild: (buildingId: string) => void;
  onShowDetails: (building: Building) => void;
}

const BuildingGroup: React.FC<BuildingGroupProps> = ({
  type,
  buildings,
  resources,
  onBuild,
  onShowDetails,
}) => {
  const getBuildingTypeLabel = (type: string): string => {
    switch (type) {
      case "resource":
        return "Resource Buildings";
      case "military":
        return "Military Buildings";
      case "special":
        return "Special Buildings";
      case "infrastructure":
        return "Infrastructure Buildings";
      default:
        return `${type.charAt(0).toUpperCase() + type.slice(1)} Buildings`;
    }
  };

  const getBuildingTypeIcon = (type: string) => {
    switch (type) {
      case "resource":
        return <Coins className="h-5 w-5 text-amber-600" />;
      case "military":
        return <Sword className="h-5 w-5 text-amber-600" />;
      case "special":
        return <Sparkles className="h-5 w-5 text-amber-600" />;
      case "infrastructure":
        return <Building2 className="h-5 w-5 text-amber-600" />;
      default:
        return <Building2 className="h-5 w-5 text-amber-600" />;
    }
  };

  return (
    <div className="mb-8 bg-amber-900/10 backdrop-blur-sm border border-amber-800/30 rounded-lg p-5 shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-amber-900/15">
      <h3 className="font-bold text-xl mb-4 flex items-center pb-2 border-b border-amber-800/20">
        <div className="p-1.5 rounded-full bg-amber-100 dark:bg-amber-900/50 mr-2 shadow-inner">
          {getBuildingTypeIcon(type)}
        </div>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-amber-900 dark:from-amber-300 dark:to-amber-500">
          {getBuildingTypeLabel(type)}
        </span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
        {buildings.map((building) => (
          <BuildingCard
            key={building.id}
            building={building}
            resources={resources}
            onBuild={onBuild}
            onShowDetails={onShowDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default BuildingGroup;
