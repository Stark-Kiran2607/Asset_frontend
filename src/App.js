import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";


import Sidebar from "./global/Sidebar";
import EmployeeSidebar from "./global/EmployeeSidebar";
import Topbar from "./global/Topbar";


import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignOut";
import AdminDashboard from "./scenes/AdminDashboard/AdminDashboard";
import Brand from "./scenes/Brand/Brand";
import Classification from "./scenes/classification/classification";
import AssetManagement from "./scenes/AssetManagement/AssetManagement";
import UserManagement from "./scenes/usermanagement/UserManagement";
import EmployeeDashboard from "./scenes/EmployeDashboard/EmployeeDashboard";


import "./scenes/users";


const PrivateRoute = ({ children, role }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!isLoggedIn || !currentUser) return <Navigate to="/SignIn" />;
  if (role && currentUser.role !== role) return <Navigate to="/unauthorized" />;

  return children;
};

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn") === "true";
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (loginStatus && user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
    }
  }, []);

  if (!isLoggedIn || !currentUser) {
    return (
      <Router>
        <Routes>
          <Route path="/SignIn" element={<SignIn onLogin={() => window.location.reload()} />} />
          <Route path="*" element={<Navigate to="/SignIn" />} />
        </Routes>
      </Router>
    );
  }


  return (
    <Router>
      <Topbar setIsSidebar={setIsSidebarCollapsed} />
      <div className="d-flex">
        {currentUser.role === "admin" ? (
          <Sidebar isOpen={!isSidebarCollapsed} setIsOpen={setIsSidebarCollapsed} />
        ) : (
          <EmployeeSidebar isOpen={!isSidebarCollapsed} setIsOpen={setIsSidebarCollapsed} />
        )}

        <div
          className="flex-grow-1"
          style={{
            marginLeft: isSidebarCollapsed ? "80px" : "250px",
            transition: "margin-left 0.3s ease",
            padding: "20px",
          }}
        >
          <Routes>
            {/* Admin Routes */}
            <Route
              path="/"
              element={
                <PrivateRoute role="admin">
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/brand"
              element={
                <PrivateRoute role="admin">
                  <Brand />
                </PrivateRoute>
              }
            />
            <Route
              path="/classification"
              element={
                <PrivateRoute role="admin">
                  <Classification />
                </PrivateRoute>
              }
            />
            <Route
              path="/assetmanagement"
              element={
                <PrivateRoute role="admin">
                  <AssetManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/usermanagement"
              element={
                <PrivateRoute role="admin">
                  <UserManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/EmployeeDashboard/:employeeId"
              element={
                <PrivateRoute role="admin">
                  <EmployeeDashboard />
                </PrivateRoute>
              }
          />


            {/* Employee Routes */}
            <Route
              path="/EmployeeDashboard"
              element={
                <PrivateRoute role="employee">
                  <EmployeeDashboard />
                </PrivateRoute>
              }
            />

            {/* SignOut */}
            <Route path="/signout" element={<SignOut />} />

            {/* Default redirect */}
            <Route
              path="*"
              element={
                currentUser.role === "admin" ? (
                  <Navigate to="/" />
                ) : (
                  <Navigate to="/EmployeeDashboard" />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
