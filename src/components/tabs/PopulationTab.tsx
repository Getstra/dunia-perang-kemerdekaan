import React, { useState } from "react";
import { UserPlus, Users, Heart } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import PopulationOverview from "../population/PopulationOverview";
import CitizensPanel from "../population/CitizensPanel";
import SpecialistsPanel from "../population/SpecialistsPanel";
import HappinessPanel from "../population/HappinessPanel";
import PopulationStatsPanel from "../population/PopulationStatsPanel";
import CitizenManagementDialog from "../population/CitizenManagementDialog";
import SpecialistTrainingDialog from "../population/SpecialistTrainingDialog";

const PopulationTab: React.FC = () => {
  const { theme } = useTheme();
  const [showCitizenDialog, setShowCitizenDialog] = useState(false);
  const [showSpecialistDialog, setShowSpecialistDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("citizens");

  // Population data
  const populationData = {
    total: 35,
    happy: 28,
    neutral: 5,
    unhappy: 2,
    growth: 1.5,
    capacity: 50,
    happiness: 80, // percentage
    happinessFactors: [
      { name: "Food Supply", impact: "+15%", positive: true },
      { name: "Housing", impact: "+10%", positive: true },
      { name: "Taxes", impact: "-5%", positive: false },
      { name: "Work Conditions", impact: "+5%", positive: true },
    ],
  };

  // Job assignments
  const assignments = [
    {
      type: "Farmers",
      count: 12,
      total: 12,
      production: "+24 food/day",
      skill: 1,
    },
    {
      type: "Miners",
      count: 8,
      total: 10,
      production: "+16 stone/day",
      skill: 1,
    },
    {
      type: "Woodcutters",
      count: 6,
      total: 8,
      production: "+12 wood/day",
      skill: 1,
    },
    { type: "Unemployed", count: 9, total: 9, production: "None", skill: 0 },
  ];

  // Specialist types
  const specialistTypes = [
    {
      id: 1,
      name: "Scholar",
      benefit: "Research +15%",
      cost: 150,
      time: "2 days",
      requirements: "Library Level 1",
    },
    {
      id: 2,
      name: "Artisan",
      benefit: "Building Cost -10%",
      cost: 200,
      time: "3 days",
      requirements: "Workshop Level 1",
    },
    {
      id: 3,
      name: "Merchant",
      benefit: "Trade Income +20%",
      cost: 250,
      time: "3 days",
      requirements: "Market Level 1",
    },
    {
      id: 4,
      name: "Engineer",
      benefit: "Building Speed +15%",
      cost: 300,
      time: "4 days",
      requirements: "University Level 1",
    },
  ];

  // Active specialists
  const activeSpecialists: any[] = [];

  // Population stats
  const populationStats = [
    { name: "Birth Rate", value: "1.5 per day", icon: UserPlus },
    { name: "Death Rate", value: "0.2 per day", icon: Heart },
    { name: "Housing", value: "35/50", icon: Users },
    { name: "Food Consumption", value: "70/day", icon: Users },
    { name: "Worker Efficiency", value: "100%", icon: Users },
  ];

  const getHappinessColor = () => {
    const happyPercent = (populationData.happy / populationData.total) * 100;
    if (happyPercent >= 70) return "text-green-600";
    if (happyPercent >= 40) return "text-amber-600";
    return "text-red-600";
  };

  const handleWorkerAdjustment = (type: string, adjustment: number) => {
    console.log(`Adjusting ${type} by ${adjustment}`);
    // Would update state in a real implementation
  };

  return (
    <div className="md:col-span-3">
      <div className={`glass-card ${theme}`}>
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <UserPlus className="w-6 h-6 mr-2 text-amber-600" /> Population
        </h2>

        <PopulationOverview populationData={populationData} />

        <Tabs
          defaultValue="citizens"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="citizens" className="flex items-center gap-1">
              <Users className="h-4 w-4" /> Citizens
            </TabsTrigger>
            <TabsTrigger value="details" className="flex items-center gap-1">
              <Heart className="h-4 w-4" /> Happiness & Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="citizens" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CitizensPanel
                assignments={assignments}
                onShowCitizenDialog={() => setShowCitizenDialog(true)}
                handleWorkerAdjustment={handleWorkerAdjustment}
              />

              <SpecialistsPanel
                activeSpecialists={activeSpecialists}
                onShowSpecialistDialog={() => setShowSpecialistDialog(true)}
              />
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <HappinessPanel
                happinessFactors={populationData.happinessFactors}
                happiness={populationData.happiness}
                getHappinessColor={getHappinessColor}
              />

              <PopulationStatsPanel
                populationStats={populationStats}
                populationGrowth={populationData.growth}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialogs */}
      <CitizenManagementDialog
        open={showCitizenDialog}
        onOpenChange={setShowCitizenDialog}
        assignments={assignments}
      />

      <SpecialistTrainingDialog
        open={showSpecialistDialog}
        onOpenChange={setShowSpecialistDialog}
        specialistTypes={specialistTypes}
      />
    </div>
  );
};

export default PopulationTab;
