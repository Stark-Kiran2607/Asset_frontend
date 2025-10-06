import React, { useState } from "react";
import { Table, Button,  Pagination } from "react-bootstrap";
import { PlusSquare, Trash } from "react-bootstrap-icons";
import AddNewBrand from "./AddNewBrand";
import EditBrand from "./EditBrand";
const Brand = () => {
  // Dummy brands
  const dummyBrands = [
    { id: 1, brand: "DELL", category: "Laptop" },
    { id: 2, brand: "HP" , category: "Laptop"},
    { id: 3, brand: "LOGITECH", category: "Mouse"},
    { id: 4, brand: "APPLE", category: "Laptop"},
    { id: 5, brand: "LENOVO" , category: "Laptop"},
    { id: 6, brand: "SAMSUNG" , category: "Phone"},
    { id: 7, brand: "ASUS" , category: "Laptop"},
  ];

  const [brands, setBrands] = useState(dummyBrands);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

    // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBrands = brands.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(brands.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
        setBrands((prev)=>prev.filter((brand) => brand.id !== id));
    }
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Brand List</h3>
        <Button variant="dark" onClick={() => setShowAddModal(true)}>
          <PlusSquare className="me-2" /> New Brand
        </Button>
      </div>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th>Brand ID</th>
              <th>Brand Name</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBrands.map((brand) => (
              <tr key={brand.id}>
                <td>{brand.id}</td>
                <td>{brand.brand}</td>
                <td>{brand.category}</td>
                <td className="d-flex gap-2">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => {
                      setEditingBrand(brand);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(brand.id)}
                >
                    <Trash className="me-1" /> Delete
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
          onClick={() =>
            currentPage < totalPages && paginate(currentPage + 1)
          }
          disabled={currentPage === totalPages}
        />
      </Pagination>

       {/* Add New Brand Modal */}
      <AddNewBrand
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        postData={setBrands}
        tableRowData={brands}
      />

      {/* Edit Brand Modal */}
      {editingBrand && (
        <EditBrand
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          editingRow={editingBrand}
          editData={setBrands}
          tableRowsData={brands}
        />
      )}


    </div>
  );
};

export default Brand;
