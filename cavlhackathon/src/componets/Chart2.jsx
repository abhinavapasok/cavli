import { LineChart } from "@mui/x-charts/LineChart";

import jsonData from "../../../sensor_data.json";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];

const voltage = jsonData.data[0].values
  .map((item) => {
    if (item === "N/A") {
      item = 0;
    }
    item.toString();
    return item;
  })
  .slice(0, 1000);

const value1 = jsonData.data[0].timestamps.slice(0, 1000);

const value = jsonData.data[0].timestamps.slice(0, 1400).map((item) => {
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
  ).toString();
});

console.log(voltage);
// const uniq = [...new Set(value)];

export default function Chart2() {
  return (
    <div className="flex">
      <LineChart
        width={1200}
        height={300}
        series={[{ data: voltage, label: "voltage" }]}
        xAxis={[{ scaleType: "point", data: value1 }]}
      />
    </div>
  );
}
