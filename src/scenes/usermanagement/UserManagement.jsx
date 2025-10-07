import React, { useState } from "react";
import UserTable from "./UserTable";
import AddEditUserModal from "./AddEditUserModal";
import { Button } from "react-bootstrap";
import { PlusSquare } from "react-bootstrap-icons";
import EmployeeChart from "./EmployeeChart";
const UserManagement = () => {
  const dummyData = [
    { id: 1, Name: "Kiran", email: "kiran@example.com", Phone: 9019294132, designation: "Intern" },
    { id: 2, Name: "Alice", email: "alice@example.com", Phone: 9123456780, designation: "Developer" },
    { id: 3, Name: "Bob", email: "bob@example.com", Phone: 9234567890, designation: "Manager" },
    { id: 4, Name: "Charlie", email: "charlie@example.com", Phone: 9345678901, designation: "Designer" },
    { id: 5, Name: "David", email: "david@example.com", Phone: 9456789012, designation: "Tester" },
    { id: 6, Name: "Eve", email: "eve@example.com", Phone: 9567890123, designation: "HR" },
    { id: 7, Name: "Frank", email: "frank@example.com", Phone: 9678901234, designation: "Lead" },
    { id: 8, Name: "Grace", email: "grace@example.com", Phone: 9789012345, designation: "Intern" },
  ];

  const [users, setUsers] = useState(dummyData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const handleSaveUser = (userData) => {
    if (editUser) {
      // Edit existing user
      setUsers(users.map(u => u.id === editUser.id ? { ...u, ...userData } : u));
    } else {
      // Add new user
      const newUser = { id: users.length + 1, ...userData };
      setUsers([...users, newUser]);
    }
    setEditUser(null);
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };
  const designations = [...new Set(users.map(u => u.designation))];

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3>Employee List</h3>
        <Button variant="dark" onClick={() => setShowModal(true)}>
          <PlusSquare className="me-2" /> New Employee
        </Button>
      </div>

      <UserTable
        users={users}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        paginate={setCurrentPage}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      <EmployeeChart users={users} designations={designations} />

      <AddEditUserModal
        show={showModal}
        handleClose={() => { setShowModal(false); setEditUser(null); }}
        saveUser={handleSaveUser}
        editUser={editUser}
      />
    </div>
  );
};

export default UserManagement;
