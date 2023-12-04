import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

import axios from "axios";
import { baseUrl } from "../baseUrl";

function Chart1({ filekey }) {
  const options = {
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


  const [voltage, setvoltage] = useState([]);
  const [value, setvalue] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`${baseUrl}/upload/${filekey}`)
        .then((res) => {
          const data = res.data.data[0];
          console.log(typeof voltage);
          setvoltage(
            data.values.map((item) => {
              if (item === "N/A") {
                item = 0;
              }
              return parseFloat(item);
            })
          );
          setvalue(data.timestamps);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getData();
  }, []);
  const result = value.map((item, index) => {
    return [item, voltage[index]];
  });

  // let res = ["jhgjhg",0]

 let res =   result.map(JSON.stringify)
    .filter((e, i, a) => i === a.indexOf(e))
    .map(JSON.parse);


  const data = [["Time", "Voltage"], ...res];

  return (
    <div>
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
}

export default Chart1;
