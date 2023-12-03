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

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const [voltage, setvoltage] = useState([]);
  const [value, setvalue] = useState([]);
  const value1 = [2, 202, 2];


  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`${baseUrl}/upload/${filekey}`)
        .then((res) => {
          const data = res.data.data[0];
          console.log(typeof voltage);
          setvoltage(
            data.values
              .map((item) => {
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
  const result = value.map((item,index) => {return [item ,voltage[index]]})

  const uniqueSet = new Set(result);
  result.filter((item, index) => result.indexOf(item) === index);
  function multiDimensionalUnique(arr) {
    var uniques = [];
    var itemsFound = {};
    for(var i = 0, l = arr.length; i < l; i++) {
        var stringified = JSON.stringify(arr[i]);
        if(itemsFound[stringified]) { continue; }
        uniques.push(arr[i]);
        itemsFound[stringified] = true;
    }
    return uniques;
}

// multiDimensionalUnique(result)
result.map(JSON.stringify).filter((e,i,a) => i === a.indexOf(e)).map(JSON.parse)

var arr = [[7,3], [7,3], [3,8], [7,3], [7,3], [1,2]];

const res = result.map(JSON.stringify).filter((e,i,a) => i === a.indexOf(e)).map(JSON.parse)
// [[7,3], [3,8], [1,2]]
console.log(arr)

  const data = [
    ["Time", "Voltage"],...res
   
  ];

  console.log(uniqueSet);
  console.log(value);

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
