import { useState, useEffect } from "react";

const getWindowDimensions = (dim) => {
  const { innerWidth: width, innerHeight: height } = window;
  const rows = Math.floor(Math.floor(height / dim) * 0.65);
  const cols = Math.floor(Math.floor(width / dim) * 0.95);
  return {
    rows,
    cols,
  };
};

export default getWindowDimensions;
