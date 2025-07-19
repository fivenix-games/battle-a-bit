import { useContext, type PropsWithChildren } from "react";
import type React from "react";
import Tile from "../Tile/Tile";
import { GridMatrixContext } from "../../contexts/GridMatrixContext";

const Grid: React.FC<PropsWithChildren> = () => {
  const gridContext = useContext(GridMatrixContext);
  return (
    <div className="grid">
      {gridContext?.gridMatrix?.map((tile, index) => (
        <Tile
          index={index}
          isActive={tile.selected || tile.attacked || false}
          click={gridContext.setGridMatrix}
        />
      ))}
    </div>
  );
};

export default Grid;
