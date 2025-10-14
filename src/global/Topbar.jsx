import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const Topbar = ({ setIsSidebar, isSidebarCollapsed }) => {
  const toggleSidebar = () => {
    setIsSidebar(!isSidebarCollapsed);
  };

  return (
    <Navbar
      expand={false}
      bg="light"
      style={{ position: "sticky", top: 0, zIndex: 1030, height: "55px"}}
      className="shadow-sm"
    >
      <Container fluid className="d-flex justify-content-between align-items-center px-2">
        {/* Collapse toggle button */}
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={toggleSidebar}
          className="me-2 d-flex align-items-center justify-content-center p-1"
          style={{ fontSize: "0.9rem", minWidth: "35px" }}
        >
          {isSidebarCollapsed ? (
            <i className="bi bi-arrow-bar-right"></i>
          ) : (
            <i className="bi bi-arrow-bar-left"></i>
          )}
        </Button>

        {/* Right side icons */}
        <div className="d-flex align-items-center gap-3">
          <Button variant="link" className="text-dark p-1 d-flex align-items-center justify-content-center">
            <i className="bi bi-bell-fill" style={{ fontSize: "1.1rem" }}></i>
          </Button>
          <Button variant="link" className="text-dark p-1 d-flex align-items-center justify-content-center">
            <i className="bi bi-person-fill" style={{ fontSize: "1.1rem" }}></i>
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};


export default Topbar;
