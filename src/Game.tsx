import { useContext, useEffect, useReducer, useState } from "react";
import "./App.css";
import Base from "./components/Base/Base";
import Grid from "./components/Grid/Grid";
import {
    BuildingsContext,
    type BuildingsTile,
} from "./contexts/BuildingsContext";
import { GridMatrixContext } from "./contexts/GridMatrixContext";
import { PlanesContext } from "./contexts/PlanesContext";
import { TurnsContext } from "./contexts/TurnsContext";
import { gridInit } from "./initialValue";
import {
    buildingsReducer,
    type BuildingsAction
} from "./reducers/buildingsReducer";
import { gridReducer } from "./reducers/gridReducer";
import type {
    AttackType,
    BuildingsType,
    PlanesActions,
    PlanesType,
    Player,
    TileType,
} from "./types";

function Game() {
  const turnsContext = useContext(TurnsContext);
  const [player, setPlayer] = useState<Player>(1);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [seconds, setSeconds] = useState(30);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isRunning, setIsRunning] = useState(false);

  const [gridMatrix, setGridMatrix] = useReducer<
    TileType[],
    [action: PlanesActions]
  >(gridReducer, gridInit);

  const [selectedPlane, setSelectedPlane] = useState<PlanesType | null>(null);

  const [attacked, setAttacked] = useState<AttackType>({
    Fighter: { tile: undefined, attacked: false },
    Bomber: { tile: undefined, attacked: false },
    Scout: { tile: undefined, attacked: false },
  });

  const endPhase = () => {
    setTimeout(() => {
      setPlayer((prev) => {
        if (prev === 1) return 2;
        if (prev === 2) return 1;
        return prev;
      });

      setGridMatrix({ type: "reset" });

      setSelectedPlane(null);

      setAttacked({
        Fighter: { tile: undefined, attacked: false },
        Bomber: { tile: undefined, attacked: false },
        Scout: { tile: undefined, attacked: false },
      });

      setIsRunning(false);

      setSeconds(30);

      turnsContext?.setPhase(
        turnsContext?.phase === "attack" ? "defence" : "attack"
      );

      console.log("endPhase", player);
    }, 500);
  };

//   const resetBoard = () => {
//     setGridMatrix({ type: "reset" });

//     setPlayer(1);

//     setIsRunning(false);

//     setSeconds(30);
//   };

  useEffect(() => {
    console.log("player", player);
  });

  useEffect(() => {
    console.log("selectedPlane", selectedPlane);
  }, [selectedPlane]);

  const [selectedBuilding, setSelectedBuilding] =
    useState<BuildingsType | null>(null);

  const [buildingTile, setBuildingTile] = useReducer<
    BuildingsTile,
    [actions: BuildingsAction]
  >(buildingsReducer, {
    Command: null,
    Radar: null,
    Hangar: null,
    Shield: null,
    Power: null,
    Turret: null,
  });
  return (
    // add buildings context
    <BuildingsContext.Provider
      value={{
        selectedBuilding,
        setSelectedBuilding,
        buildingTile,
        setBuildingTile,
      }}
    >
      <PlanesContext.Provider
        value={{ selectedPlane, setSelectedPlane, attacked, setAttacked }}
      >
        <GridMatrixContext.Provider
          value={{ gridMatrix, setGridMatrix, endPhase, player }}
        >
          <div className="game absolute">
            <div className="absolute">
              {/* <div>
              <div className="timer">{seconds}</div>
            </div> */}
              <Base playerName={1} />

              <Grid />
            </div>
          </div>
        </GridMatrixContext.Provider>
      </PlanesContext.Provider>
    </BuildingsContext.Provider>
  );
}

export default Game;

// TODO: add timer functionality
// useEffect(() => {
//   let intervalId: NodeJS.Timeout;
//
//   if (isRunning && seconds > 0) {
//     intervalId = setInterval(() => {
//       setSeconds((prevSeconds) => prevSeconds - 1);
//     }, 1000); // Decrement every second
//   } else if (seconds === 0) {
//     // Handle timer completion, e.g., display a message
//     console.log("Timer finished!");
//     setIsRunning(false); // Stop the timer
//   }
//
//   // Cleanup function to clear the interval when the component unmounts or dependencies change
//   return () => clearInterval(intervalId);
// }, [isRunning, seconds]);
