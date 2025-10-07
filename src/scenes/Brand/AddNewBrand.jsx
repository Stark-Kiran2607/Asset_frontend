import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const AddNewBrand = ({ show, handleClose, postData, tableRowData, categories = [], }) => {
  const [brandName, setBrandName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (show && inputRef.current) inputRef.current.focus();
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!brandName.trim()) {
      setError("Asset name is required");
      return;
    }

    if (!selectedCategory) {
      setError("Please select a category");
      return;
    }

    const exists = tableRowData.some(
      (b) => b.brand.trim().toLowerCase() === brandName.trim().toLowerCase()
    );

    if (exists) {
      setError("This Asset Name already exists");
      return;
    }

    const newRow = {
      id: tableRowData.length + 1,
      brand: brandName.trim().toUpperCase(),
      category: selectedCategory || "Uncategorized",
    };

    postData([...tableRowData, newRow]);
    setBrandName("");
    setSelectedCategory("");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Asset</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Asset Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Asset name"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              ref={inputRef}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {error && <Alert variant="danger" className="mt-2">{error}</Alert>}

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
