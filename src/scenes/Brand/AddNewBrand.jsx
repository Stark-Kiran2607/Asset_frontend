import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const AddNewBrand = ({ show, handleClose, postData, tableRowData }) => {
  const [brandName, setBrandName] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (show && inputRef.current) inputRef.current.focus();
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!brandName.trim()) {
      setError("Brand is required");
      return;
    }

    const exists = tableRowData.some(
      (b) => b.brand.trim().toLowerCase() === brandName.trim().toLowerCase()
    );
    if (exists) {
      setError("This Brand Name is already taken");
      return;
    }

    const newRow = {
      id: tableRowData.length + 1, // local auto ID
      brand: brandName.trim().toUpperCase(),
    };

    postData([...tableRowData, newRow]);
    setBrandName("");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Brand</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="brandId">
            <Form.Label>ID</Form.Label>
            <Form.Control type="text" value="Auto Generated" disabled />
          </Form.Group>
          <Form.Group className="mb-3" controlId="brandName">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand name"
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
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddNewBrand;
