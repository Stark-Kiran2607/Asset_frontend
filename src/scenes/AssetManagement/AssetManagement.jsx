import React, { useState } from "react";
import { Table, Button, Pagination } from "react-bootstrap";
import { PlusSquare, ClockHistory } from "react-bootstrap-icons";
import NewAssetForm from "./NewAssetForm";
import AssignReAssign from "./AssignReAssign";

const AssetManagement = () => {
  // Dummy data
  const dummyAssets = [
    { id: 1, assetName: "Laptop 1", category: "Laptop", brand: "DELL", currentStage: "Available", assigned: "" },
    { id: 2, assetName: "Laptop 2", category: "Laptop", brand: "HP", currentStage: "Available", assigned: "" },
    { id: 3, assetName: "Mouse", category: "Accessory", brand: "LOGITECH", currentStage: "Available", assigned: "" },
    { id: 4, assetName: "iPhone", category: "Phone", brand: "APPLE", currentStage: "In Use", assigned: "Alice" },
    { id: 5, assetName: "Monitor", category: "Display", brand: "SAMSUNG", currentStage: "Available", assigned: "" },
  ];

  const [assets, setAssets] = useState(dummyAssets);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showReAssignModal, setShowReAssignModal] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(assets.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAssets = assets.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handlers
  const handleAddClose = (newAsset) => {
    setShowAddModal(false);
    if (newAsset) setAssets([...assets, newAsset]);
  };

  const handleAssignClose = (updatedAsset) => {
    setShowAssignModal(false);
    setShowReAssignModal(false);
    setEditingAsset(null);
    if (updatedAsset) {
      setAssets(assets.map((a) => (a.id === updatedAsset.id ? updatedAsset : a)));
    }
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Asset Management</h3>
        <Button variant="dark" onClick={() => setShowAddModal(true)}>
          <PlusSquare className="me-2" /> New Asset
        </Button>
      </div>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th>Asset ID</th>
              <th>Asset Name</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Current Stage</th>
              <th>Assigned To</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentAssets.map((asset) => (
              <tr key={asset.id}>
                <td>{asset.id}</td>
                <td>{asset.assetName}</td>
                <td>{asset.category}</td>
                <td>{asset.brand}</td>
                <td>{asset.currentStage}</td>
                <td>{asset.assigned || "-"}</td>
                <td>
                  {(asset.brand.toLowerCase() === "dell" ||
                    asset.brand.toLowerCase() === "samsung" ||
                    asset.brand.toLowerCase() === "hp" ||
                    asset.brand.toLowerCase() === "asus") ? (
                    <Button
                      variant="success"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setEditingAsset(asset);
                        setShowAssignModal(true);
                      }}
                    >
                      Assign
                    </Button>
                  ) : (
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setEditingAsset(asset);
                        setShowReAssignModal(true);
                      }}
                    >
                      Re-Assign
                    </Button>
                  )}
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => alert(`View history for ${asset.assetName}`)}
                  >
                    <ClockHistory className="me-1" /> History
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination className="justify-content-center">
        <Pagination.Prev onClick={() => currentPage > 1 && paginate(currentPage - 1)} disabled={currentPage === 1} />
        {[...Array(totalPages)].map((_, i) => (
          <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => currentPage < totalPages && paginate(currentPage + 1)} disabled={currentPage === totalPages} />
      </Pagination>

      {/* Modals */}
      {showAddModal && <NewAssetForm show={showAddModal} handleClose={handleAddClose} />}
      {editingAsset && showAssignModal && (
        <AssignReAssign assign={true} show={showAssignModal} handleClose={handleAssignClose} asset={editingAsset} />
      )}
      {editingAsset && showReAssignModal && (
        <AssignReAssign assign={false} show={showReAssignModal} handleClose={handleAssignClose} asset={editingAsset} />
      )}
    </div>
  );
};

export default AssetManagement;
