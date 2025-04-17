import React, { useState } from "react";
import { Building, Resources, BuildingType } from "../../utils/types";
import { Building2, Hammer, Warehouse, Castle, Sparkles } from "lucide-react";
import BuildingGroup from "./BuildingGroup";
import BuildingDetailsDialog from "./BuildingDetailsDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BuildingsProps {
  buildings: Building[];
  resources: Resources;
  onBuild: (buildingId: string) => void;
}

const Buildings: React.FC<BuildingsProps> = ({
  buildings,
  resources,
  onBuild,
}) => {
  const [showBuildingDetails, setShowBuildingDetails] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(
    null,
  );
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  // Group buildings by type
  const groupedBuildings: Record<string, Building[]> = {};

  buildings.forEach((building) => {
    if (!groupedBuildings[building.type]) {
      groupedBuildings[building.type] = [];
    }
    groupedBuildings[building.type].push(building);
  });

  const handleShowDetails = (building: Building) => {
    setSelectedBuilding(building);
    setShowBuildingDetails(true);
  };

  // Get building type icon and color
  const getBuildingTypeInfo = (type: string) => {
    switch (type) {
      case BuildingType.RESOURCE:
        return { icon: Warehouse, color: "text-green-600", label: "Resource" };
      case BuildingType.MILITARY:
        return { icon: Castle, color: "text-red-600", label: "Military" };
      case BuildingType.INFRASTRUCTURE:
        return {
          icon: Hammer,
          color: "text-blue-600",
          label: "Infrastructure",
        };
      case BuildingType.SPECIAL:
        return { icon: Sparkles, color: "text-purple-600", label: "Special" };
      default:
        return { icon: Building2, color: "text-amber-600", label: "Other" };
    }
  };

  // Filter buildings by category if a filter is selected
  const filteredBuildings = categoryFilter
    ? { [categoryFilter]: groupedBuildings[categoryFilter] }
    : groupedBuildings;

  return (
    <div className="mb-6 px-4 py-3 rounded-xl bg-amber-50/30 dark:bg-amber-950/20 backdrop-blur-sm shadow-lg border border-amber-200/30 dark:border-amber-800/30">
      <h2 className="text-3xl font-bold mb-4 flex items-center pb-3 border-b border-amber-800/20">
        <Building2 className="w-8 h-8 mr-3 text-amber-600 drop-shadow-md" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-800 dark:from-amber-400 dark:to-amber-600 drop-shadow-sm">
          Buildings
        </span>
      </h2>

      {/* Building category filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setCategoryFilter(null)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${!categoryFilter ? "bg-amber-600 text-white" : "bg-amber-100 dark:bg-amber-900/30 hover:bg-amber-200 dark:hover:bg-amber-800/40"}`}
              >
                All
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Show all building types</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {Object.keys(groupedBuildings).map((type) => {
          const { icon: Icon, color, label } = getBuildingTypeInfo(type);
          return (
            <TooltipProvider key={type}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setCategoryFilter(type)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all ${categoryFilter === type ? "bg-amber-600 text-white" : "bg-amber-100 dark:bg-amber-900/30 hover:bg-amber-200 dark:hover:bg-amber-800/40"}`}
                  >
                    <Icon
                      className={`w-4 h-4 ${categoryFilter === type ? "text-white" : color}`}
                    />
                    {label}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Show only {label.toLowerCase()} buildings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>

      {Object.entries(filteredBuildings).map(([type, typeBuildings]) => (
        <BuildingGroup
          key={type}
          type={type}
          buildings={typeBuildings}
          resources={resources}
          onBuild={onBuild}
          onShowDetails={handleShowDetails}
        />
      ))}

      <BuildingDetailsDialog
        building={selectedBuilding}
        open={showBuildingDetails}
        onOpenChange={setShowBuildingDetails}
      />
    </div>
  );
};

export default Buildings;
