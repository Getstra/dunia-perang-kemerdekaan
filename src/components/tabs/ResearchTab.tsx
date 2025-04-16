
import React, { useState } from "react";
import { BookOpen, Sword, Coins, Sparkles, Beaker, FlaskConical, Brain, LightbulbIcon, Clock } from "lucide-react";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const ResearchTab: React.FC = () => {
  const { theme } = useTheme();
  const [showTechDialog, setShowTechDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("military");
  const [activeResearch, setActiveResearch] = useState<null | { id: number, name: string, category: string, progress: number }>(null);

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
        prerequisites: [],
        completed: false
      },
      { 
        id: 2, 
        name: "Advanced Armor", 
        description: "Increase defense of all military units by 15%",
        cost: 200,
        time: "3 days", 
        progress: 0,
        prerequisites: ["Improved Weapons"],
        completed: false
      },
      { 
        id: 3, 
        name: "Military Tactics", 
        description: "Gain 20% advantage in battle strategies",
        cost: 300,
        time: "4 days", 
        progress: 0,
        prerequisites: ["Advanced Armor"],
        completed: false
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
        prerequisites: [],
        completed: false
      },
      { 
        id: 2, 
        name: "Advanced Logging", 
        description: "Increase wood production by 15%",
        cost: 200,
        time: "3 days", 
        progress: 0,
        prerequisites: ["Efficient Mining"],
        completed: false
      },
      { 
        id: 3, 
        name: "Currency System", 
        description: "Increase gold production by 20%",
        cost: 300,
        time: "4 days", 
        progress: 0,
        prerequisites: ["Advanced Logging"],
        completed: false
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
        prerequisites: [],
        completed: false
      },
      { 
        id: 2, 
        name: "Elemental Magic", 
        description: "Harness elemental powers for resource generation",
        cost: 250,
        time: "4 days", 
        progress: 0,
        prerequisites: ["Basic Enchantments"],
        completed: false
      },
      { 
        id: 3, 
        name: "Mystical Insight", 
        description: "Gain the ability to foresee kingdom threats",
        cost: 350,
        time: "5 days", 
        progress: 0,
        prerequisites: ["Elemental Magic"],
        completed: false
      },
    ]
  };

  const isResearchAvailable = (tech: any): boolean => {
    if (tech.prerequisites.length === 0) return true;
    
    return tech.prerequisites.every((prereq: string) => {
      const category = Object.keys(technologies).find(cat => 
        technologies[cat as keyof typeof technologies].some(t => t.name === prereq && t.completed)
      );
      return category !== undefined;
    });
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
              <div className="flex items-center text-xs text-muted-foreground">
                {activeResearch ? (
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1 text-amber-600" />
                    <span>Researching: {activeResearch.name}</span>
                  </div>
                ) : (
                  <span>No active research</span>
                )}
              </div>
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
        
        <div className="mt-6">
          <Tabs defaultValue="military" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="military" className="flex items-center gap-1">
                <Sword className="h-4 w-4" /> Military
              </TabsTrigger>
              <TabsTrigger value="economy" className="flex items-center gap-1">
                <Coins className="h-4 w-4" /> Economy
              </TabsTrigger>
              <TabsTrigger value="magic" className="flex items-center gap-1">
                <Sparkles className="h-4 w-4" /> Magic
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="military" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {technologies.military.map((tech) => (
                  <div 
                    key={tech.id} 
                    className={`p-4 border rounded-md ${
                      tech.completed 
                        ? 'border-green-600/30 bg-green-600/5' 
                        : tech.progress > 0
                        ? 'border-amber-600/30 bg-amber-900/10' 
                        : 'border-amber-800/20 bg-amber-900/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium flex items-center">
                        {tech.completed ? (
                          <LightbulbIcon className="h-4 w-4 mr-1 text-green-600" />
                        ) : (
                          <Beaker className="h-4 w-4 mr-1 text-amber-600" />
                        )}
                        {tech.name}
                      </h4>
                      {tech.completed && <div className="text-xs font-medium text-green-600">Completed</div>}
                    </div>
                    
                    <p className="text-xs text-muted-foreground mt-1">
                      {tech.description}
                    </p>
                    
                    {tech.progress > 0 && !tech.completed && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{tech.progress}%</span>
                        </div>
                        <Progress value={tech.progress} className="h-1.5 mt-1" />
                      </div>
                    )}
                    
                    {!tech.completed && tech.progress === 0 && (
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-xs text-muted-foreground">
                          <div>Cost: {tech.cost} RP</div>
                          <div>Time: {tech.time}</div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          disabled={!isResearchAvailable(tech) || researchStats.points < tech.cost}
                        >
                          Research
                        </Button>
                      </div>
                    )}
                    
                    {!isResearchAvailable(tech) && !tech.completed && (
                      <div className="mt-2 text-xs text-amber-600">
                        <div className="flex items-center">
                          <LightbulbIcon className="h-3 w-3 mr-1" />
                          <span>Prerequisites: {tech.prerequisites.join(', ')}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="p-3 border border-amber-800/20 rounded-md bg-amber-900/5 mt-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Library Status</p>
                  <div className="flex items-center text-amber-600">
                    <Clock className="h-3 w-3 mr-1" />
                    <span className="text-xs">Not Built</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Build a Library to conduct research.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="economy" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {technologies.economy.map((tech) => (
                  <div 
                    key={tech.id} 
                    className={`p-4 border rounded-md ${
                      tech.completed 
                        ? 'border-green-600/30 bg-green-600/5' 
                        : tech.progress > 0
                        ? 'border-amber-600/30 bg-amber-900/10' 
                        : 'border-amber-800/20 bg-amber-900/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium flex items-center">
                        {tech.completed ? (
                          <LightbulbIcon className="h-4 w-4 mr-1 text-green-600" />
                        ) : (
                          <Coins className="h-4 w-4 mr-1 text-amber-600" />
                        )}
                        {tech.name}
                      </h4>
                      {tech.completed && <div className="text-xs font-medium text-green-600">Completed</div>}
                    </div>
                    
                    <p className="text-xs text-muted-foreground mt-1">
                      {tech.description}
                    </p>
                    
                    {tech.progress > 0 && !tech.completed && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{tech.progress}%</span>
                        </div>
                        <Progress value={tech.progress} className="h-1.5 mt-1" />
                      </div>
                    )}
                    
                    {!tech.completed && tech.progress === 0 && (
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-xs text-muted-foreground">
                          <div>Cost: {tech.cost} RP</div>
                          <div>Time: {tech.time}</div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          disabled={!isResearchAvailable(tech) || researchStats.points < tech.cost}
                        >
                          Research
                        </Button>
                      </div>
                    )}
                    
                    {!isResearchAvailable(tech) && !tech.completed && (
                      <div className="mt-2 text-xs text-amber-600">
                        <div className="flex items-center">
                          <LightbulbIcon className="h-3 w-3 mr-1" />
                          <span>Prerequisites: {tech.prerequisites.join(', ')}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="p-3 border border-amber-800/20 rounded-md bg-amber-900/5 mt-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Library Status</p>
                  <div className="flex items-center text-amber-600">
                    <Clock className="h-3 w-3 mr-1" />
                    <span className="text-xs">Not Built</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Build a Library to conduct research.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="magic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {technologies.magic.map((tech) => (
                  <div 
                    key={tech.id} 
                    className={`p-4 border rounded-md ${
                      tech.completed 
                        ? 'border-green-600/30 bg-green-600/5' 
                        : tech.progress > 0
                        ? 'border-amber-600/30 bg-amber-900/10' 
                        : 'border-amber-800/20 bg-amber-900/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium flex items-center">
                        {tech.completed ? (
                          <LightbulbIcon className="h-4 w-4 mr-1 text-green-600" />
                        ) : (
                          <Sparkles className="h-4 w-4 mr-1 text-amber-600" />
                        )}
                        {tech.name}
                      </h4>
                      {tech.completed && <div className="text-xs font-medium text-green-600">Completed</div>}
                    </div>
                    
                    <p className="text-xs text-muted-foreground mt-1">
                      {tech.description}
                    </p>
                    
                    {tech.progress > 0 && !tech.completed && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{tech.progress}%</span>
                        </div>
                        <Progress value={tech.progress} className="h-1.5 mt-1" />
                      </div>
                    )}
                    
                    {!tech.completed && tech.progress === 0 && (
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-xs text-muted-foreground">
                          <div>Cost: {tech.cost} RP</div>
                          <div>Time: {tech.time}</div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          disabled={!isResearchAvailable(tech) || researchStats.points < tech.cost}
                        >
                          Research
                        </Button>
                      </div>
                    )}
                    
                    {!isResearchAvailable(tech) && !tech.completed && (
                      <div className="mt-2 text-xs text-amber-600">
                        <div className="flex items-center">
                          <LightbulbIcon className="h-3 w-3 mr-1" />
                          <span>Prerequisites: {tech.prerequisites.join(', ')}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="p-3 border border-amber-800/20 rounded-md bg-amber-900/5 mt-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Library Status</p>
                  <div className="flex items-center text-amber-600">
                    <Clock className="h-3 w-3 mr-1" />
                    <span className="text-xs">Not Built</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Build a Library to conduct research.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ResearchTab;
