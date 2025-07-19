import type React from "react";
import { useContext, useEffect } from "react";
import { BuildingsContext } from "../../contexts/BuildingsContext";
import type { BuildingsType } from "../../types";

const Buildings: React.FC = () => {
  const buildingsContext = useContext(BuildingsContext);
  const clickHandler = (building: BuildingsType) => {
    console.log("clickHandler", building);
    buildingsContext?.setSelectedBuilding(building);
  };

  useEffect(() => {
    console.log("Selected Buildings:", buildingsContext?.buildingTile);
  });
  return (
    <div className="buildings">
      <button
        disabled={buildingsContext?.selectedBuilding === "Command"}
        className={`building ${
          buildingsContext?.selectedBuilding === "Command" ? "selected" : ""
        }`}
        onClick={() => clickHandler("Command")}
      >
        Command
      </button>
      <button
        disabled={buildingsContext?.selectedBuilding === "Radar"}
        className={`building ${
          buildingsContext?.selectedBuilding === "Radar" ? "selected" : ""
        }`}
        onClick={() => clickHandler("Radar")}
      >
        Radar
      </button>
      <button
        disabled={buildingsContext?.selectedBuilding === "Hangar"}
        className={`building ${
          buildingsContext?.selectedBuilding === "Hangar" ? "selected" : ""
        }`}
        onClick={() => clickHandler("Hangar")}
      >
        Hangar
      </button>
      <button
        disabled={buildingsContext?.selectedBuilding === "Shield"}
        className={`building ${
          buildingsContext?.selectedBuilding === "Shield" ? "selected" : ""
        }`}
        onClick={() => clickHandler("Shield")}
      >
        Shield
      </button>
      <button
        disabled={buildingsContext?.selectedBuilding === "Power"}
        className={`building ${
          buildingsContext?.selectedBuilding === "Power" ? "selected" : ""
        }`}
        onClick={() => clickHandler("Power")}
      >
        Power
      </button>
      <button
        disabled={buildingsContext?.selectedBuilding === "Turret"}
        className={`building ${
          buildingsContext?.selectedBuilding === "Turret" ? "selected" : ""
        }`}
        onClick={() => clickHandler("Turret")}
      >
        Turret
      </button>
    </div>
  );
};

export default Buildings;
