import React from "react";
import { Globe, Handshake, AlertTriangle, Shield } from "lucide-react";

interface DiplomaticRelation {
  id: string;
  name: string;
  status: "allied" | "neutral" | "hostile";
  strength: number;
  resources: {
    gold: number;
    iron: number;
    wood: number;
  };
  lastInteraction: string;
}

interface DiplomacyProps {
  relations: DiplomaticRelation[];
  onSendGift: (relationId: string) => void;
  onDeclareWar: (relationId: string) => void;
  onProposeAlliance: (relationId: string) => void;
}

const Diplomacy: React.FC<DiplomacyProps> = ({
  relations,
  onSendGift,
  onDeclareWar,
  onProposeAlliance,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "allied":
        return "text-green-600";
      case "neutral":
        return "text-amber-600";
      case "hostile":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "allied":
        return Handshake;
      case "neutral":
        return Globe;
      case "hostile":
        return AlertTriangle;
      default:
        return Globe;
    }
  };

  return (
    <div className="mb-6 px-4 py-3 rounded-xl bg-blue-50/30 dark:bg-blue-950/20 backdrop-blur-sm shadow-lg border border-blue-200/30 dark:border-blue-800/30">
      <h2 className="text-3xl font-bold mb-4 flex items-center pb-3 border-b border-blue-800/20">
        <Globe className="w-8 h-8 mr-3 text-blue-600 drop-shadow-md" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 drop-shadow-sm">
          Diplomacy
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {relations.map((relation) => {
          const StatusIcon = getStatusIcon(relation.status);
          
          return (
            <div
              key={relation.id}
              className="p-4 bg-blue-900/10 rounded-lg border border-blue-800/30 hover:border-blue-700/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <StatusIcon className={`w-5 h-5 mr-2 ${getStatusColor(relation.status)}`} />
                  <h3 className="font-semibold">{relation.name}</h3>
                </div>
                <span className={`text-sm font-medium ${getStatusColor(relation.status)}`}>
                  {relation.status.charAt(0).toUpperCase() + relation.status.slice(1)}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Strength: {relation.strength}</span>
                  <span>Last Interaction: {relation.lastInteraction}</span>
                </div>

                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Resources:</span>
                  <div className="flex gap-2">
                    <span className="text-amber-600">{relation.resources.gold} Gold</span>
                    <span className="text-amber-600">{relation.resources.iron} Iron</span>
                    <span className="text-amber-600">{relation.resources.wood} Wood</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => onSendGift(relation.id)}
                    className="flex-1 py-1.5 px-3 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    Send Gift
                  </button>
                  {relation.status === "neutral" && (
                    <>
                      <button
                        onClick={() => onProposeAlliance(relation.id)}
                        className="flex-1 py-1.5 px-3 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
                      >
                        Propose Alliance
                      </button>
                      <button
                        onClick={() => onDeclareWar(relation.id)}
                        className="flex-1 py-1.5 px-3 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
                      >
                        Declare War
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Diplomacy; 