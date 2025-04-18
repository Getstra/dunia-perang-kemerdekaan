import React from "react";
import { FlaskConical, Brain, Rocket, Shield, Leaf } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Technology {
  id: string;
  name: string;
  category: "military" | "economic" | "scientific" | "defense" | "agriculture";
  description: string;
  level: number;
  maxLevel: number;
  progress: number;
  cost: {
    gold: number;
    science: number;
  };
  benefits: {
    production?: number;
    attack?: number;
    defense?: number;
    research?: number;
    food?: number;
  };
}

interface ResearchProps {
  technologies: Technology[];
  resources: {
    gold: number;
    science: number;
  };
  onResearch: (techId: string) => void;
}

const Research: React.FC<ResearchProps> = ({ technologies, resources, onResearch }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "military":
        return Rocket;
      case "economic":
        return Brain;
      case "scientific":
        return FlaskConical;
      case "defense":
        return Shield;
      case "agriculture":
        return Leaf;
      default:
        return FlaskConical;
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
      case "defense":
        return "text-green-600";
      case "agriculture":
        return "text-emerald-600";
      default:
        return "text-gray-600";
    }
  };

  const canResearch = (tech: Technology) => {
    return (
      resources.gold >= tech.cost.gold &&
      resources.science >= tech.cost.science &&
      tech.level < tech.maxLevel
    );
  };

  return (
    <div className="mb-6 px-4 py-3 rounded-xl bg-purple-50/30 dark:bg-purple-950/20 backdrop-blur-sm shadow-lg border border-purple-200/30 dark:border-purple-800/30">
      <h2 className="text-3xl font-bold mb-4 flex items-center pb-3 border-b border-purple-800/20">
        <FlaskConical className="w-8 h-8 mr-3 text-purple-600 drop-shadow-md" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 drop-shadow-sm">
          Research
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {technologies.map((tech) => {
          const CategoryIcon = getCategoryIcon(tech.category);
          const canResearchTech = canResearch(tech);
          
          return (
            <div
              key={tech.id}
              className="p-4 bg-purple-900/10 rounded-lg border border-purple-800/30 hover:border-purple-700/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <CategoryIcon className={`w-5 h-5 mr-2 ${getCategoryColor(tech.category)}`} />
                  <h3 className="font-semibold">{tech.name}</h3>
                </div>
                <span className="text-sm text-purple-600 font-medium">
                  Level {tech.level}/{tech.maxLevel}
                </span>
              </div>

              <p className="text-sm text-muted-foreground mb-3">{tech.description}</p>

              {tech.progress > 0 && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Research Progress</span>
                    <span>{tech.progress}%</span>
                  </div>
                  <Progress value={tech.progress} className="h-1.5" />
                </div>
              )}

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Cost:</span>
                  <div className="flex gap-2">
                    <span className={resources.gold >= tech.cost.gold ? "text-amber-600" : "text-red-600"}>
                      {tech.cost.gold} Gold
                    </span>
                    <span className={resources.science >= tech.cost.science ? "text-blue-600" : "text-red-600"}>
                      {tech.cost.science} Science
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {tech.benefits.production && (
                    <span className="bg-amber-900/20 px-2 py-1 rounded">+{tech.benefits.production}% Production</span>
                  )}
                  {tech.benefits.attack && (
                    <span className="bg-red-900/20 px-2 py-1 rounded">+{tech.benefits.attack}% Attack</span>
                  )}
                  {tech.benefits.defense && (
                    <span className="bg-green-900/20 px-2 py-1 rounded">+{tech.benefits.defense}% Defense</span>
                  )}
                  {tech.benefits.research && (
                    <span className="bg-blue-900/20 px-2 py-1 rounded">+{tech.benefits.research}% Research</span>
                  )}
                  {tech.benefits.food && (
                    <span className="bg-emerald-900/20 px-2 py-1 rounded">+{tech.benefits.food}% Food</span>
                  )}
                </div>

                <button
                  onClick={() => onResearch(tech.id)}
                  disabled={!canResearchTech}
                  className={`w-full mt-2 py-1.5 px-3 rounded-md text-sm font-medium transition-colors ${
                    canResearchTech
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : "bg-purple-900/20 text-purple-600/50 cursor-not-allowed"
                  }`}
                >
                  Research
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Research; 