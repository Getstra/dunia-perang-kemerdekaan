
import React, { useState } from "react";
import { Swords, Shield, Target, Castle, Flag } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const MilitaryTab: React.FC = () => {
  const { theme } = useTheme();
  const [showArmyDialog, setShowArmyDialog] = useState(false);
  const [showBattleDialog, setShowBattleDialog] = useState(false);

  // Military units data
  const militaryUnits = [
    { name: "Infantry", strength: 5, defense: 3, cost: 50, maintenance: 2 },
    { name: "Cavalry", strength: 8, defense: 2, cost: 80, maintenance: 4 },
    { name: "Archers", strength: 7, defense: 1, cost: 60, maintenance: 3 },
    { name: "Siege", strength: 10, defense: 0, cost: 100, maintenance: 6 },
  ];

  return (
    <div className="md:col-span-3">
      <div className={`neu-card ${theme}`}>
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Swords className="w-6 h-6 mr-2 text-amber-600" /> Military
        </h2>
        
        <div className="mb-6 bg-amber-900/5 border border-amber-800/20 rounded-md p-4">
          <h3 className="font-semibold text-lg mb-2 flex items-center">
            <Shield className="w-4 h-4 mr-2 text-amber-600" /> Military Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-amber-900/10 rounded-md border border-amber-800/30">
              <p className="text-sm font-semibold">Army Strength</p>
              <p className="text-2xl font-bold text-amber-600">0</p>
              <p className="text-xs text-muted-foreground">No troops recruited</p>
            </div>
            <div className="p-3 bg-amber-900/10 rounded-md border border-amber-800/30">
              <p className="text-sm font-semibold">Defense Rating</p>
              <p className="text-2xl font-bold text-amber-600">0</p>
              <p className="text-xs text-muted-foreground">No defensive structures</p>
            </div>
            <div className="p-3 bg-amber-900/10 rounded-md border border-amber-800/30">
              <p className="text-sm font-semibold">Victories</p>
              <p className="text-2xl font-bold text-amber-600">0</p>
              <p className="text-xs text-muted-foreground">No battles fought</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Castle className="w-4 h-4 mr-2 text-amber-600" /> Army Units
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Train and manage your military forces
            </p>
            
            <div className="space-y-3">
              <p className="text-sm">Your kingdom has no military units.</p>
              <Button 
                variant="outline" 
                className="w-full border-amber-800/30 hover:bg-amber-900/20 mt-2"
                onClick={() => setShowArmyDialog(true)}
              >
                Manage Army
              </Button>
            </div>
          </div>
          
          <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Target className="w-4 h-4 mr-2 text-amber-600" /> Battle Plans
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Plan attacks and defenses for your kingdom
            </p>
            
            <div className="space-y-3">
              <p className="text-sm">Create battle plans to conquer other kingdoms.</p>
              <Button 
                variant="outline" 
                className="w-full border-amber-800/30 hover:bg-amber-900/20 mt-2"
                onClick={() => setShowBattleDialog(true)}
              >
                Plan Battle
              </Button>
            </div>
          </div>
          
          <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md md:col-span-2">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Flag className="w-4 h-4 mr-2 text-amber-600" /> Alliances
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Form alliances with other kingdoms for mutual protection
            </p>
            
            <div className="p-4 border border-dashed border-muted-foreground rounded-md text-center bg-black/10">
              <p>Alliance system coming soon!</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Army Management Dialog */}
      <Dialog open={showArmyDialog} onOpenChange={setShowArmyDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Manage Your Army</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Available Units</h4>
              
              <div className="space-y-2">
                {militaryUnits.map((unit, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
                    <div>
                      <p className="font-medium">{unit.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Strength: {unit.strength} | Defense: {unit.defense}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{unit.cost} Gold</p>
                      <Button size="sm" variant="outline" className="mt-1" disabled>
                        Train
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
                <p className="text-sm font-medium">Requirements</p>
                <p className="text-xs text-muted-foreground mt-1">
                  You need to build a Barracks (Level 1) before you can train military units.
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setShowArmyDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Battle Planning Dialog */}
      <Dialog open={showBattleDialog} onOpenChange={setShowBattleDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Plan Your Battle</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Battle Planning</h4>
              
              <div className="mt-4 p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
                <p className="text-sm font-medium">No Kingdoms to Battle</p>
                <p className="text-xs text-muted-foreground mt-1">
                  There are no other kingdoms available to attack at this time. Check back later as more players join the game.
                </p>
              </div>
              
              <div className="mt-4 p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
                <p className="text-sm font-medium">Requirements</p>
                <p className="text-xs text-muted-foreground mt-1">
                  You need to have at least 10 military units and a Watchtower (Level 1) before you can plan battles.
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setShowBattleDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MilitaryTab;
