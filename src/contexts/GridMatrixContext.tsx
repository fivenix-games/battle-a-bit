import React, { type ActionDispatch } from "react";
import type { PlanesActions, Player, TileType } from "../types";

export const GridMatrixContext = React.createContext<{
  gridMatrix: TileType[];
  setGridMatrix: ActionDispatch<[action: PlanesActions]>;
  player: Player;
  endPhase: () => void;
} | null>(null);
