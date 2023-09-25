import React from "react";
import "./CircularLoader.css";
const CircularLoader = ({ size }) => {
  const DEFAULT_SIZE = 18;
  return (
    <div class="loader" style={{ width: `${size || DEFAULT_SIZE}px` }}></div>
  );
};

export default CircularLoader;
