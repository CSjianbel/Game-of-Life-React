import { useState, useEffect } from "react";

const getWindowDimensions = (dim) => {
  const { innerWidth: width, innerHeight: height } = window;
  const rows = Math.floor(Math.floor(height / dim) * 0.7);
  const cols = Math.floor(width / dim);
  return {
    rows,
    cols,
  };
};

export default getWindowDimensions;
