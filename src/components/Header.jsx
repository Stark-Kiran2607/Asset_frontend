import React from "react";

const Header = ({ title, subtitle }) => {
  return (
    <div className="mb-3">
      <h4 className="fw-bold mt-4 mb-1">{title}</h4>
      <h5 className="text-success">{subtitle}</h5>
    </div>
  );
};

export default Header;
