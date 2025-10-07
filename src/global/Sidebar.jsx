import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Offcanvas, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./index.css";

const SidebarItem = ({ title, to, iconClass, isCollapsed, closeOffcanvas }) => {
  const link = (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `nav-link d-flex align-items-center ${isActive ? "active text-warning bg-white" : "text-light"}`
      }
      onClick={closeOffcanvas}
    >
      <i className={`bi ${iconClass} me-2`}></i>
      {!isCollapsed && <span>{title}</span>}
    </NavLink>
  );

  return isCollapsed ? (
    <OverlayTrigger placement="right" overlay={<Tooltip>{title}</Tooltip>}>
      {link}
    </OverlayTrigger>
  ) : (
    link
  );
};

export default function Sidebar({ isOpen, setIsOpen }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const toggleDesktopCollapse = () => setIsCollapsed(!isCollapsed);
  const toggleOffcanvas = () => setShowOffcanvas(!showOffcanvas);

  const menuItems = [
    { title: "Dashboard", to: "/", iconClass: "bi-house-door" },
    { title: "Assets", to: "/brand", iconClass: "bi-tags" },
    { title: "Classification", to: "/classification", iconClass: "bi-diagram-3" },
    { title: "Asset Management", to: "/assetmanagement", iconClass: "bi-hdd-stack" },
    { title: "Asset Request List", to: "/requestlist", iconClass: "bi-question-circle" },
    { title: "User Management", to: "/usermanagement", iconClass: "bi-file-person"},
    { title: "User Dashboard", to: "/dashboard", iconClass: "bi-grid" },
    { title: "Asset Request", to: "/request", iconClass: "bi-journal-plus" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`sidebarContainer ${isCollapsed ? "collapsed" : ""} d-none d-md-block`}>
        <div className="p-2 d-flex justify-content-between align-items-center">
          <h5 className="text-light m-0">{!isCollapsed ? "Admin" : "A"}</h5>
          <Button variant="outline-light" size="sm" onClick={toggleDesktopCollapse}>
            {isCollapsed ? <i className="bi bi-arrow-bar-right"></i> : <i className="bi bi-arrow-bar-left"></i>}
          </Button>
        </div>

        {!isCollapsed && (
          <div className="profile">
            <img src="https://via.placeholder.com/100" alt="profile" width="80" height="80" />
            <h6>Ed Roh</h6>
            <small className="text-muted">VP Fancy Admin</small>
          </div>
        )}

        <Nav className="flex-column">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.title}
              title={item.title}
              to={item.to}
              iconClass={item.iconClass}
              isCollapsed={isCollapsed}
            />
          ))}
        </Nav>
      </div>

      {/* Mobile Topbar & Offcanvas */}
      <Navbar bg="dark" variant="dark" className="d-md-none">
        <Button variant="outline-light" onClick={toggleOffcanvas} className="ms-2">
          ☰
        </Button>
      </Navbar>

      <Offcanvas show={showOffcanvas} onHide={toggleOffcanvas} className="bg-dark text-white">
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.title}
                title={item.title}
                to={item.to}
                iconClass={item.iconClass}
                isCollapsed={false} // always expanded in mobile offcanvas
                closeOffcanvas={() => setShowOffcanvas(false)}
              />
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
