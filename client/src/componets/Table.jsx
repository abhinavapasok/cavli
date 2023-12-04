import React, { useEffect, useState } from "react";
import { baseUrl } from "../baseUrl";
import axios from "axios";
import { Link } from "react-router-dom";

function Table() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      axios.get(`${baseUrl}/get-users`).then(function (response) {
        console.log(response.data);
        setData(response.data);
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              File Name
            </th>
            <th scope="col" className="px-6 py-3">
              Url
            </th>
            <th scope="col" className="px-6 py-3">
              Date Upload
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key = {item.filekey}className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">{item.filename}</td>
                <td className="px-6 py-4">{item.url}</td>
                <td className="px-6 py-4">{item.createdAt.slice(0, 10)}</td>
                <td className="px-6 py-4 text-red-700">
                  <Link to="/view-graph" state={{ filekey: item.key }}>
                    Open
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
