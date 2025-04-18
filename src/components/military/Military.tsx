import React from "react";
import { Sword, Shield, Crosshair, Zap, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface MilitaryUnit {
  id: string;
  name: string;
  type: string;
  count: number;
  level: number;
  experience: number;
  training: number;
  trainingTime: number;
  trainingProgress: number;
  attack: number;
  defense: number;
  speed: number;
  cost: {
    gold: number;
    iron: number;
    wood: number;
  };
}

interface MilitaryProps {
  units: MilitaryUnit[];
  resources: {
    gold: number;
    iron: number;
    wood: number;
  };
  onTrain: (unitId: string) => void;
}

const Military: React.FC<MilitaryProps> = ({ units, resources, onTrain }) => {
  const getUnitIcon = (type: string) => {
    switch (type) {
      case "infantry":
        return Sword;
      case "cavalry":
        return Zap;
      case "archer":
        return Crosshair;
      case "defense":
        return Shield;
      default:
        return Sword;
    }
  };

  const canTrainUnit = (unit: MilitaryUnit) => {
    return (
      resources.gold >= unit.cost.gold &&
      resources.iron >= unit.cost.iron &&
      resources.wood >= unit.cost.wood
    );
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    } else {
      return `${remainingSeconds}s`;
    }
  };

  const getLevelColor = (level: number) => {
    if (level >= 10) return "text-purple-500";
    if (level >= 7) return "text-blue-500";
    if (level >= 4) return "text-green-500";
    return "text-yellow-500";
  };

  const getExperienceToNextLevel = (level: number) => {
    return level * 100;
  };

  return (
    <div className="mb-6 px-4 py-3 rounded-xl bg-red-50/30 dark:bg-red-950/20 backdrop-blur-sm shadow-lg border border-red-200/30 dark:border-red-800/30">
      <h2 className="text-3xl font-bold mb-4 flex items-center pb-3 border-b border-red-800/20">
        <Sword className="w-8 h-8 mr-3 text-red-600 drop-shadow-md" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800 dark:from-red-400 dark:to-red-600 drop-shadow-sm">
          Military
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {units.map((unit) => {
          const Icon = getUnitIcon(unit.type);
          const canTrain = canTrainUnit(unit);
          const trainingProgress = (unit.trainingProgress / unit.trainingTime) * 100;
          const experienceToNextLevel = getExperienceToNextLevel(unit.level);
          const levelProgress = (unit.experience / experienceToNextLevel) * 100;
          
          return (
            <div
              key={unit.id}
              className="p-4 bg-red-900/10 rounded-lg border border-red-800/30 hover:border-red-700/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Icon className="w-5 h-5 mr-2 text-red-600" />
                  <h3 className="font-semibold">{unit.name}</h3>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-red-600 font-medium mr-2">
                    {unit.count}
                  </span>
                  <div className={`flex items-center ${getLevelColor(unit.level)}`}>
                    <Star className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">{unit.level}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Attack: {unit.attack * (1 + (unit.level - 1) * 0.1)}</span>
                  <span>Defense: {unit.defense * (1 + (unit.level - 1) * 0.1)}</span>
                  <span>Speed: {unit.speed * (1 + (unit.level - 1) * 0.05)}</span>
                </div>

                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-amber-600">Experience</span>
                    <span className="text-amber-600">
                      {unit.experience}/{experienceToNextLevel}
                    </span>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={levelProgress} 
                      className="h-1.5 bg-amber-900/20"
                    />
                    <div 
                      className="absolute inset-0 h-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600"
                      style={{ width: `${levelProgress}%` }}
                    />
                  </div>
                </div>

                {unit.trainingProgress > 0 && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Training Progress</span>
                      <span>
                        {formatTime(unit.trainingTime - unit.trainingProgress)} remaining
                      </span>
                    </div>
                    <div className="relative">
                      <Progress 
                        value={trainingProgress} 
                        className="h-1.5 bg-red-900/20"
                      />
                      <div 
                        className="absolute inset-0 h-1.5 rounded-full bg-gradient-to-r from-red-500 to-red-600 animate-pulse"
                        style={{ width: `${trainingProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Training Time:</span>
                  <span>{formatTime(unit.trainingTime)}</span>
                </div>

                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Cost:</span>
                  <div className="flex gap-2">
                    <span className={resources.gold >= unit.cost.gold ? "text-amber-600" : "text-red-600"}>
                      {unit.cost.gold} Gold
                    </span>
                    <span className={resources.iron >= unit.cost.iron ? "text-amber-600" : "text-red-600"}>
                      {unit.cost.iron} Iron
                    </span>
                    <span className={resources.wood >= unit.cost.wood ? "text-amber-600" : "text-red-600"}>
                      {unit.cost.wood} Wood
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onTrain(unit.id)}
                  disabled={!canTrain || unit.trainingProgress > 0}
                  className={`w-full mt-2 py-1.5 px-3 rounded-md text-sm font-medium transition-colors ${
                    canTrain && unit.trainingProgress === 0
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-red-900/20 text-red-600/50 cursor-not-allowed"
                  }`}
                >
                  {unit.trainingProgress > 0 ? "Training..." : "Train Unit"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Military; 