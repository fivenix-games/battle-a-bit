import React, { type ActionDispatch } from "react";
import type { Action } from "./App";
export type TileType = {
  active: boolean;
};
export const GridMatrixContext = React.createContext<{
  gridMatrix: TileType[];
  setGridMatrix: ActionDispatch<[action: Action]>;
} | null>(null);
