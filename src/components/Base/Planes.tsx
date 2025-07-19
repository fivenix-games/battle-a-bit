import type React from "react";
import { useContext } from "react";
import { PlanesContext } from "../../contexts/PlanesContext";

const Planes: React.FC = () => {
  const planesContext = useContext(PlanesContext);

  return (
    <div className="planes">
      <button
        disabled={planesContext?.attacked.Fighter.attacked}
        className={`${
          planesContext?.selectedPlane === "Fighter" ? "selected" : ""
        }`}
        onClick={() => clickHandler("Fighter")}
      >
        Fighter
      </button>
      <button
        disabled={planesContext?.attacked.Bomber.attacked}
        className={`${
          planesContext?.selectedPlane === "Bomber" ? "selected" : ""
        }`}
        onClick={() => clickHandler("Bomber")}
      >
        Bomber
      </button>
      <button
        disabled={planesContext?.attacked.Scout.attacked}
        className={`${
          planesContext?.selectedPlane === "Scout" ? "selected" : ""
        }`}
        onClick={() => clickHandler("Scout")}
      >
        Scout
      </button>
    </div>
  );

  function clickHandler(plane: "Fighter" | "Bomber" | "Scout") {
    planesContext?.setSelectedPlane(plane);
  }
};

export default Planes;
