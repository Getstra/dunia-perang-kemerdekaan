
import React from "react";
import { BookOpen } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

const ResearchTab: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="md:col-span-3">
      <div className={`neu-card ${theme}`}>
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-amber-600" /> Research
        </h2>
        <p className="text-muted-foreground">
          Discover new technologies to advance your kingdom.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
            <h3 className="font-semibold text-lg mb-2">
              Military Tech
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Improve your military capabilities
            </p>
            <div className="p-4 border border-dashed border-muted-foreground rounded-md text-center bg-black/10">
              <p>Military research coming soon!</p>
            </div>
          </div>
          <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
            <h3 className="font-semibold text-lg mb-2">Economy Tech</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Enhance your resource production
            </p>
            <div className="p-4 border border-dashed border-muted-foreground rounded-md text-center bg-black/10">
              <p>Economy research coming soon!</p>
            </div>
          </div>
          <div className="p-4 border border-amber-800/30 bg-amber-900/10 rounded-md">
            <h3 className="font-semibold text-lg mb-2">Magic Arts</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Discover magical abilities for your kingdom
            </p>
            <div className="p-4 border border-dashed border-muted-foreground rounded-md text-center bg-black/10">
              <p>Magic research coming soon!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchTab;
