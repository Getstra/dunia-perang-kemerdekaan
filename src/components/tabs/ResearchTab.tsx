
import React, { useState } from "react";
import { BookOpen, Sword, Coins, Sparkles, Beaker, FlaskConical, Brain } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

const ResearchTab: React.FC = () => {
  const { theme } = useTheme();
  const [showTechDialog, setShowTechDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("military");

  // Research data
  const researchStats = {
    points: 0,
    generation: 0,
    completedTechs: 0,
    militaryLevel: 0,
    economyLevel: 0,
    magicLevel: 0
  };
  
  // Tech categories
  const categories = [
    { id: "military", name: "Military", icon: Sword },
    { id: "economy", name: "Economy", icon: Coins },
    { id: "magic", name: "Magic", icon: Sparkles },
  ];

  // Technology details
  const technologies = {
    military: [
      { 
        id: 1, 
        name: "Improved Weapons", 
        description: "Enhance attack power of all military units by 10%",
        cost: 100,
        time: "2 days", 
        progress: 0,
        prerequisites: []
      },
      { 
        id: 2, 
        name: "Advanced Armor", 
        description: "Increase defense of all military units by 15%",
        cost: 200,
        time: "3 days", 
        progress: 0,
        prerequisites: ["Improved Weapons"]
      },
      { 
        id: 3, 
        name: "Military Tactics", 
        description: "Gain 20% advantage in battle strategies",
        cost: 300,
        time: "4 days", 
        progress: 0,
        prerequisites: ["Advanced Armor"]
      },
    ],
    economy: [
      { 
        id: 1, 
        name: "Efficient Mining", 
        description: "Increase stone production by 15%",
        cost: 100,
        time: "2 days", 
        progress: 0,
        prerequisites: []
      },
      { 
        id: 2, 
        name: "Advanced Logging", 
        description: "Increase wood production by 15%",
        cost: 200,
        time: "3 days", 
        progress: 0,
        prerequisites: ["Efficient Mining"]
      },
      { 
        id: 3, 
        name: "Currency System", 
        description: "Increase gold production by 20%",
        cost: 300,
        time: "4 days", 
        progress: 0,
        prerequisites: ["Advanced Logging"]
      },
    ],
    magic: [
      { 
        id: 1, 
        name: "Basic Enchantments", 
        description: "Enable basic magical enhancements to buildings",
        cost: 150,
        time: "3 days", 
        progress: 0,
        prerequisites: []
      },
      { 
        id: 2, 
        name: "Elemental Magic", 
        description: "Harness elemental powers for resource generation",
        cost: 250,
        time: "4 days", 
        progress: 0,
        prerequisites: ["Basic Enchantments"]
      },
      { 
        id: 3, 
        name: "Mystical Insight", 
        description: "Gain the ability to foresee kingdom threats",
        cost: 350,
        time: "5 days", 
        progress: 0,
        prerequisites: ["Elemental Magic"]
      },
    ]
  };

  return (
    <div className="md:col-span-3">
      <div className={`neu-card ${theme}`}>
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-amber-600" /> Research
        </h2>
        
        <div className="mb-6 bg-amber-900/5 border border-amber-800/20 rounded-md p-4">
          <h3 className="font-semibold text-lg mb-2 flex items-center">
            <Brain className="w-4 h-4 mr-2 text-amber-600" /> Research Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-amber-900/10 rounded-md border border-amber-800/30">
              <p className="text-sm font-semibold">Research Points</p>
              <p className="text-2xl font-bold text-amber-600">{researchStats.points}</p>
              <p className="text-xs text-muted-foreground">Generation: +{researchStats.generation}/day</p>
            </div>
            <div className="p-3 bg-amber-900/10 rounded-md border border-amber-800/30">
              <p className="text-sm font-semibold">Completed Research</p>
              <p className="text-2xl font-bold text-amber-600">{researchStats.completedTechs}</p>
              <p className="text-xs text-muted-foreground">No technologies researched</p>
            </div>
            <div className="p-3 bg-amber-900/10 rounded-md border border-amber-800/30">
              <p className="text-sm font-semibold">Research Levels</p>
              <div className="flex items-center gap-2 mt-1">
                <Sword className="h-4 w-4 text-amber-600" />
                <span className="text-sm">Lvl {researchStats.militaryLevel}</span>
                <Coins className="h-4 w-4 ml-2 text-amber-600" />
                <span className="text-sm">Lvl {researchStats.economyLevel}</span>
                <Sparkles className="h-4 w-4 ml-2 text-amber-600" />
                <span className="text-sm">Lvl {researchStats.magicLevel}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Sword className="w-4 h-4 mr-2 text-amber-600" /> Military Tech
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Improve your military capabilities
            </p>
            
            <div className="space-y-3">
              <div className="p-3 border border-amber-800/20 rounded-md">
                <p className="font-medium">Current Research</p>
                <p className="text-sm text-muted-foreground mt-1">No active research</p>
              </div>
              
              <Button 
                variant="outline"
                onClick={() => {
                  setSelectedCategory("military");
                  setShowTechDialog(true);
                }}
                className="w-full border-amber-800/30 hover:bg-amber-900/20"
              >
                Research Military Tech
              </Button>
            </div>
          </div>
          
          <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Coins className="w-4 h-4 mr-2 text-amber-600" /> Economy Tech
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Enhance your resource production
            </p>
            
            <div className="space-y-3">
              <div className="p-3 border border-amber-800/20 rounded-md">
                <p className="font-medium">Current Research</p>
                <p className="text-sm text-muted-foreground mt-1">No active research</p>
              </div>
              
              <Button 
                variant="outline"
                onClick={() => {
                  setSelectedCategory("economy");
                  setShowTechDialog(true);
                }}
                className="w-full border-amber-800/30 hover:bg-amber-900/20"
              >
                Research Economy Tech
              </Button>
            </div>
          </div>
          
          <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-amber-600" /> Magic Arts
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Discover magical abilities for your kingdom
            </p>
            
            <div className="space-y-3">
              <div className="p-3 border border-amber-800/20 rounded-md">
                <p className="font-medium">Current Research</p>
                <p className="text-sm text-muted-foreground mt-1">No active research</p>
              </div>
              
              <Button 
                variant="outline"
                onClick={() => {
                  setSelectedCategory("magic");
                  setShowTechDialog(true);
                }}
                className="w-full border-amber-800/30 hover:bg-amber-900/20"
              >
                Research Magic Arts
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Research Dialog */}
      <Dialog open={showTechDialog} onOpenChange={setShowTechDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Research Technologies</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="space-y-4">
              <div className="flex space-x-2 border-b pb-2">
                {categories.map((category) => {
                  const CategoryIcon = category.icon;
                  return (
                    <Button 
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="flex items-center"
                    >
                      <CategoryIcon className="h-4 w-4 mr-1" /> {category.name}
                    </Button>
                  );
                })}
              </div>
              
              <h4 className="font-semibold text-sm flex items-center">
                <Beaker className="h-4 w-4 mr-1" /> Available Technologies
              </h4>
              
              <div className="space-y-2">
                {technologies[selectedCategory as keyof typeof technologies].map((tech) => (
                  <div key={tech.id} className="p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
                    <p className="font-medium">{tech.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {tech.description}
                    </p>
                    
                    {tech.progress > 0 && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{tech.progress}%</span>
                        </div>
                        <Progress value={tech.progress} className="h-1.5 mt-1" />
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        <p className="text-xs text-muted-foreground">Cost: {tech.cost} RP</p>
                        <p className="text-xs text-muted-foreground">Time: {tech.time}</p>
                      </div>
                      <Button size="sm" variant="outline" disabled>
                        Research
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
                <p className="text-sm font-medium">Requirements</p>
                <p className="text-xs text-muted-foreground mt-1">
                  You need to build a Library (Level 1) to conduct research.
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setShowTechDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResearchTab;
