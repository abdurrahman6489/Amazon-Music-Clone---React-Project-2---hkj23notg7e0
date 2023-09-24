import React from "react";
import "./CircularLoader.css";
const CircularLoader = ({ size }) => {
  return <div class="loader" style={{ width: `${size}px` }}></div>;
};

export default CircularLoader;
