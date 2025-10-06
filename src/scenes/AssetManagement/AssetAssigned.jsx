import React, { useState } from "react";
import { Table, Pagination, Container } from "react-bootstrap";

const AssetAssigned = () => {
  const dummyData = [
    { id: 1, t: "John Doe", q: "2025-09-01", ew: "2025-09-10" },
    { id: 2, t: "Mary Jane", q: "2025-09-05", ew: "2025-09-15" },
    { id: 3, t: "Alice Smith", q: "2025-09-10", ew: "2025-09-20" },
    { id: 4, t: "Bob Brown", q: "2025-09-12", ew: "2025-09-22" },
    { id: 5, t: "Charlie Green", q: "2025-09-15", ew: "2025-09-25" },
    { id: 6, t: "Diana Blue", q: "2025-09-18", ew: "2025-09-28" },
    { id: 7, t: "Edward Black", q: "2025-09-20", ew: "2025-09-30" },
  ];

  const [rows] = useState(dummyData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRows = rows.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(rows.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="my-4">
      <h3 className="mb-3">Asset Assigned History</h3>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th>User Name</th>
              <th>Assigned Date</th>
              <th>UnAssigned Date</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((row) => (
                <tr key={row.id}>
                  <td>{row.t}</td>
                  <td>{row.q}</td>
                  <td>{row.ew}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination className="justify-content-center">
        <Pagination.Prev
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages)].map((_, i) => (
          <Pagination.Item
            key={i + 1}
            active={i + 1 === currentPage}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() =>
            currentPage < totalPages && handlePageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </Container>
  );
};

export default AssetAssigned;
