import React from "react";
import { Building, Resources } from "../../utils/types";
import {
  Hourglass,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BuildingCardProps {
  building: Building;
  resources: Resources;
  onBuild: (buildingId: string) => void;
  onShowDetails: (building: Building) => void;
}

const BuildingCard: React.FC<BuildingCardProps> = ({
  building,
  resources,
  onBuild,
  onShowDetails,
}) => {
  // Helper to check if we have enough resources to build
  const canBuild = (building: Building): boolean => {
    if (building.cost.gold && resources.gold < building.cost.gold) return false;
    if (building.cost.wood && resources.wood < building.cost.wood) return false;
    if (building.cost.stone && resources.stone < building.cost.stone)
      return false;
    if (building.cost.food && resources.food < building.cost.food) return false;
    return true;
  };

  // Format time remaining
  const formatTimeRemaining = (completionTime: number | undefined): string => {
    if (!completionTime) return "0m";

    const now = Date.now();
    const remaining = Math.max(0, completionTime - now);
    const minutes = Math.floor(remaining / (1000 * 60));

    if (minutes < 1) return "Completing...";
    return `${minutes}m remaining`;
  };

  // Calculate completion percentage
  const calculateProgress = (building: Building): number => {
    if (!building.completionTime || building.completed) return 100;

    const now = Date.now();
    const totalTime = building.constructionTime * 60 * 1000; // Convert minutes to ms
    const elapsedTime = now - (building.completionTime - totalTime);

    return Math.min(100, Math.max(0, (elapsedTime / totalTime) * 100));
  };

  return (
    <div
      className={`glass-panel rounded-md p-3 ${
        building.completed
          ? "border-green-600/30 bg-green-600/10"
          : building.completionTime
            ? "border-amber-600/30 bg-amber-900/20"
            : ""
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center">
            <h4 className="font-medium text-lg">
              {building.name}{" "}
              {building.level > 0 && `(Level ${building.level})`}
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
          <p className="text-sm text-muted-foreground">
            {building.description}
          </p>
        </div>

        {building.completionTime && !building.completed && (
          <div className="flex items-center text-amber-600">
            <Hourglass className="w-4 h-4 mr-1" />
            <span className="text-sm">
              {formatTimeRemaining(building.completionTime)}
            </span>
          </div>
        )}

        {building.completed && (
          <div className="flex items-center text-green-600">
            <CheckCircle className="w-4 h-4 mr-1" />
            <span className="text-sm">Complete</span>
          </div>
        )}
      </div>

      {building.completionTime && !building.completed && (
        <div className="mt-2">
          <Progress value={calculateProgress(building)} className="h-1.5" />
        </div>
      )}

      {!building.completionTime && (
        <div className="space-y-2 mt-3">
          <div className="flex flex-wrap gap-2 text-sm">
            {building.cost.gold && (
              <span
                className={
                  resources.gold < building.cost.gold ? "text-red-600" : ""
                }
              >
                Gold: {building.cost.gold}
              </span>
            )}
            {building.cost.wood && (
              <span
                className={
                  resources.wood < building.cost.wood ? "text-red-600" : ""
                }
              >
                Wood: {building.cost.wood}
              </span>
            )}
            {building.cost.stone && (
              <span
                className={
                  resources.stone < building.cost.stone ? "text-red-600" : ""
                }
              >
                Stone: {building.cost.stone}
              </span>
            )}
            {building.cost.food && (
              <span
                className={
                  resources.food < building.cost.food ? "text-red-600" : ""
                }
              >
                Food: {building.cost.food}
              </span>
            )}
          </div>

          <div className="flex items-center text-sm">
            <Clock className="w-4 h-4 mr-1" />
            <span>{building.constructionTime} minutes</span>
          </div>

          {building.production &&
            Object.keys(building.production).length > 0 && (
              <div className="text-sm">
                <span className="font-medium">Produces: </span>
                {Object.entries(building.production)
                  .filter(([_, value]) => value)
                  .map(([key, value]) => `${value} ${key}`)
                  .join(", ")}
              </div>
            )}

          <button
            onClick={() => onBuild(building.id)}
            disabled={!canBuild(building)}
            className={`w-full mt-2 py-1 px-3 rounded-sm border text-sm font-medium
              ${
                canBuild(building)
                  ? "bg-amber-600 hover:bg-amber-700 text-white border-amber-700 transition-colors"
                  : "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
              }`}
          >
            {building.level === 0 ? "Build" : "Upgrade"} {building.name}
          </button>

          {!canBuild(building) && (
            <div className="flex items-center mt-1 text-sm text-red-600">
              <AlertTriangle className="w-3 h-3 mr-1" />
              <span>Not enough resources</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BuildingCard;
