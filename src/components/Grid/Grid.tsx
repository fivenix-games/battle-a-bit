import { useContext, type PropsWithChildren } from "react";
import type React from "react";
import Tile from "../Tile/Tile";
import { GridMatrixContext } from "../../GridMatrixContext";

const Grid: React.FC<PropsWithChildren> = () => {
  const gridContext = useContext(GridMatrixContext);
  return (
    <div className="grid">
      {gridContext?.gridMatrix?.map((g, index) => (
        <Tile
          index={index}
          isActive={g.active}
          click={gridContext.setGridMatrix}
        />
      ))}
    </div>
  );
};

export default Grid;
