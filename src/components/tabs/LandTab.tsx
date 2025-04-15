
import React from "react";
import { Map as MapIcon } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

const LandTab: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="md:col-span-3">
      <div className={`neu-card ${theme}`}>
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <MapIcon className="w-6 h-6 mr-2 text-amber-600" /> Land
        </h2>
        <p className="text-muted-foreground">
          View your kingdom's land and plan expansions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
            <h3 className="font-semibold text-lg mb-2">Territory</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Manage your current territory
            </p>
            <div className="p-4 border border-dashed border-muted-foreground rounded-md text-center bg-black/10">
              <p>Territory management coming soon!</p>
            </div>
          </div>
          <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
            <h3 className="font-semibold text-lg mb-2">Expansion</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Explore and conquer new lands
            </p>
            <div className="p-4 border border-dashed border-muted-foreground rounded-md text-center bg-black/10">
              <p>Expansion system coming soon!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandTab;
