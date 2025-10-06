import React from "react";
import { Chart } from "react-google-charts";


export const data = [
  ["Task", "Hours per Day"],
  ["Accepted", 11],
  ["Rejected", 11],
  ["Pending", 11],
  ["FullFilled", 11]
];

export const options = {
  title: "Asset Request List",
  chartArea: { width: "50%" },
  
};



export default function PieChart() {
  return (
    <>
      <Chart
        chartType="PieChart"
        data={data}
   
        options={options}
        height={"350px"}
      />
      {/* <Pie data={data} options={options} />; */}

    </>

  )


} 