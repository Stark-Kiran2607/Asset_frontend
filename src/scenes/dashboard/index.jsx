import React from "react";
import { Download, PencilSquare, Bell } from "react-bootstrap-icons";

// Dummy data generators
const generateAssets = (count = 6) => {
  const categories = ["Laptop", "Monitor", "Phone", "Printer"];
  return Array.from({ length: count }, (_, i) => ({
    id: `A${i + 1}`,
    name: `Asset ${i + 1}`,
    category: categories[i % categories.length],
    status: ["Assigned", "Pending", "In Repair"][i % 3],
    location: ["HQ", "Branch A", "Branch B"][i % 3],
  }));
};

const generateRequests = (count = 5) => {
  const users = ["Alice", "Bob", "Charlie"];
  return Array.from({ length: count }, (_, i) => ({
    reqId: `R${i + 101}`,
    asset: `Asset ${i + 1}`,
    user: users[i % users.length],
    date: new Date(Date.now() - i * 86400000).toISOString().split("T")[0],
    status: ["Pending", "Completed", "In Progress"][i % 3],
  }));
};

const dummyAssets = generateAssets();
const dummyRequests = generateRequests();

const UserDashboard = () => {
  return (
    <div className="container-fluid p-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h4 fw-bold mb-0">User Dashboard</h1>
          <small className="text-muted">Overview of your assets and requests</small>
        </div>
        <button className="btn btn-primary d-flex align-items-center">
          <Download className="me-2" />
          Download Reports
        </button>
      </div>

      {/* TOP CARDS */}
      <div className="row g-4 mb-4">
        <div className="col-lg-3 col-md-6">
          <div className="card bg-dark text-white h-100 p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6>Total Assets</h6>
                <h3 className="fw-bold">{dummyAssets.length}</h3>
              </div>
              <PencilSquare size={32} />
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card bg-dark text-white h-100 p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6>Pending Requests</h6>
                <h3 className="fw-bold">
                  {dummyRequests.filter((r) => r.status === "Pending").length}
                </h3>
              </div>
              <Bell size={32} />
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card bg-dark text-white h-100 p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6>Completed Requests</h6>
                <h3 className="fw-bold">
                  {dummyRequests.filter((r) => r.status === "Completed").length}
                </h3>
              </div>
              <Download size={32} />
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card bg-dark text-white h-100 p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6>Assets In Repair</h6>
                <h3 className="fw-bold">
                  {dummyAssets.filter((a) => a.status === "In Repair").length}
                </h3>
              </div>
              <PencilSquare size={32} />
            </div>
          </div>
        </div>
      </div>

      {/* ASSETS TABLE */}
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card bg-dark text-white h-100">
            <div className="card-header border-bottom border-secondary">
              <h5 className="mb-0">My Assets</h5>
            </div>
            <div className="card-body p-0">
              <table className="table table-dark table-hover mb-0">
                <thead>
                  <tr>
                    <th>Asset ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyAssets.map((asset) => (
                    <tr key={asset.id}>
                      <td>{asset.id}</td>
                      <td>{asset.name}</td>
                      <td>{asset.category}</td>
                      <td>{asset.status}</td>
                      <td>{asset.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RECENT REQUESTS */}
        <div className="col-lg-4">
          <div className="card bg-dark text-white h-100 overflow-auto">
            <div className="card-header border-bottom border-secondary">
              <h5 className="mb-0">Recent Requests</h5>
            </div>
            <div className="card-body p-0">
              {dummyRequests.map((req, i) => (
                <div
                  key={`${req.reqId}-${i}`}
                  className="d-flex justify-content-between align-items-center p-3 border-bottom border-secondary"
                >
                  <div>
                    <h6 className="text-success mb-1">{req.reqId}</h6>
                    <small className="text-muted">{req.asset}</small>
                  </div>
                  <div>
                    <small className="text-muted">{req.date}</small>
                  </div>
                  <div className="badge bg-secondary">{req.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CHARTS / PLACEHOLDERS */}
      
    </div>
  );
};

export default UserDashboard;
