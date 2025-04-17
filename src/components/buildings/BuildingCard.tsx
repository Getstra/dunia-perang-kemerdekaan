
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
      className={`glass-panel rounded-lg p-5 shadow-lg backdrop-blur-sm border transition-all duration-300 hover:shadow-xl ${
        building.completed
          ? "border-green-600/30 bg-green-600/10 hover:bg-green-600/15"
          : building.completionTime
            ? "border-amber-600/30 bg-amber-900/20 hover:bg-amber-900/25"
            : "border-amber-500/20 bg-amber-50/10 dark:bg-amber-950/10 hover:bg-amber-50/20 dark:hover:bg-amber-950/20"
      }`}
    >
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

      {building.completionTime && !building.completed && (
        <div className="mt-4">
          <Progress
            value={calculateProgress(building)}
            className="h-3 bg-amber-200/30 dark:bg-amber-950/50 rounded-full shadow-inner"
          />
        </div>
      )}

      {!building.completionTime && (
        <div className="space-y-3 mt-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            {building.cost.gold && (
              <span
                className={`flex items-center px-2 py-1 rounded-md ${resources.gold < building.cost.gold ? "bg-red-100/50 dark:bg-red-900/30 text-red-600 dark:text-red-400" : "bg-amber-100/50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="8" />
                  <path d="M9.5 9.5c.5-1 2-1 2.5.5s2 1.5 2.5 0 2-1 2.5.5 2 1.5 2.5 0" />
                </svg>
                {building.cost.gold}
              </span>
            )}
            {building.cost.wood && (
              <span
                className={`flex items-center px-2 py-1 rounded-md ${resources.wood < building.cost.wood ? "bg-red-100/50 dark:bg-red-900/30 text-red-600 dark:text-red-400" : "bg-amber-100/50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 22V9.5a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3V22" />
                  <path d="M10 14h4" />
                  <path d="M13 6.5a3 3 0 0 1 3 3h0a3 3 0 0 1-3 3" />
                </svg>
                {building.cost.wood}
              </span>
            )}
            {building.cost.stone && (
              <span
                className={`flex items-center px-2 py-1 rounded-md ${resources.stone < building.cost.stone ? "bg-red-100/50 dark:bg-red-900/30 text-red-600 dark:text-red-400" : "bg-amber-100/50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 3-4 7h8Z" />
                  <path d="m17 13-5 8-5-8Z" />
                </svg>
                {building.cost.stone}
              </span>
            )}
            {building.cost.food && (
              <span
                className={`flex items-center px-2 py-1 rounded-md ${resources.food < building.cost.food ? "bg-red-100/50 dark:bg-red-900/30 text-red-600 dark:text-red-400" : "bg-amber-100/50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  <path d="M19.5 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                  <path d="M7.5 7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                  <path d="M19.5 19.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                  <path d="M7.5 19.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                </svg>
                {building.cost.food}
              </span>
            )}
          </div>

          <div className="flex items-center text-sm bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-md shadow-sm border border-blue-200/50 dark:border-blue-700/30">
            <Clock className="w-4 h-4 mr-1" />
            <span>{building.constructionTime} minutes</span>
          </div>

          {building.production && Object.keys(building.production).length > 0 && (
            <div className="text-sm bg-green-100/50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-2 rounded-md shadow-sm border border-green-200/50 dark:border-green-700/30">
              <span className="font-medium">Produces: </span>
              {Object.entries(building.production)
                .filter(([key, value]) => {
                  // Skip specialists object and undefined/null values
                  return key !== 'specialists' && value !== undefined && value !== null;
                })
                .map(([key, value], index, arr) => (
                  <span key={key} className="inline-flex items-center">
                    <span className="font-semibold">{value}</span> {key}
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
          )}

          <button
            onClick={() => onBuild(building.id)}
            disabled={
              !canBuild(building) ||
              (building.maxLevel && building.level >= building.maxLevel)
            }
            className={`w-full mt-4 py-2.5 px-4 rounded-md border text-sm font-semibold shadow-md transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]
              ${
                canBuild(building)
                  ? building.level === 0
                    ? "bg-amber-600 hover:bg-amber-700 text-white border-amber-700 transition-colors shadow-amber-500/20"
                    : building.maxLevel && building.level >= building.maxLevel
                      ? "bg-gray-400 text-gray-100 border-gray-500 cursor-not-allowed"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700 transition-colors shadow-emerald-500/20"
                  : "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
              }`}
          >
            {building.level === 0 ? (
              <span className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                Build {building.name}
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
                Upgrade to Level {building.level + 1}
              </span>
            )}
          </button>

          {!canBuild(building) && (
            <div className="flex items-center mt-3 text-sm text-red-600 bg-red-100/50 dark:bg-red-900/20 px-3 py-2 rounded-md shadow-sm border border-red-200/50 dark:border-red-700/30">
              <AlertTriangle className="w-4 h-4 mr-1" />
              <span>Not enough resources</span>
            </div>
          )}

          {building.maxLevel && building.level >= building.maxLevel && (
            <div className="flex items-center mt-3 text-sm text-emerald-600 bg-emerald-100/50 dark:bg-emerald-900/20 px-3 py-2 rounded-md shadow-sm border border-emerald-200/50 dark:border-emerald-700/30">
              <CheckCircle className="w-4 h-4 mr-1" />
              <span>Maximum level reached</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BuildingCard;
