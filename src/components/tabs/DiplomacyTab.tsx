
import React from "react";
import { Users } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

const DiplomacyTab: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="md:col-span-3">
      <div className={`neu-card ${theme}`}>
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Users className="w-6 h-6 mr-2 text-amber-600" /> Diplomacy
        </h2>
        <p className="text-muted-foreground">
          Form alliances and trade with other kingdoms.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
            <h3 className="font-semibold text-lg mb-2">Alliances</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Form alliances with neighboring kingdoms
            </p>
            <div className="p-4 border border-dashed border-muted-foreground rounded-md text-center bg-black/10">
              <p>Alliance system coming soon!</p>
            </div>
          </div>
          <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
            <h3 className="font-semibold text-lg mb-2">Trade Routes</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Establish trade routes for resource exchange
            </p>
            <div className="p-4 border border-dashed border-muted-foreground rounded-md text-center bg-black/10">
              <p>Trade system coming soon!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiplomacyTab;
