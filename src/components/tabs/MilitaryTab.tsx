import React, { useState } from "react";
import { Swords, Shield, Target, Castle, Flag, UserCheck, Trophy, Skull, Compass, Clock } from "lucide-react";
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

const MilitaryTab: React.FC = () => {
  const { theme } = useTheme();
  const [showArmyDialog, setShowArmyDialog] = useState(false);
  const [showBattleDialog, setShowBattleDialog] = useState(false);
  const [showAttackDetailsDialog, setShowAttackDetailsDialog] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<number | null>(null);

  // Military units data
  const militaryUnits = [
    { name: "Infantry", strength: 5, defense: 3, cost: 50, maintenance: 2, count: 0, training: false },
    { name: "Cavalry", strength: 8, defense: 2, cost: 80, maintenance: 4, count: 0, training: false },
    { name: "Archers", strength: 7, defense: 1, cost: 60, maintenance: 3, count: 0, training: false },
    { name: "Siege", strength: 10, defense: 0, cost: 100, maintenance: 6, count: 0, training: false },
  ];

  // Other kingdoms for battle targets
  const battleTargets = [
    { id: 1, name: "Eastern Woods", strength: "Low", threat: "Peaceful", distance: "Near", reward: "Wood +50/day" },
    { id: 2, name: "Mountain Clan", strength: "Medium", threat: "Neutral", distance: "Medium", reward: "Stone +40/day" },
    { id: 3, name: "Dark Valley", strength: "High", threat: "Aggressive", distance: "Far", reward: "Gold +100/day" },
  ];

  // Battle history
  const battleHistory = [];

  const handleSelectTarget = (id: number) => {
    setSelectedTarget(id);
    setShowAttackDetailsDialog(true);
  };

  const getThreatColor = (threat: string) => {
    if (threat === "Peaceful") return "text-green-600";
    if (threat === "Neutral") return "text-amber-600";
    return "text-red-600";
  };

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
              <div className="flex text-xs text-muted-foreground gap-2 mt-1">
                <span>Attack: 0</span>
                <span>Defense: 0</span>
              </div>
            </div>
            <div className="p-3 bg-amber-900/10 rounded-md border border-amber-800/30">
              <p className="text-sm font-semibold">Maintenance Cost</p>
              <p className="text-2xl font-bold text-amber-600">0</p>
              <p className="text-xs text-muted-foreground">Gold per day</p>
            </div>
            <div className="p-3 bg-amber-900/10 rounded-md border border-amber-800/30">
              <p className="text-sm font-semibold">Battle Record</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center">
                  <Trophy className="h-4 w-4 text-amber-600" />
                  <span className="text-sm ml-1">0</span>
                </div>
                <div className="flex items-center">
                  <Skull className="h-4 w-4 text-red-600" />
                  <span className="text-sm ml-1">0</span>
                </div>
              </div>
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
              <div className="space-y-2">
                {militaryUnits.map((unit, index) => (
                  <div key={index} className="p-3 border border-amber-800/20 rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{unit.name}</p>
                        <div className="flex text-xs text-muted-foreground gap-2">
                          <span>Attack: {unit.strength}</span>
                          <span>Defense: {unit.defense}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{unit.count} units</p>
                        {unit.training && (
                          <div className="flex items-center text-xs text-amber-600">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Training...</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-3 border border-amber-800/20 rounded-md">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Barracks Status</p>
                  <div className="flex items-center text-amber-600">
                    <Clock className="h-3 w-3 mr-1" />
                    <span className="text-xs">Not Built</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Build a Barracks to train military units.</p>
              </div>
              
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
              <div className="space-y-2">
                {battleTargets.map((target) => (
                  <div 
                    key={target.id} 
                    className="p-3 border border-amber-800/20 rounded-md cursor-pointer hover:bg-amber-900/20"
                    onClick={() => handleSelectTarget(target.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{target.name}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">Strength: {target.strength}</span>
                          <span className={`text-xs ${getThreatColor(target.threat)}`}>
                            {target.threat}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Compass className="h-4 w-4 text-amber-600 mr-1" />
                        <span className="text-xs">{target.distance}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
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
            
            <div className="space-y-3">
              <div className="p-3 border border-amber-800/20 rounded-md">
                <p className="text-sm">You have no active alliances.</p>
                <p className="text-xs text-muted-foreground mt-1">Alliances provide military benefits and protection.</p>
              </div>
              
              <div className="p-3 border border-amber-800/20 rounded-md">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Embassy Status</p>
                  <div className="flex items-center text-amber-600">
                    <Clock className="h-3 w-3 mr-1" />
                    <span className="text-xs">Not Built</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Build an Embassy to form alliances with other kingdoms.</p>
              </div>
              
              <div className="flex">
                <Button 
                  variant="outline" 
                  className="flex-1 border-amber-800/30 hover:bg-amber-900/20"
                >
                  <UserCheck className="h-4 w-4 mr-1" /> View Alliances
                </Button>
              </div>
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
              <div className="p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Total Units</p>
                    <p className="text-2xl font-bold text-amber-600">0</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Daily Upkeep</p>
                    <p className="text-2xl font-bold text-amber-600">0</p>
                  </div>
                </div>
              </div>
              
              <h4 className="font-semibold text-sm">Available Units</h4>
              
              <div className="space-y-2">
                {militaryUnits.map((unit, index) => (
                  <div key={index} className="p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{unit.name}</p>
                        <div className="flex text-xs text-muted-foreground gap-2">
                          <span>Attack: {unit.strength}</span>
                          <span>Defense: {unit.defense}</span>
                          <span>Upkeep: {unit.maintenance} gold/day</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{unit.cost} Gold</p>
                        <Button size="sm" variant="outline" className="mt-1" disabled>
                          Train
                        </Button>
                      </div>
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
              
              <div className="p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
                <p className="text-sm font-medium">Army Status</p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-xs font-medium">Attack Power</p>
                    <p className="text-lg font-bold text-amber-600">0</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium">Defense Rating</p>
                    <p className="text-lg font-bold text-amber-600">0</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                {battleTargets.map((target) => (
                  <div key={target.id} className="p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{target.name}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">Strength: {target.strength}</span>
                          <span className={`text-xs ${getThreatColor(target.threat)}`}>
                            {target.threat}
                          </span>
                        </div>
                        <p className="text-xs text-green-600 mt-1">Potential reward: {target.reward}</p>
                      </div>
                      <div>
                        <Button size="sm" variant="outline" disabled>
                          Attack
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
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
      
      {/* Attack Details Dialog */}
      <Dialog open={showAttackDetailsDialog} onOpenChange={setShowAttackDetailsDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Battle Details</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            {selectedTarget && (
              <div className="space-y-4">
                <div className="p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
                  <p className="font-medium text-lg">{battleTargets.find(t => t.id === selectedTarget)?.name}</p>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-xs font-medium">Enemy Strength</p>
                      <p className="text-lg font-bold text-amber-600">
                        {battleTargets.find(t => t.id === selectedTarget)?.strength}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium">Threat Level</p>
                      <p className={`text-lg font-bold ${getThreatColor(battleTargets.find(t => t.id === selectedTarget)?.threat || '')}`}>
                        {battleTargets.find(t => t.id === selectedTarget)?.threat}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
                  <p className="font-medium">Battle Rewards</p>
                  <p className="text-sm text-green-600 mt-1">
                    {battleTargets.find(t => t.id === selectedTarget)?.reward}
                  </p>
                </div>
                
                <div className="p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
                  <p className="font-medium">Victory Chance</p>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs">
                      <span>Estimated Success</span>
                      <span>0%</span>
                    </div>
                    <Progress value={0} className="h-1.5 mt-1" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Your army is too weak to attack this target.
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" disabled>
                    Prepare Attack
                  </Button>
                  <Button onClick={() => setShowAttackDetailsDialog(false)} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MilitaryTab;
