import React, { useState } from "react";
import { Chart } from "react-google-charts";
import { Form } from "react-bootstrap";

const EmployeeChart = ({ users, designations }) => {
  const [selectedDesignation, setSelectedDesignation] = useState("All");

  // If "All", use all users; else filter by selected designation
  const filteredUsers = selectedDesignation === "All"
    ? users
    : users.filter(u => u.designation === selectedDesignation);

  // Prepare chart data based on filtered users
  const chartData = [["Designation", "Count"]];

  if (selectedDesignation === "All") {
    // Count for each designation
    designations.forEach(desig => {
      const count = users.filter(u => u.designation === desig).length;
      chartData.push([desig, count]);
    });
  } else {
    // Only one designation, show its count
    chartData.push([selectedDesignation, filteredUsers.length]);
  }

  return (
    <div className="my-4">
      

      <Chart
        chartType="LineChart"
        data={chartData}
        options={{ title: "Total Employees", pieHole: 0.4 }}
        width="100%"
        height="400px"
      />
    </div>
  );
};

export default EmployeeChart;
