import { useReducer } from "react";
import "./App.css";
import Grid from "./components/Grid/Grid";
import { GridMatrixContext, type TileType } from "./GridMatrixContext";
import { gridInit } from "./initialValue";
import Base from "./components/Base/Base";

export type Action =
  | {
      type: "flip";
      index: number;
    }
  | {
      type: "reset";
      index?: number;
    };

const reducer = (state: TileType[], action: Action) => {
  if (action.type === "flip") {
    const newValue = { ...state[action.index] };
    newValue.active = !newValue.active;
    const newState = [...state];
    newState.splice(action.index, 1, newValue);
    return newState;
  }
  if (action.type === "reset") {
    if (action.index) {
      const newValue = { ...state[action.index] };
      newValue.active = false;
      const newState = [...state];
      newState.splice(action.index, 1, newValue);
      return newState;
    } else {
      return gridInit;
    }
  }
  return state;
};
function App() {
  const [gridMatrix, setGridMatrix] = useReducer<TileType[], [action: Action]>(
    reducer,
    gridInit
  );

  return (
    <GridMatrixContext.Provider value={{ gridMatrix, setGridMatrix }}>
      <div className="game">
        <button onClick={() => setGridMatrix({ type: "reset" })}>Reset</button>
        <Base playerName="Player 1" />
        <Grid />
        <Base playerName="Player 2" />
      </div>
    </GridMatrixContext.Provider>
  );
}

export default App;
