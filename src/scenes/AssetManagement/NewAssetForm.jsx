import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const NewAssetForm = ({ show, handleClose }) => {
  const [assetName, setAssetName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  const handleSave = () => {
    const newAsset = {
      id: Date.now(),
      assetName,
      category,
      brand,
      currentStage: "Available",
      assigned: "",
    };
    handleClose(newAsset); 
    setAssetName("");
    setCategory("");
    setBrand("");
  };

  return (
    <Modal show={show} onHide={() => handleClose(null)}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Asset</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Asset Name</Form.Label>
            <Form.Control
              type="text"
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose(null)}>
          Cancel
        </Button>
        <Button variant="dark" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewAssetForm;
