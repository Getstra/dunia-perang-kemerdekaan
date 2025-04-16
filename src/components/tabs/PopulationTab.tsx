
import React, { useState } from "react";
import { UserPlus, Users, GraduationCap, Home, Building, Construction } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

const PopulationTab: React.FC = () => {
  const { theme } = useTheme();
  const [showCitizenDialog, setShowCitizenDialog] = useState(false);
  const [showSpecialistDialog, setShowSpecialistDialog] = useState(false);

  // Population data
  const populationData = {
    total: 35,
    happy: 28,
    neutral: 5,
    unhappy: 2,
    growth: 1.5,
    capacity: 50
  };

  // Job assignments
  const assignments = [
    { type: "Farmers", count: 12, total: 12 },
    { type: "Miners", count: 8, total: 10 },
    { type: "Woodcutters", count: 6, total: 8 },
    { type: "Unemployed", count: 9, total: 9 }
  ];

  // Specialist types
  const specialistTypes = [
    { id: 1, name: "Scholar", benefit: "Research +15%", cost: 150, time: "2 days" },
    { id: 2, name: "Artisan", benefit: "Building Cost -10%", cost: 200, time: "3 days" },
    { id: 3, name: "Merchant", benefit: "Trade Income +20%", cost: 250, time: "3 days" },
    { id: 4, name: "Engineer", benefit: "Building Speed +15%", cost: 300, time: "4 days" }
  ];

  const getHappinessColor = () => {
    const happyPercent = (populationData.happy / populationData.total) * 100;
    if (happyPercent >= 70) return "text-green-600";
    if (happyPercent >= 40) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="md:col-span-3">
      <div className={`neu-card ${theme}`}>
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <UserPlus className="w-6 h-6 mr-2 text-amber-600" /> Population
        </h2>
        
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
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
                      <p className="font-medium">{job.type}</p>
                      <p className="text-sm">{job.count}/{job.total}</p>
                    </div>
                    <Progress value={(job.count/job.total) * 100} className="h-1.5 mt-2" />
                  </div>
                ))}
              </div>
              
              <Button 
                variant="outline"
                onClick={() => setShowCitizenDialog(true)}
                className="w-full border-amber-800/30 hover:bg-amber-900/20"
              >
                Assign Workers
              </Button>
            </div>
          </div>
          
          <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <GraduationCap className="w-4 h-4 mr-2 text-amber-600" /> Specialists
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Train and assign specialized workers
            </p>
            
            <div className="space-y-3">
              <div className="p-3 border border-amber-800/20 rounded-md">
                <p className="text-sm">You have no trained specialists.</p>
                <p className="text-xs text-muted-foreground mt-1">Specialists provide unique bonuses to your kingdom.</p>
              </div>
              
              <Button 
                variant="outline"
                onClick={() => setShowSpecialistDialog(true)}
                className="w-full border-amber-800/30 hover:bg-amber-900/20"
              >
                Train Specialists
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Citizen Management Dialog */}
      <Dialog open={showCitizenDialog} onOpenChange={setShowCitizenDialog}>
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
                        <p className="text-xs text-muted-foreground">
                          Currently: {job.count}/{job.total}
                        </p>
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
            <Button onClick={() => setShowCitizenDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Specialist Dialog */}
      <Dialog open={showSpecialistDialog} onOpenChange={setShowSpecialistDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Train Specialists</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Available Specialists</h4>
              
              <div className="space-y-2">
                {specialistTypes.map((specialist) => (
                  <div key={specialist.id} className="p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{specialist.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Benefit: {specialist.benefit}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Cost: {specialist.cost} Gold</p>
                        <p className="text-xs text-muted-foreground">Time: {specialist.time}</p>
                        <Button size="sm" variant="outline" className="mt-1" disabled>
                          Train
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
                <p className="text-sm font-medium">Requirements</p>
                <p className="text-xs text-muted-foreground mt-1">
                  You need to build a University (Level 1) to train specialists.
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setShowSpecialistDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopulationTab;
