import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const AddNewCategory = ({ show, handleClose, postCategory, categories = [] }) => {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (show && inputRef.current) inputRef.current.focus();
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!categoryName.trim()) {
      setError("Category name is required");
      return;
    }

    const exists = categories.some(
      (c) => c.category.trim().toLowerCase() === categoryName.trim().toLowerCase()
    );
    if (exists) {
      setError("This Category Name already exists");
      return;
    }

    const newCategory = {
      id: categories.length + 1,
      category: categoryName.trim(),
    };

    postCategory([...categories, newCategory]);
    setCategoryName("");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
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

export default AddNewCategory;
