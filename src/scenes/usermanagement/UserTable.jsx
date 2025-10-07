import React from "react";
import { Table, Pagination, Button } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
const UserTable = ({ users, currentPage, itemsPerPage, paginate, handleEdit, handleDelete }) => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th>EmployeeID</th>
              <th>Employee Name</th>
              <th>Email Id</th>
              <th>Mobile No</th>
              <th>Designation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.Name}</td>
                <td>{emp.email}</td>
                <td>{emp.Phone}</td>
                <td>{emp.designation}</td>
                <td>
                    <Button 
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(emp)}
                    >
                        <PencilSquare />
                    </Button>
                    <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(emp.id)}
                    >
                        <Trash />
                    </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

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
    </>
  );
};

export default UserTable;
