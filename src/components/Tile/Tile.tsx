import { useContext, useEffect, useState, type ActionDispatch } from "react";
import { GridMatrixContext } from "../../contexts/GridMatrixContext";
import { PlanesContext } from "../../contexts/PlanesContext";
import type { PlanesActions } from "../../types";
import { TurnsContext } from "../../contexts/TurnsContext";
import { BuildingsContext } from "../../contexts/BuildingsContext";

const Tile = ({
  index,
  isActive,
  click,
}: {
  index: number;
  isActive: boolean;
  click: ActionDispatch<[action: PlanesActions]>;
}) => {
  const planesContext = useContext(PlanesContext);

  const gridContext = useContext(GridMatrixContext);

  const turnsContext = useContext(TurnsContext);

  const buildingsContext = useContext(BuildingsContext);

  const [attacker, setAttacker] = useState("");

  const [defender, setDefender] = useState("");

  useEffect(() => {
    setAttacker("");
    setDefender("");
  }, [turnsContext?.phase]);

  const clickHandler = () => {
    console.log("clickHandler", planesContext?.selectedPlane);

    if (turnsContext) {
      if (turnsContext.phase === "attack") {
        if (
          planesContext === null ||
          planesContext.selectedPlane === null ||
          planesContext.selectedPlane === undefined
        ) {
          alert("Please select a plane first!");
          return;
        } else if (
          planesContext.attacked[planesContext.selectedPlane!].attacked
        ) {
          alert("This plane has already attacked!");
          return;
        } else {
          setAttacker(planesContext.selectedPlane!);

          planesContext.setAttacked((prev) => ({
            ...prev,
            [planesContext.selectedPlane!]: {
              tile: index,
              attacked: true,
            },
          }));

          click({
            type: "attack",
            index,
            attackingPlane: planesContext.selectedPlane,
          });
        }
      } else if (turnsContext.phase === "defence") {
        console.log(buildingsContext?.buildingTile);
        if (
          buildingsContext === null ||
          buildingsContext.selectedBuilding === null
        ) {
          alert("Please select a building first!");
          return;
        } else if (
          buildingsContext.buildingTile &&
          (buildingsContext.buildingTile[buildingsContext.selectedBuilding] ??
            -1) > -1
        ) {
          alert("This building has already been placed!");
          return;
        } else {
          setDefender(buildingsContext.selectedBuilding);
          buildingsContext.setBuildingTile({
            type: "SET_BUILDING_TILE",
            payload: {
              building: buildingsContext.selectedBuilding,
              tile: index,
            },
          });
        }
      }
    }
  };

  return (
    <button
      className={isActive ? "tile active" : "tile"}
      onClick={clickHandler}
      disabled={
        (gridContext?.player === 1 && index < 30) ||
        (gridContext?.player === 2 && index > 29)
      }
    >
      {turnsContext?.phase === "attack"
        ? attacker.charAt(0).toUpperCase()
        : turnsContext?.phase === "defence"
        ? defender.charAt(0).toUpperCase()
        : null}
    </button>
  );
};

export default Tile;
