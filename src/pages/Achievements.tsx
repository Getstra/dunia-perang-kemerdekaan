
import React from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { Award, Star, ArrowLeft, Lock, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Achievement {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  progress: number;
  maxProgress: number;
  reward: string;
}

const Achievements = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  const achievements: Achievement[] = [
    {
      id: "build-first",
      title: "Master Builder",
      description: "Construct your first building",
      completed: true,
      progress: 1,
      maxProgress: 1,
      reward: "100 Gold"
    },
    {
      id: "build-all",
      title: "Kingdom Constructor",
      description: "Build one of each type of building",
      completed: false,
      progress: 6,
      maxProgress: 10,
      reward: "500 Gold, 50 Stone"
    },
    {
      id: "population-100",
      title: "Growing Community",
      description: "Reach a population of 100",
      completed: false,
      progress: 50,
      maxProgress: 100,
      reward: "2 Farmers, 1 Miner"
    },
    {
      id: "gold-1000",
      title: "Wealthy Monarch",
      description: "Accumulate 1,000 gold",
      completed: true,
      progress: 1000,
      maxProgress: 1000,
      reward: "Special Building: Treasury"
    },
    {
      id: "stone-500",
      title: "Stone Collector",
      description: "Gather 500 stone",
      completed: false,
      progress: 220,
      maxProgress: 500,
      reward: "1 Stone Mine, Level 2"
    },
    {
      id: "kingdom-age-10",
      title: "Enduring Dynasty",
      description: "Let your kingdom flourish for 10 days",
      completed: false,
      progress: 3,
      maxProgress: 10,
      reward: "Special Building: Monument"
    },
  ];

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-neu-bg-light' : 'bg-neu-bg-dark'}`}>
      <div className="container mx-auto px-4 py-6">
        <Button 
          variant="outline" 
          className="mb-4 flex items-center gap-2" 
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={16} />
          Return to Kingdom
        </Button>
        
        <div className={`neu-card ${theme}`}>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Award className="w-8 h-8 text-amber-600 mr-3" />
              <h1 className="text-3xl font-bold">Kingdom Achievements</h1>
            </div>
            <Star className="w-6 h-6 text-muted-foreground" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold mb-2">Completed</h2>
                <span className="text-lg font-semibold text-amber-600">
                  {achievements.filter(a => a.completed).length}/{achievements.length}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                You've completed {Math.round((achievements.filter(a => a.completed).length / achievements.length) * 100)}% of all achievements
              </p>
              <Progress 
                value={(achievements.filter(a => a.completed).length / achievements.length) * 100} 
                className="mt-2"
              />
            </div>
            
            <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
              <h2 className="text-xl font-semibold mb-2">Rewards Earned</h2>
              <div className="flex gap-2 flex-wrap">
                {achievements
                  .filter(a => a.completed)
                  .map(a => (
                    <span key={a.id} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-400">
                      {a.reward}
                    </span>
                  ))}
                {achievements.filter(a => a.completed).length === 0 && (
                  <p className="text-sm text-muted-foreground">Complete achievements to earn rewards</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`p-4 border rounded-md ${
                  achievement.completed 
                    ? 'border-amber-600/40 bg-amber-600/10' 
                    : 'border-amber-800/30 bg-amber-900/5'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      {achievement.completed ? (
                        <div className="w-6 h-6 rounded-full bg-amber-600/20 flex items-center justify-center">
                          <Check className="w-4 h-4 text-amber-600" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-amber-900/20 flex items-center justify-center">
                          <Lock className="w-4 h-4 text-amber-800/70" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                      <Progress 
                        value={(achievement.progress / achievement.maxProgress) * 100} 
                        className="h-2 mb-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progress: {achievement.progress}/{achievement.maxProgress}</span>
                        <span>Reward: {achievement.reward}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
