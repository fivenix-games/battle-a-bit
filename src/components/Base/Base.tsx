import type React from "react";
import { useContext } from "react";
import { GridMatrixContext } from "../../contexts/GridMatrixContext";
import Planes from "./Planes";
import type { Player } from "../../types";
import Buildings from "./Buildings";
import { TurnsContext } from "../../contexts/TurnsContext";

const Base: React.FC<{ playerName: Player }> = (props) => {
  const gridContext = useContext(GridMatrixContext);
  const turnsContext = useContext(TurnsContext);
  return (
    <div
      className={`base-container ${
        props.playerName === 1 ? "player1" : "player2"
      }`}
    >
      <div className="base">
        <div>
          Player {props.playerName} |{" "}
          {gridContext?.player === props.playerName ? "attack" : "defense"}
        </div>
        <div>
          <button onClick={gridContext?.endPhase}>{turnsContext?.phase}</button>
        </div>
      </div>
      {turnsContext?.phase &&
        (turnsContext?.phase === "attack" ? (
          <div>
            <Planes />
          </div>
        ) : (
          <div>
            <Buildings />
          </div>
        ))}
    </div>
  );
};

export default Base;
