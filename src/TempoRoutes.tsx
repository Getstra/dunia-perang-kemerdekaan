import { useRoutes } from "react-router-dom";
import routes from "tempo-routes";

export function TempoRoutes() {
  return import.meta.env.VITE_TEMPO ? useRoutes(routes) : null;
}
