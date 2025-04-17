import React, { useState } from "react";
import { Building, Resources } from "../../utils/types";
import { Building2 } from "lucide-react";
import BuildingGroup from "./BuildingGroup";
import BuildingDetailsDialog from "./BuildingDetailsDialog";

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

  return (
    <div className="mb-6 px-4 py-3 rounded-xl bg-amber-50/30 dark:bg-amber-950/20 backdrop-blur-sm shadow-lg border border-amber-200/30 dark:border-amber-800/30">
      <h2 className="text-3xl font-bold mb-6 flex items-center pb-3 border-b border-amber-800/20">
        <Building2 className="w-8 h-8 mr-3 text-amber-600 drop-shadow-md" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-800 dark:from-amber-400 dark:to-amber-600 drop-shadow-sm">
          Buildings
        </span>
      </h2>

      {Object.entries(groupedBuildings).map(([type, typeBuildings]) => (
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
