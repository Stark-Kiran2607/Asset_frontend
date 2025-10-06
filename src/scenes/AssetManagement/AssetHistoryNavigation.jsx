import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const AssetHistoryNavigation = () => {
  return (
    <div className="my-3">
      <ButtonGroup>
        <NavLink to="" end>
          {({ isActive }) => (
            <Button variant={isActive ? "primary" : "outline-primary"} className="me-2">
              Maintenance History
            </Button>
          )}
        </NavLink>

        <NavLink to="assignedhistory">
          {({ isActive }) => (
            <Button variant={isActive ? "primary" : "outline-primary"} className="me-2">
              Assigned History
            </Button>
          )}
        </NavLink>
      </ButtonGroup>
    </div>
  );
};
