
import React from "react";
import { Home, Building, Construction, Clock, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface JobAssignment {
  type: string;
  count: number;
  total: number;
  production: string;
  skill: number;
}

interface CitizensPanelProps {
  assignments: JobAssignment[];
  onShowCitizenDialog: () => void;
  handleWorkerAdjustment: (type: string, adjustment: number) => void;
}

const CitizensPanel: React.FC<CitizensPanelProps> = ({ 
  assignments, 
  onShowCitizenDialog,
  handleWorkerAdjustment
}) => {
  return (
    <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
      <h3 className="font-semibold text-lg mb-2 flex items-center">
        <Home className="w-4 h-4 mr-2 text-amber-600" /> Citizens
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Manage your general population
      </p>
      
      <div className="space-y-3">
        <div className="space-y-2">
          {assignments.map((job, index) => (
            <div key={index} className="p-3 border border-amber-800/20 rounded-md">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{job.type}</p>
                  <p className="text-xs text-muted-foreground">Production: {job.production}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">{job.count}/{job.total}</p>
                  <div className="flex items-center mt-1">
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="h-5 w-5 rounded-full p-0" 
                      onClick={() => handleWorkerAdjustment(job.type, -1)}
                      disabled
                    >
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="h-5 w-5 rounded-full p-0 ml-1" 
                      onClick={() => handleWorkerAdjustment(job.type, 1)}
                      disabled
                    >
                      <ChevronUp className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
              <Progress value={(job.count/job.total) * 100} className="h-1.5 mt-2" />
            </div>
          ))}
        </div>
        
        <div className="p-3 border border-amber-800/20 rounded-md">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">Town Hall Status</p>
            <div className="flex items-center text-amber-600">
              <Clock className="h-3 w-3 mr-1" />
              <span className="text-xs">Not Built</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Build a Town Hall to manage citizen assignments.</p>
        </div>
        
        <Button 
          variant="outline"
          onClick={onShowCitizenDialog}
          className="w-full border-amber-800/30 hover:bg-amber-900/20"
        >
          Assign Workers
        </Button>
      </div>
    </div>
  );
};

export default CitizensPanel;
