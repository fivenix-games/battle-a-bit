import type { BuildingsTile } from "../contexts/BuildingsContext";
import type { BuildingsType } from "../types";

export type BuildingsAction = {
  type: "SET_BUILDING_TILE" | "RESET_BUILDING_TILE";
  payload: {
    building: BuildingsType;
    tile: number;
  };
};

export const buildingsReducer = (
  state: BuildingsTile,
  action: BuildingsAction
) => {
  console.log("buildingsReducer", action);
  switch (action.type) {
    case "SET_BUILDING_TILE":
      // If the building already exists, we should not overwrite it
      if (state[action.payload.building] !== null) {
        console.warn(`Building ${action.payload.building} already exists.`);
        return state;
      } else {
        return {
          ...state,
          [action.payload.building]: action.payload.tile,
        };
      }
    case "RESET_BUILDING_TILE":
      return {
        Command: null,
        Radar: null,
        Hangar: null,
        Shield: null,
        Power: null,
        Turret: null,
      };
    default:
      return state;
  }
};
