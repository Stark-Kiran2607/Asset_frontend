import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const EditBrand = ({ show, handleClose, editingRow, editData, tableRowsData }) => {
  const [brandName, setBrandName] = useState(editingRow.brand);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (show && inputRef.current) inputRef.current.focus();
    setBrandName(editingRow.brand); // reset value on open
    setError("");
  }, [show, editingRow]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!brandName.trim()) {
      setError("Brand is required");
      return;
    }

    const exists = tableRowsData.some(
      (b) =>
        b.brand.trim().toLowerCase() === brandName.trim().toLowerCase() &&
        b.id !== editingRow.id
    );
    if (exists) {
      setError("This Brand Name is already taken.");
      return;
    }

    const updatedRow = { ...editingRow, brand: brandName.trim().toUpperCase() };

    editData((prevRows) =>
      prevRows.map((row) => (row.id === editingRow.id ? updatedRow : row))
    );

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Brand</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>ID</Form.Label>
            <Form.Control type="text" value={editingRow.id} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              ref={inputRef}
            />
            {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
          </Form.Group>

          <div className="text-end">
            <Button variant="secondary" className="me-2" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditBrand;
