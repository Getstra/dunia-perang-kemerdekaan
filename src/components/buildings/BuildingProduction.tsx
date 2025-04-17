
import React from "react";
import { Building } from "../../utils/types";

interface BuildingProductionProps {
  building: Building;
}

const BuildingProduction: React.FC<BuildingProductionProps> = ({ building }) => {
  if (!building.production || Object.keys(building.production).length === 0) {
    return null;
  }

  return (
    <div className="text-sm bg-green-100/50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-2 rounded-md shadow-sm border border-green-200/50 dark:border-green-700/30">
      <span className="font-medium">Produces: </span>
      {Object.entries(building.production)
        .filter(([key, value]) => {
          // Skip specialists object and undefined/null values
          return key !== 'specialists' && value !== undefined && value !== null;
        })
        .map(([key, value], index, arr) => (
          <span key={key} className="inline-flex items-center">
            <span className="font-semibold">{value as React.ReactNode}</span> {key}
            {index < arr.length - 1 ? ", " : ""}
          </span>
        ))}
        
      {/* Handle specialists separately if they exist */}
      {building.production.specialists && 
       typeof building.production.specialists === 'object' && 
       Object.keys(building.production.specialists).length > 0 && (
        <div className="mt-1">
          <span className="font-medium">Specialists: </span>
          {Object.entries(building.production.specialists as Record<string, number>)
            .filter(([_, value]) => value !== undefined && value !== null && value > 0)
            .map(([key, value], index, arr) => (
              <span key={key} className="inline-flex items-center">
                <span className="font-semibold">{value}</span> {key}
                {index < arr.length - 1 ? ", " : ""}
              </span>
            ))}
        </div>
      )}
    </div>
  );
};

export default BuildingProduction;
