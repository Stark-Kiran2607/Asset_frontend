import React from "react";
import { Chart } from "react-google-charts";

const CategoryList = () => {
  const data = [
    ["Category", "Products"],
    ["Assignable", 20],
    ["Non-Assignable", 10],
  ];

  const totalAssets = 30;

  const options = {
    title: "Total Assets : " + totalAssets,
    pieHole: 0, // for donut effect if you want
    chartArea: { width: "80%", height: "70%" },
    legend: { position: "bottom" },
    slices: {
      0: { color: "#36a2eb" },
      1: { color: "#fe6383" },
    },
  };

  return (
    <div className="card p-3 mb-4">
      <h5 className="card-title">Asset Categories</h5>
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </div>
  );
};

export default CategoryList;
