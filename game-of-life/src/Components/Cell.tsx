import React, { useState } from "react";

interface cell {
  row: number;
  column: number;
  dimension: number;
  state: boolean;
}

const mouseInCell = (
  cellX: number,
  cellY: number,
  dim: number,
  mouseX: number,
  mouseY: number
): boolean => {
  console.log(cellX, cellY, mouseX, mouseY);
  return mouseX >= cellX &&
    mouseX < cellX + dim &&
    mouseY >= cellY &&
    mouseY < cellY + dim
    ? true
    : false;
};

const Cell = ({ row, column, dimension, state }: cell) => {
  const posX = column * dimension;
  const posY = row * dimension;

  const [status, setStatus] = useState(state ? "black" : "white");

  const clickedCell = (e: React.MouseEvent) => {
    if (e.type === "click") {
      if (
        mouseInCell(
          posX,
          posY,
          dimension,
          // e.nativeEvent.offsetX,
          // e.nativeEvent.offsetY
          e.clientX,
          e.clientY
        )
      ) {
        setStatus(status === "black" ? "white" : "black");
      }
    }
  };

  return (
    <div
      style={{
        width: `${dimension}px`,
        height: `${dimension}px`,
        backgroundColor: status,
        border: "solid 1px black",
      }}
      onMouseMove={clickedCell}
    ></div>
  );
};

export default Cell;
