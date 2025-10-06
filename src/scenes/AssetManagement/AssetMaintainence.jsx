import React, { useState } from "react";
import { Table, Pagination, Container } from "react-bootstrap";

const AssetMaintenanceHistory = () => {
  // Dummy data
  const dummyData = [
    { id: 1, brand: "2025-09-01", ew: "2025-09-03", qe: "2025-09-05", re: "Service A", tr: "Complain 1", qy: "Repaired" },
    { id: 2, brand: "2025-09-02", ew: "2025-09-04", qe: "2025-09-06", re: "Service B", tr: "Complain 2", qy: "Repaired" },
    { id: 3, brand: "2025-09-03", ew: "2025-09-05", qe: "2025-09-07", re: "Service C", tr: "Complain 3", qy: "Replaced" },
    { id: 4, brand: "2025-09-04", ew: "2025-09-06", qe: "2025-09-08", re: "Service A", tr: "Complain 4", qy: "Repaired" },
    { id: 5, brand: "2025-09-05", ew: "2025-09-07", qe: "2025-09-09", re: "Service B", tr: "Complain 5", qy: "Repaired" },
    { id: 6, brand: "2025-09-06", ew: "2025-09-08", qe: "2025-09-10", re: "Service C", tr: "Complain 6", qy: "Replaced" },
    { id: 7, brand: "2025-09-07", ew: "2025-09-09", qe: "2025-09-11", re: "Service A", tr: "Complain 7", qy: "Repaired" },
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
      <h3 className="mb-3">Asset Maintenance History</h3>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th>Request ID</th>
              <th>Request Date</th>
              <th>Given Date</th>
              <th>Completion Date</th>
              <th>Service Provider</th>
              <th>Complain Details</th>
              <th>Service Details</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.brand}</td>
                  <td>{row.ew}</td>
                  <td>{row.qe}</td>
                  <td>{row.re}</td>
                  <td>{row.tr}</td>
                  <td>{row.qy}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
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

export default AssetMaintenanceHistory;
