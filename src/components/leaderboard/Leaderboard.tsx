import React from "react";
import { Trophy, Crown, Medal, Star, Award } from "lucide-react";

interface Player {
  id: string;
  name: string;
  rank: number;
  score: number;
  territory: number;
  population: number;
  military: number;
  achievements: number;
  status: "online" | "offline";
}

interface LeaderboardProps {
  players: Player[];
  currentPlayerId: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ players, currentPlayerId }) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return Crown;
      case 2:
        return Trophy;
      case 3:
        return Medal;
      default:
        return Star;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-amber-500";
      case 2:
        return "text-gray-400";
      case 3:
        return "text-amber-700";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="mb-6 px-4 py-3 rounded-xl bg-amber-50/30 dark:bg-amber-950/20 backdrop-blur-sm shadow-lg border border-amber-200/30 dark:border-amber-800/30">
      <h2 className="text-3xl font-bold mb-4 flex items-center pb-3 border-b border-amber-800/20">
        <Trophy className="w-8 h-8 mr-3 text-amber-600 drop-shadow-md" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-800 dark:from-amber-400 dark:to-amber-600 drop-shadow-sm">
          Leaderboard
        </span>
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-muted-foreground border-b border-amber-800/20">
              <th className="py-2 px-4">Rank</th>
              <th className="py-2 px-4">Player</th>
              <th className="py-2 px-4">Score</th>
              <th className="py-2 px-4">Territory</th>
              <th className="py-2 px-4">Population</th>
              <th className="py-2 px-4">Military</th>
              <th className="py-2 px-4">Achievements</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => {
              const RankIcon = getRankIcon(player.rank);
              const isCurrentPlayer = player.id === currentPlayerId;
              
              return (
                <tr
                  key={player.id}
                  className={`border-b border-amber-800/10 hover:bg-amber-900/5 ${
                    isCurrentPlayer ? "bg-amber-900/10" : ""
                  }`}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      {player.rank <= 3 ? (
                        <RankIcon className={`w-5 h-5 mr-2 ${getRankColor(player.rank)}`} />
                      ) : null}
                      <span className="font-medium">{player.rank}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className="font-medium">{player.name}</span>
                      {isCurrentPlayer && (
                        <span className="ml-2 text-xs bg-amber-600 text-white px-2 py-0.5 rounded-full">
                          You
                        </span>
                      )}
                      <span
                        className={`ml-2 w-2 h-2 rounded-full ${
                          player.status === "online" ? "bg-green-500" : "bg-gray-400"
                        }`}
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-amber-600" />
                      <span>{player.score.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{player.territory.toLocaleString()} km²</td>
                  <td className="py-3 px-4">{player.population.toLocaleString()}</td>
                  <td className="py-3 px-4">{player.military.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-1 text-amber-600" />
                      <span>{player.achievements}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard; 