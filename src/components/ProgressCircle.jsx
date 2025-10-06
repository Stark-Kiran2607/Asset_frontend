import React from "react";

const ProgressCircle = ({ progress = 0.75, size = 40 }) => {
  const angle = progress * 360;

  const circleStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    background: `
      radial-gradient(circle, #f0f0f0 55%, transparent 56%),
      conic-gradient(#007bff 0deg ${angle}deg, #e9ecef ${angle}deg 360deg)
    `,
  };

  return <div style={circleStyle}></div>;
};

export default ProgressCircle;
