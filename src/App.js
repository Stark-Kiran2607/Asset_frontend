import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Pages & Components
import SignIn from "./pages/SignIn";
import Sidebar from "./global/Sidebar";
import Topbar from "./global/Topbar";
import AdminDashboard from "./scenes/AdminDashboard/AdminDashboard";
import Brand from "./scenes/Brand/Brand";
import Classification from "./scenes/classification/classification";
import AssetManagement from "./scenes/AssetManagement/AssetManagement";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Check login status on load
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn) setIsLoggedIn(true);
  }, []);

  const handleLogin = (status) => {
    localStorage.setItem("isLoggedIn", status ? "true" : "false");
    setIsLoggedIn(status);
  };

  return (
    <Router>
      {isLoggedIn ? (
        <div>
          {/* Topbar */}
          <Topbar setIsSidebar={setIsSidebarCollapsed} />

          {/* Layout */}
          <div className="d-flex">
            <Sidebar isOpen={!isSidebarCollapsed} setIsOpen={setIsSidebarCollapsed} />

            {/* Main Content */}
            <div
              className="flex-grow-1"
              style={{
                marginLeft: isSidebarCollapsed ? "80px" : "250px",
                transition: "margin-left 0.3s ease",
                padding: "20px",
              }}
            >
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/brand" element={<Brand />} />
                <Route path="/classification" element={<Classification />} />
                <Route path="/assetmanagement" element={<AssetManagement />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          {/* Redirect all routes to SignIn if not logged in */}
          <Route path="*" element={<SignIn onLogin={handleLogin} />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
