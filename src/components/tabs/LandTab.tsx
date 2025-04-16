
import React, { useState } from "react";
import { Map as MapIcon, Trees, Mountain, Compass, Plus } from "lucide-react";
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

const LandTab: React.FC = () => {
  const { theme } = useTheme();
  const [showExpansionDialog, setShowExpansionDialog] = useState(false);

  // Land territories data
  const territories = [
    { id: 1, name: "Castle Grounds", type: "Settlement", size: 100, explored: 100 },
    { id: 2, name: "Eastern Woods", type: "Forest", size: 200, explored: 45 },
    { id: 3, name: "Northern Hills", type: "Mountains", size: 150, explored: 20 },
  ];

  // Available regions for expansion
  const expansionOptions = [
    { id: 1, name: "Western Plains", type: "Plains", size: 180, cost: 500, difficulty: "Easy" },
    { id: 2, name: "Southern Marshes", type: "Wetland", size: 150, cost: 650, difficulty: "Medium" },
    { id: 3, name: "Crystal Caverns", type: "Underground", size: 120, cost: 800, difficulty: "Hard" },
  ];

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
              <p className="text-2xl font-bold text-amber-600">450 acres</p>
              <p className="text-xs text-muted-foreground">3 territories</p>
            </div>
            <div className="p-3 bg-amber-900/10 rounded-md border border-amber-800/30">
              <p className="text-sm font-semibold">Explored</p>
              <p className="text-2xl font-bold text-amber-600">165 acres</p>
              <p className="text-xs text-muted-foreground">36% of total land</p>
            </div>
            <div className="p-3 bg-amber-900/10 rounded-md border border-amber-800/30">
              <p className="text-sm font-semibold">Resources Found</p>
              <p className="text-2xl font-bold text-amber-600">8</p>
              <p className="text-xs text-muted-foreground">2 special resources</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Trees className="w-4 h-4 mr-2 text-amber-600" /> Territory
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Manage your current territory
            </p>
            
            <div className="space-y-3">
              {territories.map((territory) => (
                <div key={territory.id} className="p-3 border border-amber-800/20 rounded-md">
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
            
            <div className="space-y-2">
              <p className="text-sm">Expand your kingdom by claiming new territories.</p>
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
                  <div key={option.id} className="flex justify-between items-center p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
                    <div>
                      <p className="font-medium">{option.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {option.type} • {option.size} acres • Difficulty: {option.difficulty}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{option.cost} Gold</p>
                      <Button size="sm" variant="outline" className="mt-1" disabled>
                        Claim
                      </Button>
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
    </div>
  );
};

export default LandTab;
