
import React, { useState } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { GameState } from "@/utils/types";
import GameHeader from "./GameHeader";
import KingdomCreate from "./KingdomCreate";
import Resources from "./Resources";
import OverviewTab from "./tabs/OverviewTab";
import MilitaryTab from "./tabs/MilitaryTab";
import DiplomacyTab from "./tabs/DiplomacyTab";
import ResearchTab from "./tabs/ResearchTab";
import PopulationTab from "./tabs/PopulationTab";
import LandTab from "./tabs/LandTab";

interface GameContainerProps {
  gameState: GameState;
  onCreateKingdom: (name: string, ruler: string) => void;
  onNewGame: () => void;
  onSaveGame: () => void;
  onBuild: (buildingId: string) => void;
}

const GameContainer: React.FC<GameContainerProps> = ({
  gameState,
  onCreateKingdom,
  onNewGame,
  onSaveGame,
  onBuild,
}) => {
  const { theme } = useTheme();
  const [activeMenu, setActiveMenu] = useState("overview");

  return (
    <div className={`neu-card ${theme}`}>
      <GameHeader
        kingdomName={gameState.kingdom.name}
        rulerName={gameState.kingdom.ruler}
        age={gameState.kingdom.age}
        onNewGame={onNewGame}
        onSaveGame={onSaveGame}
        gameStarted={gameState.gameStarted}
        onMenuSelect={setActiveMenu}
      />

      {!gameState.gameStarted ? (
        <KingdomCreate onCreateKingdom={onCreateKingdom} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="md:col-span-3">
            <div className={`neu-card ${theme}`}>
              <Resources resources={gameState.resources} />
            </div>
          </div>

          {activeMenu === "overview" && (
            <OverviewTab gameState={gameState} onBuild={onBuild} />
          )}

          {activeMenu === "military" && <MilitaryTab />}

          {activeMenu === "diplomacy" && <DiplomacyTab />}

          {activeMenu === "research" && <ResearchTab />}

          {activeMenu === "population" && <PopulationTab />}

          {activeMenu === "land" && <LandTab />}
        </div>
      )}
    </div>
  );
};

export default GameContainer;
