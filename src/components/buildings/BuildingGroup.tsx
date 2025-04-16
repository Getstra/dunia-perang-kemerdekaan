
import React from 'react';
import { Building, Resources } from '../../utils/types';
import { Coins, Sword, Sparkles, Building2 } from 'lucide-react';
import BuildingCard from './BuildingCard';

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
  onShowDetails
}) => {
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
    <div className="mb-6 bg-amber-900/5 border border-amber-800/20 rounded-md p-4">
      <h3 className="font-semibold text-lg mb-3 flex items-center">
        {getBuildingTypeIcon(type)} {getBuildingTypeLabel(type)}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {buildings.map(building => (
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
