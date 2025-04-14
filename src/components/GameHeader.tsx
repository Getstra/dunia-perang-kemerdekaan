import React, { useState } from "react";
import {
  Scroll,
  Home,
  Settings,
  LogOut,
  Users,
  Swords,
  BookOpen,
  UserPlus,
  Map,
} from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

interface GameHeaderProps {
  kingdomName: string;
  rulerName: string;
  age: number;
  onNewGame: () => void;
  onSaveGame: () => void;
  gameStarted: boolean;
  onMenuSelect?: (menu: string) => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({
  kingdomName,
  rulerName,
  age,
  onNewGame,
  onSaveGame,
  gameStarted,
  onMenuSelect = () => {},
}) => {
  const { signOut } = useAuth();
  const [activeMenu, setActiveMenu] = useState("overview");

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    onMenuSelect(menu);
  };

  return (
    <header className="border-b border-wood-dark pb-2 mb-4">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center">
          <Scroll className="w-10 h-10 text-royal-red mr-2 animate-pulse" />
          <h1 className="medieval-heading text-3xl bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">
            Utopia Kingdoms
          </h1>
        </div>

        {gameStarted && (
          <div className="text-center md:text-right mt-2 md:mt-0">
            <div className="text-xl">
              <span className="font-semibold">{kingdomName}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Ruled by{" "}
              <span className="text-amber-600 font-medium">{rulerName}</span> •
              Age:{" "}
              <span className="text-amber-600 font-medium">
                {Math.floor(age)}
              </span>{" "}
              days
            </div>
          </div>
        )}

        <div className="flex space-x-2 mt-4 md:mt-0">
          <button
            onClick={onNewGame}
            className="medieval-button flex items-center hover:bg-amber-700 transition-colors"
          >
            <Home className="w-4 h-4 mr-1" />
            {gameStarted ? "New Kingdom" : "Start Game"}
          </button>

          {gameStarted && (
            <button
              onClick={onSaveGame}
              className="medieval-button flex items-center hover:bg-amber-700 transition-colors"
            >
              <Settings className="w-4 h-4 mr-1" />
              Save Game
            </button>
          )}

          <button
            onClick={signOut}
            className="medieval-button flex items-center hover:bg-amber-700 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4 mr-1" />
            Sign Out
          </button>
        </div>
      </div>

      {gameStarted && (
        <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start bg-gradient-to-r from-amber-900/10 to-transparent p-2 rounded-md">
          <button
            onClick={() => handleMenuClick("overview")}
            className={`medieval-button-sm flex items-center ${activeMenu === "overview" ? "medieval-button-active" : ""} hover:bg-amber-700/80 transition-colors`}
          >
            <Home className="w-4 h-4 mr-1" />
            Overview
          </button>
          <button
            onClick={() => handleMenuClick("military")}
            className={`medieval-button-sm flex items-center ${activeMenu === "military" ? "medieval-button-active" : ""} hover:bg-amber-700/80 transition-colors`}
          >
            <Swords className="w-4 h-4 mr-1" />
            Military
          </button>
          <button
            onClick={() => handleMenuClick("diplomacy")}
            className={`medieval-button-sm flex items-center ${activeMenu === "diplomacy" ? "medieval-button-active" : ""} hover:bg-amber-700/80 transition-colors`}
          >
            <Users className="w-4 h-4 mr-1" />
            Diplomacy
          </button>
          <button
            onClick={() => handleMenuClick("research")}
            className={`medieval-button-sm flex items-center ${activeMenu === "research" ? "medieval-button-active" : ""} hover:bg-amber-700/80 transition-colors`}
          >
            <BookOpen className="w-4 h-4 mr-1" />
            Research
          </button>
          <button
            onClick={() => handleMenuClick("population")}
            className={`medieval-button-sm flex items-center ${activeMenu === "population" ? "medieval-button-active" : ""} hover:bg-amber-700/80 transition-colors`}
          >
            <UserPlus className="w-4 h-4 mr-1" />
            Population
          </button>
          <button
            onClick={() => handleMenuClick("land")}
            className={`medieval-button-sm flex items-center ${activeMenu === "land" ? "medieval-button-active" : ""} hover:bg-amber-700/80 transition-colors`}
          >
            <Map className="w-4 h-4 mr-1" />
            Land
          </button>
        </div>
      )}
    </header>
  );
};

export default GameHeader;
