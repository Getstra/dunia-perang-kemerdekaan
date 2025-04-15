
import React from "react";
import { Swords } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

const MilitaryTab: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="md:col-span-3">
      <div className={`neu-card ${theme}`}>
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Swords className="w-6 h-6 mr-2 text-amber-600" /> Military
        </h2>
        <p className="text-muted-foreground">
          Manage your troops and plan attacks on other kingdoms.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
            <h3 className="font-semibold text-lg mb-2">Army Units</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Train and manage your military forces
            </p>
            <div className="p-4 border border-dashed border-muted-foreground rounded-md text-center bg-black/10">
              <p>Army management coming soon!</p>
            </div>
          </div>
          <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
            <h3 className="font-semibold text-lg mb-2">Battle Plans</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Plan attacks and defenses for your kingdom
            </p>
            <div className="p-4 border border-dashed border-muted-foreground rounded-md text-center bg-black/10">
              <p>Battle planning coming soon!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilitaryTab;
