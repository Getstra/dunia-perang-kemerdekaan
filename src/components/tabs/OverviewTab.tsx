
import React from "react";
import { useTheme } from "@/providers/ThemeProvider";
import Buildings from "../buildings/Buildings";
import GameLog from "../GameLog";
import { GameState } from "@/utils/types";
import { Clock } from "lucide-react";

interface OverviewTabProps {
  gameState: GameState;
  onBuild: (buildingId: string) => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ gameState, onBuild }) => {
  const { theme } = useTheme();
  
  // Count buildings under construction
  const buildingsUnderConstruction = gameState.buildings.filter(
    (b) => b.completionTime && !b.completed
  ).length;

  return (
    <>
      <div className="md:col-span-2">
        <div className={`glass-card ${theme}`}>
          {buildingsUnderConstruction > 0 && (
            <div className="mb-4 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-800/50 rounded-md flex items-center">
              <Clock className="h-5 w-5 text-amber-600 mr-2" />
              <span className="text-amber-800 dark:text-amber-400 font-medium">
                {buildingsUnderConstruction} {buildingsUnderConstruction === 1 ? 'building' : 'buildings'} under construction
              </span>
            </div>
          )}
          <Buildings
            buildings={gameState.buildings}
            resources={gameState.resources}
            onBuild={onBuild}
          />
        </div>
      </div>

      <div className="md:col-span-1">
        <div className={`glass-card ${theme}`}>
          <GameLog actions={gameState.actions} />
        </div>
      </div>
    </>
  );
};

export default OverviewTab;
