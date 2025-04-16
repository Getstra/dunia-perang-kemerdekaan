
import React from "react";
import { Heart } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface HappinessFactor {
  name: string;
  impact: string;
  positive: boolean;
}

interface HappinessPanelProps {
  happinessFactors: HappinessFactor[];
  happiness: number;
  getHappinessColor: () => string;
}

const HappinessPanel: React.FC<HappinessPanelProps> = ({ 
  happinessFactors, 
  happiness, 
  getHappinessColor 
}) => {
  return (
    <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
      <h3 className="font-semibold text-lg mb-2 flex items-center">
        <Heart className="w-4 h-4 mr-2 text-amber-600" /> Happiness Factors
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Factors affecting citizen happiness
      </p>
      
      <div className="space-y-2">
        {happinessFactors.map((factor, index) => (
          <div key={index} className="p-3 border border-amber-800/20 rounded-md">
            <div className="flex justify-between items-center">
              <p className="font-medium">{factor.name}</p>
              <p className={`font-medium ${factor.positive ? 'text-green-600' : 'text-red-600'}`}>{factor.impact}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 border border-amber-800/20 rounded-md">
        <p className="font-medium">Overall Happiness</p>
        <div className="mt-2">
          <div className="flex justify-between text-xs">
            <span>Current Level</span>
            <span className={getHappinessColor()}>{happiness}%</span>
          </div>
          <Progress 
            value={happiness} 
            className={`h-2 mt-1 ${
              happiness >= 70 
                ? 'bg-green-600/20' 
                : happiness >= 40 
                ? 'bg-amber-600/20' 
                : 'bg-red-600/20'
            }`} 
          />
        </div>
      </div>
    </div>
  );
};

export default HappinessPanel;
