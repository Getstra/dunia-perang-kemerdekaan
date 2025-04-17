
import React from "react";
import { Building, Resources } from "../../utils/types";
import { AlertTriangle, CheckCircle, Clock, Hammer } from "lucide-react";
import { canBuild, formatTimeRemaining } from "./utils/buildingUtils";

interface BuildingActionButtonProps {
  building: Building;
  resources: Resources;
  onBuild: (buildingId: string) => void;
}

const BuildingActionButton: React.FC<BuildingActionButtonProps> = ({
  building,
  resources,
  onBuild,
}) => {
  const isAtMaxLevel = building.maxLevel && building.level >= building.maxLevel;
  const canBuildBuilding = canBuild(building, resources);
  
  // If building is in progress, show construction status
  if (building.completionTime && !building.completed) {
    const timeRemaining = formatTimeRemaining(building.completionTime);
    
    return (
      <div className="mt-4">
        <div className="w-full py-2.5 px-4 rounded-md border text-sm font-semibold bg-amber-600/80 text-white border-amber-700 flex items-center justify-center">
          <Clock className="w-4 h-4 mr-2 animate-pulse" />
          <span>
            Construction in progress: {timeRemaining}
          </span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="mt-4">
      <button
        onClick={() => onBuild(building.id)}
        disabled={!canBuildBuilding || isAtMaxLevel}
        className={`w-full py-2.5 px-4 rounded-md border text-sm font-semibold shadow-md transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]
          ${
            canBuildBuilding
              ? building.level === 0
                ? "bg-amber-600 hover:bg-amber-700 text-white border-amber-700 transition-colors shadow-amber-500/20"
                : isAtMaxLevel
                  ? "bg-gray-400 text-gray-100 border-gray-500 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700 transition-colors shadow-emerald-500/20"
              : "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
          }`}
      >
        {building.level === 0 ? (
          <span className="flex items-center justify-center">
            <Hammer className="w-4 h-4 mr-1.5" />
            Build {building.name}
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 mr-1.5"
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

      {!canBuildBuilding && (
        <div className="flex items-center mt-3 text-sm text-red-600 bg-red-100/50 dark:bg-red-900/20 px-3 py-2 rounded-md shadow-sm border border-red-200/50 dark:border-red-700/30">
          <AlertTriangle className="w-4 h-4 mr-1" />
          <span>Not enough resources</span>
        </div>
      )}

      {isAtMaxLevel && (
        <div className="flex items-center mt-3 text-sm text-emerald-600 bg-emerald-100/50 dark:bg-emerald-900/20 px-3 py-2 rounded-md shadow-sm border border-emerald-200/50 dark:border-emerald-700/30">
          <CheckCircle className="w-4 h-4 mr-1" />
          <span>Maximum level reached</span>
        </div>
      )}
    </div>
  );
};

export default BuildingActionButton;
