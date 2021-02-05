import React, { useState } from "react";
import Board from "./Components/Board";

interface Dimension {
  w: number;
  h: number;
}

const getWindowDimension = (): Dimension => {
  const { innerWidth: w, innerHeight: h } = window;
  return {
    w,
    h,
  };
};

const App = () => {
  const { w, h } = getWindowDimension();
  const [width, setWidth] = useState(w);
  const [height, setHeight] = useState(h * 0.7);

  return <Board width={width} height={height} />;
};

export default App;
