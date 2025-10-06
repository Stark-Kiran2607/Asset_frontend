import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AssignReAssign = ({ show, handleClose, asset, assign }) => {
  const [assignedTo, setAssignedTo] = useState(asset.assigned || "");

  const handleSubmit = () => {
    const updatedAsset = {
      ...asset,
      assigned: assignedTo,
      currentStage: assign ? "In Use" : asset.currentStage,
    };
    handleClose(updatedAsset); // Pass updated asset back to parent
  };

  return (
    <Modal show={show} onHide={() => handleClose(null)}>
      <Modal.Header closeButton>
        <Modal.Title>{assign ? "Assign Asset" : "Re-Assign Asset"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Asset Name</Form.Label>
            <Form.Control type="text" value={asset.assetName} readOnly />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Assign To</Form.Label>
            <Form.Control
              type="text"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose(null)}>
          Cancel
        </Button>
        <Button variant={assign ? "success" : "warning"} onClick={handleSubmit}>
          {assign ? "Assign" : "Re-Assign"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AssignReAssign;
