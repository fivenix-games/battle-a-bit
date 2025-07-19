import { gridInit } from "../initialValue";
import type { TileType, PlanesActions } from "../types";

export const gridReducer = (state: TileType[], action: PlanesActions) => {
  console.log("reducer", action);
  // if (action.type === "flip") {
  //   const newValue = { ...state[action.index] };
  //   newValue.selected = !newValue.selected;
  //   const newState = [...state];
  //   newState.splice(action.index, 1, newValue);
  //   return newState;
  // }
  if (action.type === "reset") {
    if (action.index) {
      const newValue = { ...state[action.index] };
      newValue.selected = false;
      const newState = [...state];
      newState.splice(action.index, 1, newValue);
      return newState;
    } else {
      return gridInit;
    }
  }
  if (action.type === "attack") {
    const newValue = { ...state[action.index] };
    newValue.attacked = true;
    newValue.attackingPlane = action.attackingPlane;
    const newState = [...state];
    newState.splice(action.index, 1, newValue);
    return newState;
  }

  return state;
};
