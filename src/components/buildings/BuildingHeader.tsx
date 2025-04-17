
import React from "react";
import { Building } from "../../utils/types";
import { CheckCircle, Hourglass, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatTimeRemaining } from "./utils/buildingUtils";

interface BuildingHeaderProps {
  building: Building;
  onShowDetails: (building: Building) => void;
}

const BuildingHeader: React.FC<BuildingHeaderProps> = ({ building, onShowDetails }) => {
  return (
    <div className="flex justify-between items-start">
      <div>
        <div className="flex items-center">
          <h4 className="font-semibold text-lg text-amber-800 dark:text-amber-400">
            {building.name}{" "}
            {building.level > 0 && (
              <span className="ml-1 text-sm font-medium px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300 shadow-inner">
                Level {building.level}
                {building.maxLevel && building.level < building.maxLevel && (
                  <span className="ml-1 text-xs text-amber-600 dark:text-amber-500">
                    / {building.maxLevel}
                  </span>
                )}
                {building.maxLevel && building.level >= building.maxLevel && (
                  <span className="ml-1 text-xs text-emerald-600 dark:text-emerald-500">
                    (Max)
                  </span>
                )}
              </span>
            )}
          </h4>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 ml-1"
                  onClick={() => onShowDetails(building)}
                >
                  <Info className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View building details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {building.description}
        </p>
      </div>

      {building.completionTime && !building.completed && (
        <div className="flex items-center text-amber-600 bg-amber-100/50 dark:bg-amber-900/30 px-3 py-1.5 rounded-full shadow-sm border border-amber-200/50 dark:border-amber-700/30">
          <Hourglass className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">
            {formatTimeRemaining(building.completionTime)}
          </span>
        </div>
      )}

      {building.completed && (
        <div className="flex items-center text-green-600 bg-green-100/50 dark:bg-green-900/30 px-3 py-1.5 rounded-full shadow-sm border border-green-200/50 dark:border-green-700/30">
          <CheckCircle className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">Complete</span>
        </div>
      )}
    </div>
  );
};

export default BuildingHeader;
