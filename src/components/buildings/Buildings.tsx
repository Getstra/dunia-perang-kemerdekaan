
import React, { useState } from 'react';
import { Building, Resources } from '../../utils/types';
import { Building2 } from 'lucide-react';
import BuildingGroup from './BuildingGroup';
import BuildingDetailsDialog from './BuildingDetailsDialog';

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
  
  const handleShowDetails = (building: Building) => {
    setSelectedBuilding(building);
    setShowBuildingDetails(true);
  };
  
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Building2 className="w-6 h-6 mr-2 text-amber-600" /> Buildings
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
