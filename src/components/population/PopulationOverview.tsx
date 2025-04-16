
import React from "react";
import { Users, UserPlus, Heart } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface PopulationData {
  total: number;
  happy: number;
  neutral: number;
  unhappy: number;
  growth: number;
  capacity: number;
  happiness: number;
}

interface PopulationOverviewProps {
  populationData: PopulationData;
}

const PopulationOverview: React.FC<PopulationOverviewProps> = ({ populationData }) => {
  const getHappinessColor = () => {
    const happyPercent = (populationData.happy / populationData.total) * 100;
    if (happyPercent >= 70) return "text-green-600";
    if (happyPercent >= 40) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="mb-6 bg-amber-900/5 border border-amber-800/20 rounded-md p-4">
      <h3 className="font-semibold text-lg mb-2 flex items-center">
        <Users className="w-4 h-4 mr-2 text-amber-600" /> Population Overview
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-3 bg-amber-900/10 rounded-md border border-amber-800/30">
          <p className="text-sm font-semibold">Total Population</p>
          <p className="text-2xl font-bold text-amber-600">{populationData.total}</p>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Growth: +{populationData.growth}/day</span>
            <span>Capacity: {populationData.capacity}</span>
          </div>
          <Progress value={(populationData.total/populationData.capacity) * 100} className="h-1.5 mt-2" />
        </div>
        <div className="p-3 bg-amber-900/10 rounded-md border border-amber-800/30">
          <p className="text-sm font-semibold">Happiness</p>
          <p className={`text-2xl font-bold ${getHappinessColor()}`}>
            {Math.round((populationData.happy / populationData.total) * 100)}%
          </p>
          <div className="flex text-xs text-muted-foreground mt-1">
            <span className="text-green-600 mr-2">Happy: {populationData.happy}</span>
            <span className="text-amber-600 mr-2">Neutral: {populationData.neutral}</span>
            <span className="text-red-600">Unhappy: {populationData.unhappy}</span>
          </div>
        </div>
        <div className="p-3 bg-amber-900/10 rounded-md border border-amber-800/30">
          <p className="text-sm font-semibold">Specialists</p>
          <p className="text-2xl font-bold text-amber-600">0</p>
          <p className="text-xs text-muted-foreground">No specialists trained</p>
        </div>
      </div>
    </div>
  );
};

export default PopulationOverview;
