
import React from 'react';
import { Building } from '../../utils/types';
import { Clock } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface BuildingDetailsDialogProps {
  building: Building | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BuildingDetailsDialog: React.FC<BuildingDetailsDialogProps> = ({ 
  building, 
  open, 
  onOpenChange 
}) => {
  // Calculate completion percentage
  const calculateProgress = (building: Building): number => {
    if (!building.completionTime || building.completed) return 100;
    
    const now = Date.now();
    const totalTime = building.constructionTime * 60 * 1000; // Convert minutes to ms
    const elapsedTime = now - (building.completionTime - totalTime);
    
    return Math.min(100, Math.max(0, (elapsedTime / totalTime) * 100));
  };
  
  if (!building) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{building.name} Details</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="space-y-4">
            <div className="p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
              <p className="text-lg font-bold">{building.name}</p>
              <p className="text-sm">{building.description}</p>
              
              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium">Type</p>
                  <p className="text-sm capitalize">{building.type}</p>
                </div>
                <div>
                  <p className="text-xs font-medium">Level</p>
                  <p className="text-sm">{building.level}</p>
                </div>
              </div>
            </div>
            
            <div className="p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
              <p className="font-medium">Building Effects</p>
              
              {building.production && Object.keys(building.production).length > 0 ? (
                <div className="mt-2 space-y-2">
                  {Object.entries(building.production)
                    .filter(([_, value]) => value)
                    .map(([key, value], index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-sm">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                        <span className="text-sm text-green-600">+{String(value)} per day</span>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mt-1">
                  This building provides special effects rather than resource production.
                </p>
              )}
            </div>
            
            <div className="p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
              <p className="font-medium">Upgrade Information</p>
              
              {!building.completed ? (
                <div className="mt-2">
                  <p className="text-sm">This building is currently under construction.</p>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{calculateProgress(building)}%</span>
                    </div>
                    <Progress value={calculateProgress(building)} className="h-1.5 mt-1" />
                  </div>
                </div>
              ) : (
                <div className="mt-2 space-y-2">
                  <p className="text-sm">Upgrade to Level {building.level + 1} requires:</p>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {building.cost.gold && (
                      <div className="flex justify-between">
                        <span>Gold</span>
                        <span>{building.cost.gold * (building.level + 1)}</span>
                      </div>
                    )}
                    {building.cost.wood && (
                      <div className="flex justify-between">
                        <span>Wood</span>
                        <span>{building.cost.wood * (building.level + 1)}</span>
                      </div>
                    )}
                    {building.cost.stone && (
                      <div className="flex justify-between">
                        <span>Stone</span>
                        <span>{building.cost.stone * (building.level + 1)}</span>
                      </div>
                    )}
                    {building.cost.food && (
                      <div className="flex justify-between">
                        <span>Food</span>
                        <span>{building.cost.food * (building.level + 1)}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center text-sm mt-2">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{building.constructionTime * (building.level + 1) / 2} minutes</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BuildingDetailsDialog;
