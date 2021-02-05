import React, { useState } from "react";

interface cell {
  row: Number;
  column: Number;
  dimension: string;
  state: Boolean;
}

const Cell = ({ row, column, dimension, state }: cell) => {
  const [status, setStatus] = useState(state ? "black" : "white");

  const clickedCell = () => {
    setStatus(status === "black" ? "white" : "black");
  };

  return (
    <div
      style={{
        width: dimension,
        height: dimension,
        backgroundColor: status,
        border: "solid 1px black",
      }}
      onClick={clickedCell}
    ></div>
  );
};

export default Cell;
