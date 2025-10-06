import React, { useState } from "react";
import { Table, Button, Modal, Form, Pagination } from "react-bootstrap";
import { PlusSquare } from "react-bootstrap-icons";

const Classification = () => {
  // Dummy data
  const dummyData = [
    { id: 1, classification: "Laptop", category: "Assignable" },
    { id: 2, classification: "Mouse", category: "Assignable" },
    { id: 3, classification: "Furniture", category: "Non-Assignable" },
    { id: 4, classification: "Monitor", category: "Assignable" },
    { id: 5, classification: "Chairs", category: "Non-Assignable" },
    { id: 6, classification: "Keyboard", category: "Assignable" },
  ];

  const [rows, setRows] = useState(dummyData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newClassification, setNewClassification] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [editingRow, setEditingRow] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRows = rows.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(rows.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Add
  const handleAdd = () => {
    if (!newClassification || !newCategory) return;

    const newRow = {
      id: rows.length + 1,
      classification: newClassification,
      category: newCategory,
    };
    setRows([...rows, newRow]);
    setShowAddModal(false);
    setNewClassification("");
    setNewCategory("");
  };

  // Edit
  const handleEdit = () => {
    if (!editingRow.classification || !editingRow.category) return;

    const updated = rows.map((r) =>
      r.id === editingRow.id ? editingRow : r
    );
    setRows(updated);
    setShowEditModal(false);
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Classification List</h3>
        <Button variant="dark" onClick={() => setShowAddModal(true)}>
          <PlusSquare className="me-2" /> New Classification
        </Button>
      </div>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Classification</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.classification}</td>
                <td>{row.category}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => {
                      setEditingRow({ ...row });
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination>
        <Pagination.Prev
          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages)].map((_, i) => (
          <Pagination.Item
            key={i + 1}
            active={i + 1 === currentPage}
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>

      {/* Add Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Classification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Classification</Form.Label>
              <Form.Control
                type="text"
                value={newClassification}
                onChange={(e) => setNewClassification(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Assignable">Assignable</option>
                <option value="Non-Assignable">Non-Assignable</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="dark" onClick={handleAdd}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Classification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingRow && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Classification</Form.Label>
                <Form.Control
                  type="text"
                  value={editingRow.classification}
                  onChange={(e) =>
                    setEditingRow({ ...editingRow, classification: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={editingRow.category}
                  onChange={(e) =>
                    setEditingRow({ ...editingRow, category: e.target.value })
                  }
                >
                  <option value="Assignable">Assignable</option>
                  <option value="Non-Assignable">Non-Assignable</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Classification;
