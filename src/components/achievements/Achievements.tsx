import React from "react";
import { Trophy, Medal, Star, Award, CheckCircle2, Lock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Achievement {
  id: string;
  name: string;
  description: string;
  category: "military" | "economic" | "scientific" | "exploration" | "social";
  progress: number;
  maxProgress: number;
  reward: {
    gold: number;
    points: number;
  };
  unlocked: boolean;
  dateUnlocked?: string;
}

interface AchievementsProps {
  achievements: Achievement[];
}

const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "military":
        return Trophy;
      case "economic":
        return Star;
      case "scientific":
        return Medal;
      case "exploration":
        return Award;
      case "social":
        return Star;
      default:
        return Award;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "military":
        return "text-red-600";
      case "economic":
        return "text-amber-600";
      case "scientific":
        return "text-blue-600";
      case "exploration":
        return "text-green-600";
      case "social":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="mb-6 px-4 py-3 rounded-xl bg-purple-50/30 dark:bg-purple-950/20 backdrop-blur-sm shadow-lg border border-purple-200/30 dark:border-purple-800/30">
      <h2 className="text-3xl font-bold mb-4 flex items-center pb-3 border-b border-purple-800/20">
        <Trophy className="w-8 h-8 mr-3 text-purple-600 drop-shadow-md" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 drop-shadow-sm">
          Achievements
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => {
          const CategoryIcon = getCategoryIcon(achievement.category);
          const progress = (achievement.progress / achievement.maxProgress) * 100;
          
          return (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border transition-colors ${
                achievement.unlocked
                  ? "bg-purple-900/10 border-purple-800/30 hover:border-purple-700/50"
                  : "bg-gray-900/10 border-gray-800/30 hover:border-gray-700/50"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <CategoryIcon
                    className={`w-5 h-5 mr-2 ${
                      achievement.unlocked
                        ? getCategoryColor(achievement.category)
                        : "text-gray-600"
                    }`}
                  />
                  <h3
                    className={`font-semibold ${
                      achievement.unlocked ? "" : "text-gray-600"
                    }`}
                  >
                    {achievement.name}
                  </h3>
                </div>
                {achievement.unlocked ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  <Lock className="w-5 h-5 text-gray-600" />
                )}
              </div>

              <p
                className={`text-sm mb-3 ${
                  achievement.unlocked ? "text-muted-foreground" : "text-gray-600"
                }`}
              >
                {achievement.description}
              </p>

              {!achievement.unlocked && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>
                      {achievement.progress}/{achievement.maxProgress}
                    </span>
                  </div>
                  <Progress value={progress} className="h-1.5" />
                </div>
              )}

              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Reward:</span>
                <div className="flex gap-2">
                  <span className="text-amber-600">
                    {achievement.reward.gold} Gold
                  </span>
                  <span className="text-purple-600">
                    {achievement.reward.points} Points
                  </span>
                </div>
              </div>

              {achievement.unlocked && achievement.dateUnlocked && (
                <div className="mt-2 text-xs text-muted-foreground">
                  Unlocked: {achievement.dateUnlocked}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Achievements; 