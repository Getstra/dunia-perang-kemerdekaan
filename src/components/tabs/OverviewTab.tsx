
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
        <div className={`neu-card ${theme}`}>
          {buildingsUnderConstruction > 0 && (
            <div className={`mb-4 px-4 py-2 rounded-md flex items-center ${
              theme === 'light' 
                ? 'bg-amber-100/80 border border-amber-300/50' 
                : 'bg-amber-900/30 border border-amber-800/50'
            }`}>
              <Clock className="h-5 w-5 text-amber-600 dark:text-amber-500 mr-2" />
              <span className={`font-medium ${
                theme === 'light' ? 'text-amber-800' : 'text-amber-400'
              }`}>
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
        <div className={`neu-card ${theme}`}>
          <GameLog actions={gameState.actions} />
        </div>
      </div>
    </>
  );
};

export default OverviewTab;
