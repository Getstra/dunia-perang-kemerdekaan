
import React from "react";
import { Building } from "../../utils/types";
import { Progress } from "@/components/ui/progress";
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
        <span className="font-medium text-amber-700 dark:text-amber-400">
          {progressValue.toFixed(0)}% Complete
        </span>
        <div className="flex items-center text-amber-600 dark:text-amber-500">
          <Clock className="w-4 h-4 mr-1.5" />
          <span>{timeRemaining}</span>
        </div>
      </div>
      <Progress
        value={progressValue}
        className="h-3 bg-amber-200/30 dark:bg-amber-950/50 rounded-full shadow-inner"
      />
    </div>
  );
};

export default BuildingProgress;
