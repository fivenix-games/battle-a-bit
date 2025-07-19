import React, { type ActionDispatch } from "react";
import type { BuildingsType } from "../types";
import type { BuildingsAction } from "../reducers/buildingsReducer";
export type BuildingsTile = Record<BuildingsType, number | null>;

export const BuildingsContext = React.createContext<{
  selectedBuilding: BuildingsType | null;
  setSelectedBuilding: React.Dispatch<
    React.SetStateAction<BuildingsType | null>
  >;
  buildingTile: BuildingsTile | null;
  setBuildingTile: ActionDispatch<[actions: BuildingsAction]>;
} | null>(null);
