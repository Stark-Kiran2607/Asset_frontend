import React from "react";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress = 0.75, increase }) => {
  return (
    <div className="card text-white bg-dark mb-3" style={{ width: "100%" }}>
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          {icon && <div className="mb-2">{icon}</div>}
          <h4 className="card-title mb-1">{title}</h4>
        </div>
        <div>
          <ProgressCircle progress={progress} size={50} />
        </div>
      </div>
      <div className="d-flex justify-content-between mt-2 px-3">
        <h6 className="mb-0 text-success">{subtitle}</h6>
        <h6 className="mb-0 text-success fst-italic">{increase}</h6>
      </div>
    </div>
  );
};

export default StatBox;
