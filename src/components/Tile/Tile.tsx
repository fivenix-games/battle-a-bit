import type { ActionDispatch } from "react";
import type { Action } from "../../App";

const Tile = ({
  index,
  isActive,
  click,
}: {
  index: number;
  isActive: boolean;
  click: ActionDispatch<[action: Action]>;
}) => {
  return (
    <button
      className={isActive ? "tile active" : "tile"}
      onClick={() => click({ type: "flip", index })}
    >
      {isActive ? "A" : "I"}
    </button>
  );
};
export default Tile;
