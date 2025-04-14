import React, { useState } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { GameState } from "@/utils/types";
import GameHeader from "./GameHeader";
import KingdomCreate from "./KingdomCreate";
import Resources from "./Resources";
import Buildings from "./Buildings";
import GameLog from "./GameLog";

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
          )}

          {activeMenu === "military" && (
            <div className="md:col-span-3">
              <div className={`neu-card ${theme}`}>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Swords className="w-6 h-6 mr-2 text-amber-600" /> Military
                </h2>
                <p className="text-muted-foreground">
                  Manage your troops and plan attacks on other kingdoms.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
                    <h3 className="font-semibold text-lg mb-2">Army Units</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Train and manage your military forces
                    </p>
                    <div className="p-4 border border-dashed border-muted-foreground rounded-md text-center bg-black/10">
                      <p>Army management coming soon!</p>
                    </div>
                  </div>
                  <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
                    <h3 className="font-semibold text-lg mb-2">Battle Plans</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Plan attacks and defenses for your kingdom
                    </p>
                    <div className="p-4 border border-dashed border-muted-foreground rounded-md text-center bg-black/10">
                      <p>Battle planning coming soon!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeMenu === "diplomacy" && (
            <div className="md:col-span-3">
              <div className={`neu-card ${theme}`}>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Users className="w-6 h-6 mr-2 text-amber-600" /> Diplomacy
                </h2>
                <p className="text-muted-foreground">
                  Form alliances and trade with other kingdoms.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
                    <h3 className="font-semibold text-lg mb-2">Alliances</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Form alliances with neighboring kingdoms
                    </p>
                    <div className="p-4 border border-dashed border-muted-foreground rounded-md text-center bg-black/10">
                      <p>Alliance system coming soon!</p>
                    </div>
                  </div>
                  <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
                    <h3 className="font-semibold text-lg mb-2">Trade Routes</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Establish trade routes for resource exchange
                    </p>
                    <div className="p-4 border border-dashed border-muted-foreground rounded-md text-center bg-black/10">
                      <p>Trade system coming soon!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeMenu === "research" && (
            <div className="md:col-span-3">
              <div className={`neu-card ${theme}`}>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <BookOpen className="w-6 h-6 mr-2 text-amber-600" /> Research
                </h2>
                <p className="text-muted-foreground">
                  Discover new technologies to advance your kingdom.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
                    <h3 className="font-semibold text-lg mb-2">
                      Military Tech
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Improve your military capabilities
                    </p>
                    <div className="p-4 border border-dashed border-muted-foreground rounded-md text-center bg-black/10">
                      <p>Military research coming soon!</p>
                    </div>
                  </div>
                  <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
                    <h3 className="font-semibold text-lg mb-2">Economy Tech</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Enhance your resource production
                    </p>
                    <div className="p-4 border border-dashed border-muted-foreground rounded-md text-center bg-black/10">
                      <p>Economy research coming soon!</p>
                    </div>
                  </div>
                  <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
                    <h3 className="font-semibold text-lg mb-2">Magic Arts</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Discover magical abilities for your kingdom
                    </p>
                    <div className="p-4 border border-dashed border-muted-foreground rounded-md text-center bg-black/10">
                      <p>Magic research coming soon!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeMenu === "population" && (
            <div className="md:col-span-3">
              <div className={`neu-card ${theme}`}>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <UserPlus className="w-6 h-6 mr-2 text-amber-600" />{" "}
                  Population
                </h2>
                <p className="text-muted-foreground">
                  Manage your kingdom's population and specialists.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
                    <h3 className="font-semibold text-lg mb-2">Citizens</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Manage your general population
                    </p>
                    <div className="p-4 border border-dashed border-muted-foreground rounded-md text-center bg-black/10">
                      <p>Population management coming soon!</p>
                    </div>
                  </div>
                  <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
                    <h3 className="font-semibold text-lg mb-2">Specialists</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Train and assign specialized workers
                    </p>
                    <div className="p-4 border border-dashed border-muted-foreground rounded-md text-center bg-black/10">
                      <p>Specialist management coming soon!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeMenu === "land" && (
            <div className="md:col-span-3">
              <div className={`neu-card ${theme}`}>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Map className="w-6 h-6 mr-2 text-amber-600" /> Land
                </h2>
                <p className="text-muted-foreground">
                  View your kingdom's land and plan expansions.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
                    <h3 className="font-semibold text-lg mb-2">Territory</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Manage your current territory
                    </p>
                    <div className="p-4 border border-dashed border-muted-foreground rounded-md text-center bg-black/10">
                      <p>Territory management coming soon!</p>
                    </div>
                  </div>
                  <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
                    <h3 className="font-semibold text-lg mb-2">Expansion</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Explore and conquer new lands
                    </p>
                    <div className="p-4 border border-dashed border-muted-foreground rounded-md text-center bg-black/10">
                      <p>Expansion system coming soon!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GameContainer;
