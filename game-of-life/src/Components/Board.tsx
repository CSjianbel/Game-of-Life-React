import React, { useState } from "react";
import Cell from "./Cell";

interface Dimension {
  width: number;
  height: number;
}

interface cellAttr {
  row: number;
  col: number;
  dimension: number;
  state: boolean;
}

const createCell = ({ row, col, dimension, state }: cellAttr) => {
  return <Cell row={row} column={col} dimension={dimension} state={state} />;
};

const Board = ({ width, height }: Dimension) => {
  const dimension = 20;
  const rows = Math.floor(height / dimension);
  const cols = Math.floor(width / dimension);

  let initBoard: JSX.Element[][] = [];
  for (let i = 0; i < rows; i++) {
    initBoard.push([]);
    for (let j = 0; j < cols; j++) {
      initBoard[i].push(
        createCell({
          row: i,
          col: j,
          dimension: dimension,
          state: false,
        })
      );
    }
  }

  const [board, setBoard] = useState(initBoard);

  const randomBoard = () => {
    const prob: number = Math.random();
    let newBoard: JSX.Element[][] = [...board];

    let t = 0,
      f = 0;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let s = Math.random() < prob ? true : false;
        newBoard[i][j] = createCell({
          row: i,
          col: j,
          dimension: dimension,
          state: s,
        });
        if (s) t++;
        else f++;
      }
    }

    console.log(t, f);
    setBoard(newBoard);
  };

  return (
    <>
      <div id="board">
        {board.map((row, i) => {
          return (
            <div key={i} className="row">
              {row}
            </div>
          );
        })}
      </div>
      <button onClick={randomBoard}>Create Random Board</button>
    </>
  );
};

export default Board;
