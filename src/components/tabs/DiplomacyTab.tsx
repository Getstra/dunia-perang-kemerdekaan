
import React, { useState } from "react";
import { Users, UserCheck, Truck, Globe, Handshake, BarChart3, Clock, ShieldAlert, Award } from "lucide-react";
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

const DiplomacyTab: React.FC = () => {
  const { theme } = useTheme();
  const [showAllianceDialog, setShowAllianceDialog] = useState(false);
  const [showTradeDialog, setShowTradeDialog] = useState(false);
  const [selectedKingdom, setSelectedKingdom] = useState<number | null>(null);

  // Kingdom relations data
  const relations = [
    { id: 1, name: "Eastdale", status: "Neutral", relationLevel: 50 },
    { id: 2, name: "Southern Isles", status: "Friendly", relationLevel: 75 },
    { id: 3, name: "Western Dominion", status: "Hostile", relationLevel: 25 },
  ];

  // Alliance options
  const allianceOptions = [
    { id: 1, name: "Eastdale", benefits: ["Mutual Defense", "Open Borders"], requirements: "70+ Relations", relationLevel: 50 },
    { id: 2, name: "Southern Isles", benefits: ["Resource Sharing", "Military Support"], requirements: "80+ Relations", relationLevel: 75 },
  ];

  // Trade route options
  const tradeOptions = [
    { id: 1, name: "Eastdale", offers: "Wood, Stone", wants: "Food, Gold", profit: "+15 Gold/day" },
    { id: 2, name: "Southern Isles", offers: "Exotic Goods, Fish", wants: "Iron, Gold", profit: "+25 Gold/day" },
    { id: 3, name: "Western Dominion", offers: "Iron, Gems", wants: "Food, Wood", profit: "+35 Gold/day" },
  ];

  // Active alliances and trade routes (empty for now but would be filled from game state)
  const activeAlliances: any[] = [];
  const activeTradeRoutes: any[] = [];

  const getRelationColor = (level: number) => {
    if (level >= 70) return "text-green-600";
    if (level >= 40) return "text-amber-600";
    return "text-red-600";
  };

  const handleKingdomSelect = (id: number) => {
    setSelectedKingdom(id);
  };

  return (
    <div className="md:col-span-3">
      <div className={`neu-card ${theme}`}>
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Users className="w-6 h-6 mr-2 text-amber-600" /> Diplomacy
        </h2>
        
        <div className="mb-6 bg-amber-900/5 border border-amber-800/20 rounded-md p-4">
          <h3 className="font-semibold text-lg mb-2 flex items-center">
            <Globe className="w-4 h-4 mr-2 text-amber-600" /> Relations Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-amber-900/10 rounded-md border border-amber-800/30">
              <p className="text-sm font-semibold">Known Kingdoms</p>
              <p className="text-2xl font-bold text-amber-600">{relations.length}</p>
              <p className="text-xs text-muted-foreground">Discovered through exploration</p>
            </div>
            <div className="p-3 bg-amber-900/10 rounded-md border border-amber-800/30">
              <p className="text-sm font-semibold">Active Alliances</p>
              <p className="text-2xl font-bold text-amber-600">{activeAlliances.length}</p>
              <p className="text-xs text-muted-foreground">{activeAlliances.length > 0 ? `${activeAlliances.length} formal alliances established` : "No formal alliances established"}</p>
            </div>
            <div className="p-3 bg-amber-900/10 rounded-md border border-amber-800/30">
              <p className="text-sm font-semibold">Trade Income</p>
              <p className="text-2xl font-bold text-amber-600">{activeTradeRoutes.length > 0 ? "+75" : "0"}</p>
              <p className="text-xs text-muted-foreground">{activeTradeRoutes.length > 0 ? `${activeTradeRoutes.length} active trade routes` : "No active trade routes"}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <UserCheck className="w-4 h-4 mr-2 text-amber-600" /> Alliances
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Form alliances with neighboring kingdoms
            </p>
            
            <div className="space-y-3">
              <div className="space-y-2">
                {relations.map((kingdom) => (
                  <div 
                    key={kingdom.id} 
                    className={`p-3 border border-amber-800/20 rounded-md cursor-pointer transition-all ${selectedKingdom === kingdom.id ? 'bg-amber-900/20' : 'hover:bg-amber-900/10'}`}
                    onClick={() => handleKingdomSelect(kingdom.id)}
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{kingdom.name}</p>
                        <div className="flex items-center">
                          <p className="text-xs text-muted-foreground">Status: {kingdom.status}</p>
                          {kingdom.status === "Friendly" && (
                            <span className="ml-1 text-xs bg-green-600/20 text-green-700 px-1 rounded">+5 relation/day</span>
                          )}
                          {kingdom.status === "Hostile" && (
                            <span className="ml-1 text-xs bg-red-600/20 text-red-700 px-1 rounded">-3 relation/day</span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium">Relations</p>
                        <p className={`text-sm ${getRelationColor(kingdom.relationLevel)}`}>{kingdom.relationLevel}/100</p>
                        <Progress value={kingdom.relationLevel} className="h-1 mt-1 w-16" />
                      </div>
                    </div>
                    {selectedKingdom === kingdom.id && (
                      <div className="mt-3 pt-2 border-t border-amber-800/20 flex flex-wrap gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-xs" 
                          disabled={kingdom.relationLevel < 70}
                        >
                          <Handshake className="h-3 w-3 mr-1" /> Form Alliance
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-xs"
                        >
                          <Award className="h-3 w-3 mr-1" /> Send Gift
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-xs" 
                          disabled={kingdom.relationLevel < 40}
                        >
                          <Truck className="h-3 w-3 mr-1" /> Propose Trade
                        </Button>
                        {kingdom.status !== "Hostile" && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs text-red-600" 
                          >
                            <ShieldAlert className="h-3 w-3 mr-1" /> Declare War
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <Button 
                variant="outline"
                onClick={() => setShowAllianceDialog(true)}
                className="w-full flex items-center justify-center gap-1 border-amber-800/30 hover:bg-amber-900/20"
              >
                <Handshake className="h-4 w-4" /> Manage Alliances
              </Button>
            </div>
          </div>
          
          <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Truck className="w-4 h-4 mr-2 text-amber-600" /> Trade Routes
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Establish trade routes for resource exchange
            </p>
            
            <div className="space-y-3">
              <div className="p-3 border border-amber-800/20 rounded-md">
                <p className="text-sm">You have no active trade routes.</p>
                <p className="text-xs text-muted-foreground mt-1">Establish trade routes to generate passive income.</p>
              </div>
              
              <div className="p-3 border border-amber-800/20 rounded-md">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Trading Post Status</p>
                  <div className="flex items-center text-amber-600">
                    <Clock className="h-3 w-3 mr-1" />
                    <span className="text-xs">Not Built</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Build a Trading Post to establish trade routes with other kingdoms.</p>
              </div>
              
              <Button 
                variant="outline"
                onClick={() => setShowTradeDialog(true)}
                className="w-full flex items-center justify-center gap-1 border-amber-800/30 hover:bg-amber-900/20"
              >
                <BarChart3 className="h-4 w-4" /> Establish Trade
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Alliance Dialog */}
      <Dialog open={showAllianceDialog} onOpenChange={setShowAllianceDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Form an Alliance</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Potential Allies</h4>
              
              <div className="space-y-2">
                {allianceOptions.map((option) => (
                  <div key={option.id} className="p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
                    <p className="font-medium">{option.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Benefits: {option.benefits.join(", ")}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-muted-foreground">Requires: {option.requirements}</p>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        disabled={option.relationLevel < 70}
                      >
                        Form Alliance
                      </Button>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs font-medium">Current Relations: {option.relationLevel}/100</p>
                      <Progress value={option.relationLevel} className="h-1.5 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
                <p className="text-sm font-medium">Requirements</p>
                <p className="text-xs text-muted-foreground mt-1">
                  You need to build an Embassy (Level 1) before you can form alliances.
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setShowAllianceDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Trade Dialog */}
      <Dialog open={showTradeDialog} onOpenChange={setShowTradeDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Establish Trade Routes</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Potential Trade Partners</h4>
              
              <div className="space-y-2">
                {tradeOptions.map((option) => (
                  <div key={option.id} className="p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
                    <p className="font-medium">{option.name}</p>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <div>
                        <p className="text-xs font-medium">They offer</p>
                        <p className="text-xs text-muted-foreground">{option.offers}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium">They want</p>
                        <p className="text-xs text-muted-foreground">{option.wants}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs font-medium text-green-600">{option.profit}</p>
                      <Button size="sm" variant="outline" disabled>
                        Establish Route
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 border border-amber-800/20 rounded-md bg-amber-900/5">
                <p className="text-sm font-medium">Requirements</p>
                <p className="text-xs text-muted-foreground mt-1">
                  You need to build a Trading Post (Level 1) before you can establish trade routes.
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setShowTradeDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DiplomacyTab;
