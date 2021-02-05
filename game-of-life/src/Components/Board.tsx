import React, { useState } from "react";
import Cell from "./Cell";

interface Dimension {
  width: number;
  height: number;
}

interface cellAttr {
  row: number;
  col: number;
  dimension: string;
  state: boolean;
}

const createCell = ({ row, col, dimension, state }: cellAttr) => {
  return <Cell row={row} column={col} dimension={dimension} state={state} />;
};

const Board = ({ width, height }: Dimension) => {
  const dimension = 20;
  const rows = Math.floor(height / dimension);
  const cols = Math.floor(width / dimension);

  let tmpBoard: JSX.Element[][] = [];
  for (let i = 0; i < rows; i++) {
    tmpBoard.push([]);
    for (let j = 0; j < cols; j++) {
      tmpBoard[i].push(
        createCell({
          row: i,
          col: j,
          dimension: dimension.toString() + "px",
          state: false,
        })
      );
    }
  }

  const [board, setBoard] = useState(tmpBoard);

  const randomBoard = () => {
    const prob: number = Math.random();
    let tmp: JSX.Element[][] = [];
    for (let i = 0; i < rows; i++) {
      tmp.push([]);
      for (let j = 0; j < cols; j++) {
        tmp[i].push(
          createCell({
            row: i,
            col: j,
            dimension: dimension.toString() + "px",
            state: Math.random() < prob ? true : false,
          })
        );
      }
    }
    setBoard(tmp);
  };

  return (
    <>
      <div id="board">
        {board.map((row, i) => {
          return (
            <div className="row">
              {row.map((cell) => {
                return cell;
              })}
            </div>
          );
        })}
      </div>
      <button onClick={randomBoard}>Create Random Board</button>
    </>
  );
};

export default Board;
