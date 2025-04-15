
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Home, 
  Settings as SettingsIcon, 
  Trophy, 
  Award, 
  HelpCircle, 
  Save, 
  RotateCcw,
  Menu as MenuIcon,
  Swords,
  Users,
  BookOpen,
  UserPlus,
  Map as MapIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/ThemeProvider";
import GameSettings from "./GameSettings";
import GameTutorial from "./GameTutorial";

interface GameHeaderProps {
  kingdomName: string;
  rulerName: string;
  age: number;
  onNewGame: () => void;
  onSaveGame: () => void;
  gameStarted: boolean;
  onMenuSelect: (menu: string) => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({
  kingdomName,
  rulerName,
  age,
  onNewGame,
  onSaveGame,
  gameStarted,
  onMenuSelect,
}) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  // Format age to show years and days
  const formatAge = (age: number) => {
    const years = Math.floor(age);
    const days = Math.floor((age - years) * 365);
    
    if (years === 0) {
      return `${days} days`;
    }
    
    return `${years} ${years === 1 ? 'year' : 'years'}, ${days} days`;
  };
  
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">
            {gameStarted ? kingdomName : "Create Your Kingdom"}
          </h1>
          {gameStarted && (
            <p className="text-muted-foreground">
              Ruled by {rulerName} for {formatAge(age)}
            </p>
          )}
        </div>
        <div className="flex mt-4 md:mt-0">
          <Button
            variant="outline"
            size="icon"
            className="mr-2"
            onClick={() => setShowTutorial(true)}
            title="Tutorial"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="mr-2"
            onClick={() => setShowSettings(true)}
            title="Settings"
          >
            <SettingsIcon className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="mr-2"
            onClick={onSaveGame}
            disabled={!gameStarted}
            title="Save Game"
          >
            <Save className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={onNewGame}
            title="New Game"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {gameStarted && (
        <div className="flex flex-wrap gap-2 mb-6 border-t border-b border-amber-800/20 py-3">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center"
            onClick={() => onMenuSelect("overview")}
          >
            <Home className="mr-1 h-4 w-4" /> Overview
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center"
            onClick={() => onMenuSelect("military")}
          >
            <Swords className="mr-1 h-4 w-4" /> Military
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center"
            onClick={() => onMenuSelect("diplomacy")}
          >
            <Users className="mr-1 h-4 w-4" /> Diplomacy
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center"
            onClick={() => onMenuSelect("research")}
          >
            <BookOpen className="mr-1 h-4 w-4" /> Research
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center"
            onClick={() => onMenuSelect("population")}
          >
            <UserPlus className="mr-1 h-4 w-4" /> Population
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center"
            onClick={() => onMenuSelect("land")}
          >
            <MapIcon className="mr-1 h-4 w-4" /> Land
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center"
            onClick={() => navigate("/leaderboard")}
          >
            <Trophy className="mr-1 h-4 w-4" /> Leaderboard
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center"
            onClick={() => navigate("/achievements")}
          >
            <Award className="mr-1 h-4 w-4" /> Achievements
          </Button>
        </div>
      )}
      
      {showSettings && <GameSettings onClose={() => setShowSettings(false)} />}
      {showTutorial && <GameTutorial onClose={() => setShowTutorial(false)} />}
    </>
  );
};

export default GameHeader;
