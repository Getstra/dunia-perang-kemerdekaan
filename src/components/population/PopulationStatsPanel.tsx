
import React from "react";
import { Users } from "lucide-react";

interface PopulationStat {
  name: string;
  value: string;
  icon: React.ElementType;
}

interface PopulationStatsPanelProps {
  populationStats: PopulationStat[];
  populationGrowth: number;
}

const PopulationStatsPanel: React.FC<PopulationStatsPanelProps> = ({ 
  populationStats, 
  populationGrowth 
}) => {
  return (
    <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
      <h3 className="font-semibold text-lg mb-2 flex items-center">
        <Users className="w-4 h-4 mr-2 text-amber-600" /> Population Stats
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Detailed statistics about your population
      </p>
      
      <div className="space-y-2">
        {populationStats.map((stat, index) => {
          const StatIcon = stat.icon;
          return (
            <div key={index} className="p-3 border border-amber-800/20 rounded-md">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <StatIcon className="h-4 w-4 text-amber-600 mr-2" />
                  <p className="font-medium">{stat.name}</p>
                </div>
                <p className="text-sm">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 p-3 border border-amber-800/20 rounded-md">
        <p className="font-medium">Population Growth</p>
        <div className="flex justify-between text-xs mt-2">
          <span>Current Trend</span>
          <span className="text-green-600">+{populationGrowth}/day</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Build more houses to increase your population capacity.
        </p>
      </div>
    </div>
  );
};

export default PopulationStatsPanel;
