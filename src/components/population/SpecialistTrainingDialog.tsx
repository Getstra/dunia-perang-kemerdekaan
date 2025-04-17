import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface SpecialistType {
  id: number;
  name: string;
  benefit: string;
  cost: number;
  time: string;
  requirements: string;
}

interface SpecialistTrainingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  specialistTypes: SpecialistType[];
}

const SpecialistTrainingDialog: React.FC<SpecialistTrainingDialogProps> = ({
  open,
  onOpenChange,
  specialistTypes,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] glass-dialog">
        <DialogHeader>
          <DialogTitle>Train Specialists</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Available Specialists</h4>

            <div className="space-y-2">
              {specialistTypes.map((specialist) => (
                <div key={specialist.id} className="p-3 glass-panel rounded-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{specialist.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Benefit: {specialist.benefit}
                      </p>
                      <p className="text-xs text-amber-600 mt-1">
                        Requires: {specialist.requirements}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        Cost: {specialist.cost} Gold
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Time: {specialist.time}
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-1"
                        disabled
                      >
                        Train
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 glass-panel rounded-md">
              <p className="text-sm font-medium">Requirements</p>
              <p className="text-xs text-muted-foreground mt-1">
                You need to build a University (Level 1) to train specialists.
              </p>
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

export default SpecialistTrainingDialog;
