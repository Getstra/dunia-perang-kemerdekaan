import React from "react";
import { useTheme } from "@/providers/ThemeProvider";
import {
  Castle,
  Crown,
  Calendar,
  MapPin,
  Users,
  CoinsIcon,
} from "lucide-react";
import { Kingdom } from "@/utils/types";
import { Progress } from "@/components/ui/progress";

interface KingdomDetailsProps {
  kingdom: Kingdom;
  resources: {
    gold: number;
    population: number;
    land: number;
  };
}

const KingdomDetails: React.FC<KingdomDetailsProps> = ({
  kingdom,
  resources,
}) => {
  const { theme } = useTheme();

  // Format the age to show years and days
  const formatAge = (age: number) => {
    const years = Math.floor(age);
    const days = Math.floor((age - years) * 365);

    if (years === 0) {
      return `${days} days`;
    }

    return `${years} ${years === 1 ? "year" : "years"}, ${days} days`;
  };

  // Calculate population density
  const populationDensity =
    resources.land > 0
      ? Math.floor((resources.population / resources.land) * 100)
      : 0;

  return (
    <div className={`glass-card ${theme}`}>
      <div className="flex items-center mb-4">
        <Castle className="w-6 h-6 mr-2 text-amber-600" />
        <h2 className="text-2xl font-bold">Kingdom Details</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 glass-panel rounded-md">
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <Crown className="w-4 h-4 mr-2 text-amber-600" />
            Realm Information
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Kingdom Name:</span>
              <span className="font-medium">{kingdom.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Ruler:</span>
              <span className="font-medium">{kingdom.ruler}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Age:</span>
              <span className="font-medium">{formatAge(kingdom.age)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Updated:</span>
              <span className="font-medium">
                {new Date(kingdom.lastUpdated).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 glass-panel rounded-md">
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-amber-600" />
            Territory Statistics
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Land:</span>
              <span className="font-medium">{resources.land} acres</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Population:</span>
              <span className="font-medium">
                {resources.population} citizens
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Gold Reserves:</span>
              <span className="font-medium">{resources.gold} gold</span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-muted-foreground">
                  Population Density:
                </span>
                <span className="font-medium">{populationDensity}%</span>
              </div>
              <Progress value={populationDensity} className="h-2" />
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KingdomDetails;
