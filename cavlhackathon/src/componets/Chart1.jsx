import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

import jsonData from "../../../sensor_data.json";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
function removeDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}
const voltage = jsonData.data[0].values
  .map((item) => {
    if (item === "N/A") {
      item = 0;
    }
  })
  .slice(0, 1000);
const value1 = jsonData.data[0].timestamps.slice(0, 1000);

const value = jsonData.data[0].timestamps.slice(0, 14).map((item) => {
  const year = item.slice(0, 4);
  const mouth = item.slice(5, 7);
  const date = item.slice(8, 10);
  const time = item.slice(11, 13);
  const time2 = item.slice(14, 16);
  
  return (
    time2 * 60 +
    time * 60 * 60 +
    date * 60 * 60 * 24 +
    mouth * 3600 * 24 * 30 +
    year * 3600 * 24 * 30 * 12
    ).toString()
  });
  
  console.log(value);
  // const uniq = [...new Set(value)];

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  value,
  datasets: [
    {
      label: "Dataset 1",
      data: voltage,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

function Chart1() {
  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
}

export default Chart1;
