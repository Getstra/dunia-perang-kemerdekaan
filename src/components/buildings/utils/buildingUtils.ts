
import { Building, Resources } from "../../../utils/types";

// Helper to check if we have enough resources to build
export const canBuild = (building: Building, resources: Resources): boolean => {
  if (building.cost.gold && resources.gold < building.cost.gold) return false;
  if (building.cost.wood && resources.wood < building.cost.wood) return false;
  if (building.cost.stone && resources.stone < building.cost.stone) return false;
  if (building.cost.food && resources.food < building.cost.food) return false;
  return true;
};

// Format time remaining
export const formatTimeRemaining = (completionTime: number | undefined): string => {
  if (!completionTime) return "0m";

  const now = Date.now();
  const remaining = Math.max(0, completionTime - now);
  const minutes = Math.floor(remaining / (1000 * 60));

  if (minutes < 1) return "Completing...";
  return `${minutes}m remaining`;
};

// Calculate completion percentage
export const calculateProgress = (building: Building): number => {
  if (!building.completionTime || building.completed) return 100;

  const now = Date.now();
  const totalTime = building.constructionTime * 60 * 1000; // Convert minutes to ms
  const elapsedTime = now - (building.completionTime - totalTime);

  return Math.min(100, Math.max(0, (elapsedTime / totalTime) * 100));
};
