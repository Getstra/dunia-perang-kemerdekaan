
import React, { useState } from "react";
import { Map as MapIcon, Trees, Mountain, Compass, Plus, Eye, Pickaxe, Shovel, Axe, Clock, Bird, ChevronDown, ChevronUp } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const LandTab: React.FC = () => {
  const { theme } = useTheme();
  const [showExpansionDialog, setShowExpansionDialog] = useState(false);
  const [showExplorationDialog, setShowExplorationDialog] = useState(false);
  const [selectedTerritory, setSelectedTerritory] = useState<number | null>(null);

  // Land territories data
  const territories = [
    { id: 1, name: "Castle Grounds", type: "Settlement", size: 100, explored: 100, resources: ["Gold", "Food"], special: [] },
    { id: 2, name: "Eastern Woods", type: "Forest", size: 200, explored: 45, resources: ["Wood"], special: ["Ancient Tree"] },
    { id: 3, name: "Northern Hills", type: "Mountains", size: 150, explored: 20, resources: ["Stone"], special: [] },
  ];

  // Available regions for expansion
  const expansionOptions = [
    { id: 1, name: "Western Plains", type: "Plains", size: 180, cost: 500, difficulty: "Easy", resourcePotential: "Medium" },
    { id: 2, name: "Southern Marshes", type: "Wetland", size: 150, cost: 650, difficulty: "Medium", resourcePotential: "High" },
    { id: 3, name: "Crystal Caverns", type: "Underground", size: 120, cost: 800, difficulty: "Hard", resourcePotential: "Very High" },
  ];

  // Resources that can be found
  const possibleResources = [
    { name: "Wood", rarity: "Common", value: "+5/day" },
    { name: "Stone", rarity: "Common", value: "+3/day" },
    { name: "Gold", rarity: "Uncommon", value: "+2/day" },
    { name: "Iron", rarity: "Uncommon", value: "+2/day" },
    { name: "Gems", rarity: "Rare", value: "+10 gold/day" },
    { name: "Crystal", rarity: "Very Rare", value: "Special abilities" },
  ];

  // Exploration data
  const explorationStats = {
    explorers: 0,
    explorationSpeed: 0,
    activeExpeditions: []
  };

  // Calculate total land and exploration stats
  const totalLand = territories.reduce((acc, territory) => acc + territory.size, 0);
  const totalExplored = territories.reduce((acc, territory) => acc + (territory.size * territory.explored / 100), 0);
  const explorationPercentage = Math.round((totalExplored / totalLand) * 100);

  const handleTerritorySelect = (id: number) => {
    setSelectedTerritory(id === selectedTerritory ? null : id);
  };

  return (
    <div className="md:col-span-3">
      <div className={`neu-card ${theme}`}>
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <MapIcon className="w-6 h-6 mr-2 text-amber-600" /> Land
        </h2>
        
        <div className="mb-6 bg-amber-900/5 border border-amber-800/20 rounded-md p-4">
          <h3 className="font-semibold text-lg mb-2 flex items-center">
            <Compass className="w-4 h-4 mr-2 text-amber-600" /> Territory Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-amber-900/10 rounded-md border border-amber-800/30">
              <p className="text-sm font-semibold">Total Land</p>
              <p className="text-2xl font-bold text-amber-600">{totalLand} acres</p>
              <p className="text-xs text-muted-foreground">{territories.length} territories</p>
            </div>
            <div className="p-3 bg-amber-900/10 rounded-md border border-amber-800/30">
              <p className="text-sm font-semibold">Explored</p>
              <p className="text-2xl font-bold text-amber-600">{Math.round(totalExplored)} acres</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <span className="mr-2">{explorationPercentage}% of total land</span>
                {explorationStats.explorers > 0 && (
                  <span className="text-green-600">+{explorationStats.explorationSpeed}%/day</span>
                )}
              </div>
            </div>
            <div className="p-3 bg-amber-900/10 rounded-md border border-amber-800/30">
              <p className="text-sm font-semibold">Resources Found</p>
              <p className="text-2xl font-bold text-amber-600">8</p>
              <p className="text-xs text-muted-foreground">2 special resources</p>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="territories" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="territories" className="flex items-center gap-1">
              <Trees className="h-4 w-4" /> Territories
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-1">
              <Pickaxe className="h-4 w-4" /> Resources
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="territories" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <Trees className="w-4 h-4 mr-2 text-amber-600" /> Your Territories
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage and explore your current territories
                </p>
                
                <div className="space-y-3">
                  {territories.map((territory) => (
                    <div 
                      key={territory.id} 
                      className={`p-3 border border-amber-800/20 rounded-md cursor-pointer transition-colors ${
                        selectedTerritory === territory.id ? 'bg-amber-900/20' : 'hover:bg-amber-900/10'
                      }`}
                      onClick={() => handleTerritorySelect(territory.id)}
                    >
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{territory.name}</p>
                          <p className="text-xs text-muted-foreground">{territory.type} • {territory.size} acres</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-medium">Explored</p>
                          <p className="text-sm">{territory.explored}%</p>
                        </div>
                      </div>
                      <Progress value={territory.explored} className="h-1.5 mt-2" />
                      
                      {selectedTerritory === territory.id && (
                        <div className="mt-3 pt-2 border-t border-amber-800/20">
                          <div className="grid grid-cols-2 gap-2 mb-2">
                            <div>
                              <p className="text-xs font-medium">Resources:</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {territory.resources.map((resource, i) => (
                                  <span key={i} className="text-xs bg-amber-900/20 px-1.5 py-0.5 rounded">{resource}</span>
                                ))}
                                {territory.resources.length === 0 && (
                                  <span className="text-xs text-muted-foreground">None discovered</span>
                                )}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-medium">Special Finds:</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {territory.special.map((special, i) => (
                                  <span key={i} className="text-xs bg-purple-600/20 text-purple-700 px-1.5 py-0.5 rounded">{special}</span>
                                ))}
                                {territory.special.length === 0 && (
                                  <span className="text-xs text-muted-foreground">None discovered</span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="w-full mt-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowExplorationDialog(true);
                            }}
                            disabled={territory.explored === 100}
                          >
                            <Eye className="h-3 w-3 mr-1" /> 
                            {territory.explored === 100 ? 'Fully Explored' : 'Explore Territory'}
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <Mountain className="w-4 h-4 mr-2 text-amber-600" /> Expansion
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Explore and conquer new lands
                </p>
                
                <div className="space-y-3">
                  <div className="p-3 border border-amber-800/20 rounded-md">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium">Watchtower Status</p>
                      <div className="flex items-center text-amber-600">
                        <Clock className="h-3 w-3 mr-1" />
                        <span className="text-xs">Not Built</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Build a Watchtower to expand your territory.</p>
                  </div>
                  
                  <div className="p-3 border border-amber-800/20 rounded-md">
                    <p className="text-sm">Expand your kingdom by claiming new territories.</p>
                    <div className="flex text-xs text-muted-foreground mt-1">
                      <span>Available Gold: 1000</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline"
                    onClick={() => setShowExpansionDialog(true)}
                    className="w-full flex items-center justify-center gap-1 border-amber-800/30 hover:bg-amber-900/20"
                  >
                    <Plus className="h-4 w-4" /> Expand Territory
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="resources" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <Pickaxe className="w-4 h-4 mr-2 text-amber-600" /> Found Resources
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Resources discovered in your territories
                </p>
                
                <div className="space-y-2">
                  {territories.map((territory) => (
                    territory.resources.length > 0 && (
                      <div key={territory.id} className="p-3 border border-amber-800/20 rounded-md">
                        <p className="font-medium">{territory.name}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {territory.resources.map((resource, i) => (
                            <span key={i} className="text-xs bg-amber-900/20 px-1.5 py-0.5 rounded">{resource}</span>
                          ))}
                        </div>
                        {territory.special.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs font-medium">Special Discoveries:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {territory.special.map((special, i) => (
                                <span key={i} className="text-xs bg-purple-600/20 text-purple-700 px-1.5 py-0.5 rounded">{special}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  ))}
                </div>
                
                {territories.every(t => t.resources.length === 0) && (
                  <div className="p-3 border border-amber-800/20 rounded-md">
                    <p className="text-sm">No resources discovered yet.</p>
                    <p className="text-xs text-muted-foreground mt-1">Explore territories to find resources.</p>
                  </div>
                )}
              </div>
              
              <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <Shovel className="w-4 h-4 mr-2 text-amber-600" /> Resource Guide
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Resources that can be found in your lands
                </p>
                
                <div className="space-y-2">
                  {possibleResources.map((resource, index) => (
                    <div key={index} className="p-3 border border-amber-800/20 rounded-md">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{resource.name}</p>
                          <p className="text-xs text-muted-foreground">Value: {resource.value}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-xs px-1.5 py-0.5 rounded ${
                            resource.rarity === "Common" ? "bg-green-600/20 text-green-700" :
                            resource.rarity === "Uncommon" ? "bg-blue-600/20 text-blue-700" :
                            resource.rarity === "Rare" ? "bg-purple-600/20 text-purple-700" :
                            "bg-amber-600/20 text-amber-700"
                          }`}>{resource.rarity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Expansion Dialog */}
      <Dialog open={showExpansionDialog} onOpenChange={setShowExpansionDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Expand Your Territory</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Available Territories</h4>
              
              <div className="space-y-2">
                {expansionOptions.map((option) => (
                  <div key={option.id} className="p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{option.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {option.type} • {option.size} acres
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center">
                            <Bird className="h-3 w-3 mr-1 text-amber-600" />
                            <span className="text-xs">Difficulty: {option.difficulty}</span>
                          </div>
                          <div className="flex items-center">
                            <Pickaxe className="h-3 w-3 mr-1 text-amber-600" />
                            <span className="text-xs">Resources: {option.resourcePotential}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{option.cost} Gold</p>
                        <Button size="sm" variant="outline" className="mt-1" disabled>
                          Claim
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
                <p className="text-sm font-medium">Requirements</p>
                <p className="text-xs text-muted-foreground mt-1">
                  You need to build a Watchtower (Level 1) before you can expand your territory.
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setShowExpansionDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Exploration Dialog */}
      <Dialog open={showExplorationDialog} onOpenChange={setShowExplorationDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Explore Territory</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="space-y-4">
              <div className="p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
                <p className="text-sm font-medium">Selected Territory</p>
                <p className="text-lg font-bold">
                  {selectedTerritory ? territories.find(t => t.id === selectedTerritory)?.name : ''}
                </p>
                {selectedTerritory && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs">
                      <span>Exploration Progress</span>
                      <span>{territories.find(t => t.id === selectedTerritory)?.explored}%</span>
                    </div>
                    <Progress 
                      value={territories.find(t => t.id === selectedTerritory)?.explored} 
                      className="h-1.5 mt-1" 
                    />
                  </div>
                )}
              </div>
              
              <div className="p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
                <p className="text-sm font-medium">Exploration Details</p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-xs font-medium">Explorer Units</p>
                    <div className="flex items-center mt-1">
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="h-5 w-5 rounded-full p-0" 
                        disabled
                      >
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                      <span className="mx-2 font-medium">0</span>
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="h-5 w-5 rounded-full p-0" 
                        disabled
                      >
                        <ChevronUp className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium">Exploration Speed</p>
                    <p className="text-sm mt-1">0% per day</p>
                  </div>
                </div>
                <div className="flex justify-between text-xs mt-3">
                  <span>Cost per explorer:</span>
                  <span>50 Gold/day</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
                <p className="text-sm font-medium">Requirements</p>
                <p className="text-xs text-muted-foreground mt-1">
                  You need to build a Scout Camp (Level 1) before you can assign explorers.
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" disabled>
                  Start Exploration
                </Button>
                <Button onClick={() => setShowExplorationDialog(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LandTab;
