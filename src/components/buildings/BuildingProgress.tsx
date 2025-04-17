
import React from "react";
import { Building } from "../../utils/types";
import { Progress } from "@/components/ui/progress";
import { calculateProgress } from "./utils/buildingUtils";

interface BuildingProgressProps {
  building: Building;
}

const BuildingProgress: React.FC<BuildingProgressProps> = ({ building }) => {
  if (!building.completionTime || building.completed) {
    return null;
  }

  return (
    <div className="mt-4">
      <Progress
        value={calculateProgress(building)}
        className="h-3 bg-amber-200/30 dark:bg-amber-950/50 rounded-full shadow-inner"
      />
    </div>
  );
};

export default BuildingProgress;
