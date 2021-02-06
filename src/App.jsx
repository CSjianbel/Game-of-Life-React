import React, { useState, useCallback, useRef } from "react";
import { produce } from "immer";
import useWindowDimensions from "./Components/windowDimensions";

const initializeBoard = (rows, cols) => {
  const initBoard = [];
  for (let i = 0; i < rows; i++) {
    initBoard.push(Array.from(Array(cols), () => false));
  }
  return initBoard;
};

const App = () => {
  const dimension = 20;
  const { rows, cols } = useWindowDimensions(dimension);

  const [simulating, setSimulating] = useState(false);
  const [board, setBoard] = useState(initializeBoard(rows, cols));
  const [mouseDown, setMouseDown] = useState(false);

  const simulatingRef = useRef(simulating);
  simulatingRef.current = simulating;

  const runSimulation = useCallback(() => {
    const countNeighbors = (b, y, x) => {
      let count = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          // skip the middle cell
          if (!i && !j) continue;
          // offsets
          const oY = y + i;
          const oX = x + j;
          // watch for edge cases
          if (oY >= 0 && oY < rows && oX >= 0 && oX < cols && b[oY][oX])
            count++;
        }
      }
      return count;
    };

    if (!simulatingRef.current) return;
    setBoard((b) => {
      return produce(b, (boardCopy) => {
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            const neighbors = countNeighbors(b, i, j);
            if (!b[i][j] && neighbors === 3) {
              boardCopy[i][j] = true;
            } else if (neighbors < 2 || neighbors > 3) {
              boardCopy[i][j] = false;
            }
          }
        }
        return boardCopy;
      });
    });

    setTimeout(runSimulation, 10);
  }, [cols, rows]);

  const modifyBoard = (i, j) => {
    const newBoard = produce(board, (boardCopy) => {
      boardCopy[i][j] = !board[i][j];
    });
    setBoard(newBoard);
  };

  const generateRandomBoard = (e, prob = Math.random()) => {
    setBoard((b) => {
      return produce(b, (boardCopy) => {
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            boardCopy[i][j] = Math.random() < prob ? true : false;
          }
        }
        return boardCopy;
      });
    });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        padding: "50px",
        paddingBottom: 0,
      }}
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
    >
      <h1 style={{ position: "relative", top: "-20px" }}>
        Ojou Nii Sama - Conway's Game of Life
      </h1>
      <div
        className="board"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, ${dimension}px)`,
        }}
      >
        {board.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => modifyBoard(i, j)}
              onMouseOver={(e) => {
                if (!mouseDown) return;
                if (
                  e.nativeEvent.offsetX >= 0 &&
                  e.nativeEvent.offsetX < dimension &&
                  e.nativeEvent.offsetY >= 0 &&
                  e.nativeEvent.offsetY < dimension
                ) {
                  modifyBoard(i, j);
                }
              }}
              style={{
                width: dimension,
                height: dimension,
                backgroundColor: board[i][j] ? "black" : "white",
                border: "solid 1px black",
              }}
            ></div>
          ))
        )}
      </div>
      <div className="dashboard">
        <button
          className="btn"
          onClick={() => setBoard(initializeBoard(rows, cols))}
        >
          Clear Board
        </button>
        <button
          className="btn"
          onClick={() => {
            setSimulating(!simulating);
            if (!simulating) {
              simulatingRef.current = true;
              runSimulation();
            }
          }}
        >
          {`${simulating ? "Stop" : "Start"} Simulation`}
        </button>
        <button className="btn" onClick={generateRandomBoard}>
          Generate Random Board
        </button>
      </div>
    </div>
  );
};

export default App;
