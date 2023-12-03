import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import axios from "axios";



function Chart() {
    const [jsonData, setjsonData] = useState(null);
    const getData = async () => {
      await axios
        .get("http://localhost:8080/upload/a795557c9610c1693163ce20a0d27f62")
        .then(function (response) {
          setjsonData(response.data.data[0].timestamps);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    useEffect(() => {
      getData();
    }, []);
  const data = jsonData[0]

  console.log(data);

  //   jsonData.map( (data) => console.log(data))

  return (
    <div>
      <LineChart
        xAxis={[{ data:  [4,8,8,78,9,9]}]}
        series={[
          {
            data: [1,2,3,4,5,6],
            area: true,
          },
        ]}
        width={500}
        height={300}
      />
    </div>
  );
}

export default Chart;
