import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";

const AssignedAssets = ({ userId }) => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    // Get all assets from localStorage
    const allAssets = JSON.parse(localStorage.getItem("assets")) || [];
    const userAssets = allAssets.filter(a => a.assignedTo === userId);
    setAssets(userAssets);
  }, [userId]);

  const handleReturn = (assetId) => {
    const updatedAssets = assets.map(a => {
      if (a.id === assetId) return { ...a, status: "returned" };
      return a;
    });
    setAssets(updatedAssets);

    // Update localStorage
    const allAssets = JSON.parse(localStorage.getItem("assets")) || [];
    const updatedAllAssets = allAssets.map(a => {
      if (a.id === assetId) return { ...a, status: "returned" };
      return a;
    });
    localStorage.setItem("assets", JSON.stringify(updatedAllAssets));
  };

  return (
    <div className="mt-4">
      <h4>Your Assigned Assets</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Asset ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.name}</td>
              <td>{a.status}</td>
              <td>
                {a.status === "in use" && (
                  <Button size="sm" onClick={() => handleReturn(a.id)}>
                    Return
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AssignedAssets;
