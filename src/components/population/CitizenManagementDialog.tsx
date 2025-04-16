
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface JobAssignment {
  type: string;
  count: number;
  total: number;
  production: string;
  skill: number;
}

interface CitizenManagementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assignments: JobAssignment[];
}

const CitizenManagementDialog: React.FC<CitizenManagementDialogProps> = ({
  open,
  onOpenChange,
  assignments
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Assign Workers</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="space-y-4">
            <div className="p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
              <p className="text-sm font-medium">Available Workers</p>
              <p className="text-2xl font-bold text-amber-600">9</p>
              <p className="text-xs text-muted-foreground">Unemployed citizens ready for assignment</p>
            </div>
            
            <h4 className="font-semibold text-sm">Job Assignments</h4>
            
            <div className="space-y-2">
              {assignments.slice(0, 3).map((job, index) => (
                <div key={index} className="p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{job.type}</p>
                      <div className="text-xs text-muted-foreground">
                        <p>Currently: {job.count}/{job.total}</p>
                        <p>Production: {job.production}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" disabled>-</Button>
                      <Button size="sm" variant="outline" disabled>+</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
              <p className="text-sm font-medium">Requirements</p>
              <p className="text-xs text-muted-foreground mt-1">
                You need to build a Town Hall (Level 1) to manage citizen assignments.
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

export default CitizenManagementDialog;
