
import React from "react";
import { useTheme } from "@/providers/ThemeProvider";
import Buildings from "../Buildings";
import GameLog from "../GameLog";
import { GameState } from "@/utils/types";

interface OverviewTabProps {
  gameState: GameState;
  onBuild: (buildingId: string) => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ gameState, onBuild }) => {
  const { theme } = useTheme();

  return (
    <>
      <div className="md:col-span-2">
        <div className={`neu-card ${theme}`}>
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
