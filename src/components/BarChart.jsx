import React from "react";
import { Chart } from "react-google-charts";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
export const data = [
  ["Assets", "TotalAssets", "Assigned","UnAssigned"],
  ["Laptop", 20, 9,11],
  ["Mouse", 20, 9,11],
  ["KeyBoard", 20, 9,11],
  ["HeadSet", 20, 9,11],
  ["LaptopStand", 20, 9,11]
  
];

export const options = {
  title: "Total Assignable Assets",
  chartArea: { width: "70%" },
  hAxis: {
    title: "Asset Count",
    minValue: 0,
  },
  vAxis: {
    title: "Classification",
    minValue: 0,
  },
};




export default function BarChart() {

  return(
    <div style={{margin:'0px'}}>
     <Chart
      chartType="BarChart"
      width="1700px"
      height="500px"
      data={data}
      options={options}
    />
        {/* <Bar options={options} data={data} /> */}
      

    </div>
  );
}