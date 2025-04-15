
import React, { useState, useEffect } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { Trophy, Users, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface LeaderboardEntry {
  rank: number;
  name: string;
  kingdom: string;
  points: number;
}

const Leaderboard = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching leaderboard data
  useEffect(() => {
    // In a real app, this would be a database fetch
    setTimeout(() => {
      const mockData: LeaderboardEntry[] = [
        { rank: 1, name: "Aragorn", kingdom: "Gondor", points: 10500 },
        { rank: 2, name: "Elrond", kingdom: "Rivendell", points: 9800 },
        { rank: 3, name: "Galadriel", kingdom: "Lothlorien", points: 9200 },
        { rank: 4, name: "Theoden", kingdom: "Rohan", points: 8500 },
        { rank: 5, name: "Denethor", kingdom: "Minas Tirith", points: 7900 },
        { rank: 6, name: "Thranduil", kingdom: "Mirkwood", points: 7400 },
        { rank: 7, name: "Eowyn", kingdom: "Rohan", points: 6800 },
        { rank: 8, name: "Boromir", kingdom: "Gondor", points: 6300 },
        { rank: 9, name: "Faramir", kingdom: "Gondor", points: 5900 },
        { rank: 10, name: "Thorin", kingdom: "Erebor", points: 5500 },
      ];
      
      setLeaderboardEntries(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-neu-bg-light' : 'bg-neu-bg-dark'}`}>
      <div className="container mx-auto px-4 py-6">
        <Button 
          variant="outline" 
          className="mb-4 flex items-center gap-2" 
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={16} />
          Return to Kingdom
        </Button>
        
        <div className={`neu-card ${theme}`}>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Trophy className="w-8 h-8 text-amber-600 mr-3" />
              <h1 className="text-3xl font-bold">Kingdom Leaderboard</h1>
            </div>
            <Users className="w-6 h-6 text-muted-foreground" />
          </div>
          
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-pulse">
                <div className="h-14 w-14 rounded-full bg-neu-accent-primary"></div>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-amber-800/30">
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Rank</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Ruler</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Kingdom</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardEntries.map((entry) => (
                    <tr key={entry.rank} className="border-b border-amber-800/20 hover:bg-amber-900/5">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                            entry.rank === 1 ? 'bg-yellow-500/20 text-yellow-500' :
                            entry.rank === 2 ? 'bg-gray-300/20 text-gray-400' :
                            entry.rank === 3 ? 'bg-amber-700/20 text-amber-700' :
                            'bg-gray-100/10 text-muted-foreground'
                          }`}>
                            {entry.rank}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium">{entry.name}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm">{entry.kingdom}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        <div className="font-semibold">{entry.points.toLocaleString()}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
