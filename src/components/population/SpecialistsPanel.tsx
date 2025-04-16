
import React from "react";
import { GraduationCap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SpecialistsPanelProps {
  activeSpecialists: any[];
  onShowSpecialistDialog: () => void;
}

const SpecialistsPanel: React.FC<SpecialistsPanelProps> = ({ 
  activeSpecialists, 
  onShowSpecialistDialog 
}) => {
  return (
    <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
      <h3 className="font-semibold text-lg mb-2 flex items-center">
        <GraduationCap className="w-4 h-4 mr-2 text-amber-600" /> Specialists
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Train and assign specialized workers
      </p>
      
      <div className="space-y-3">
        {activeSpecialists.length > 0 ? (
          <div className="space-y-2">
            {activeSpecialists.map((specialist, index) => (
              <div key={index} className="p-3 border border-amber-800/20 rounded-md">
                <p className="font-medium">{specialist.name}</p>
                <p className="text-xs text-muted-foreground">{specialist.benefit}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-3 border border-amber-800/20 rounded-md">
            <p className="text-sm">You have no trained specialists.</p>
            <p className="text-xs text-muted-foreground mt-1">Specialists provide unique bonuses to your kingdom.</p>
          </div>
        )}
        
        <div className="p-3 border border-amber-800/20 rounded-md">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">University Status</p>
            <div className="flex items-center text-amber-600">
              <Clock className="h-3 w-3 mr-1" />
              <span className="text-xs">Not Built</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Build a University to train specialists.</p>
        </div>
        
        <Button 
          variant="outline"
          onClick={onShowSpecialistDialog}
          className="w-full border-amber-800/30 hover:bg-amber-900/20"
        >
          Train Specialists
        </Button>
      </div>
    </div>
  );
};

export default SpecialistsPanel;
