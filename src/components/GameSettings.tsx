
import React, { useState } from "react";
import { Settings, X, Volume2, Music, Bell, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useTheme } from "@/providers/ThemeProvider";

interface GameSettingsProps {
  onClose: () => void;
}

const GameSettings: React.FC<GameSettingsProps> = ({ onClose }) => {
  const { theme, setTheme } = useTheme();
  const [soundVolume, setSoundVolume] = useState(80);
  const [musicVolume, setMusicVolume] = useState(60);
  const [notifications, setNotifications] = useState(true);
  const [chatEnabled, setChatEnabled] = useState(true);
  
  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className={`neu-card ${theme} max-w-md w-full relative`}>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-2" 
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center mb-6">
          <Settings className="w-6 h-6 mr-2 text-amber-600" />
          <h2 className="text-2xl font-bold">Game Settings</h2>
        </div>
        
        <div className="space-y-6">
          <div className="p-4 border border-amber-800/30 rounded-md bg-amber-900/5">
            <h3 className="text-lg font-semibold mb-4">Game Options</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Volume2 className="w-5 h-5 mr-2 text-muted-foreground" />
                  <span>Sound Effects</span>
                </div>
                <Slider 
                  value={[soundVolume]} 
                  onValueChange={(value) => setSoundVolume(value[0])}
                  max={100}
                  step={1}
                  className="w-1/2"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Music className="w-5 h-5 mr-2 text-muted-foreground" />
                  <span>Music</span>
                </div>
                <Slider 
                  value={[musicVolume]} 
                  onValueChange={(value) => setMusicVolume(value[0])}
                  max={100}
                  step={1}
                  className="w-1/2"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-muted-foreground" />
                  <span>Notifications</span>
                </div>
                <Switch 
                  checked={notifications} 
                  onCheckedChange={setNotifications} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-muted-foreground" />
                  <span>In-game Chat</span>
                </div>
                <Switch 
                  checked={chatEnabled} 
                  onCheckedChange={setChatEnabled} 
                />
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-amber-800/30 rounded-md bg-amber-900/5">
            <h3 className="text-lg font-semibold mb-4">Interface</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Dark Mode</span>
                <Switch 
                  checked={theme === "dark"} 
                  onCheckedChange={handleThemeChange} 
                />
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-amber-800/30 rounded-md bg-amber-900/5">
            <h3 className="text-lg font-semibold mb-4">Game Data</h3>
            
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Reset Tutorial
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-500">
                Reset Game Progress
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Button onClick={onClose}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameSettings;
