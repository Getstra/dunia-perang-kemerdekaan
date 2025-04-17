
import React from "react";
import { Building, Resources } from "../../utils/types";
import { Clock } from "lucide-react";

interface BuildingCostProps {
  building: Building;
  resources: Resources;
}

const BuildingCost: React.FC<BuildingCostProps> = ({ building, resources }) => {
  return (
    <div className="space-y-3">
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
    </div>
  );
};

export default BuildingCost;
