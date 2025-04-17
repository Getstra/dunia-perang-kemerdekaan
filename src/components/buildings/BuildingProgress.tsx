
import React from "react";
import { Building } from "../../utils/types";
import { calculateProgress, formatTimeRemaining } from "./utils/buildingUtils";
import { Clock } from "lucide-react";

interface BuildingProgressProps {
  building: Building;
}

const BuildingProgress: React.FC<BuildingProgressProps> = ({ building }) => {
  if (!building.completionTime || building.completed) {
    return null;
  }
  
  const progressValue = calculateProgress(building);
  const timeRemaining = formatTimeRemaining(building.completionTime);

  return (
    <div className="mt-4 space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className={`font-medium ${building.completed ? "text-green-600 dark:text-green-400" : "text-amber-700 dark:text-amber-400"}`}>
          {progressValue.toFixed(0)}% Complete
        </span>
        <div className="flex items-center text-amber-600 dark:text-amber-500">
          <Clock className="w-4 h-4 mr-1.5" />
          <span>{timeRemaining}</span>
        </div>
      </div>
      <div className="neu-progress h-4 rounded-full overflow-hidden relative">
        <div 
          className="neu-progress-bar h-full transition-all duration-300" 
          style={{ width: `${progressValue}%` }}
        ></div>
      </div>
    </div>
  );
};

export default BuildingProgress;
