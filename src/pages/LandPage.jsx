import { Button, Input, Table } from "antd";
import arrowDown from "../assets/arrow-down.png";
import search from "../assets/search-normal.png";
import user from "../assets/user_img.png";
import verify from "../assets/verify.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const LandPage = () => {

  const [landsData, setLandsData] = useState([]);
  const [error, setError] = useState([]);
  const base_url = import.meta.env.VITE_API_URL;
  const storedUser = JSON.parse(localStorage.getItem("user"))
  const config = {
    headers: { Authorization: `Bearer ${storedUser.token}` }
};



 

 
  
  useEffect(() => {
    const getLandData = async () => {
      try {
        const res = await axios.get(
          `${base_url}/admin/lands`,
          config
        );
        if (Array.isArray(res.data.data)) {
          setLandsData(res.data.data); 
          console.log(res.data.data);
          
        }
      } catch (err) {
        setError(err.message);
      }
    };
    getLandData();
  }, []);


  return (
    <div className="bg-white rounded-md p-3">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold">All Lands</h1>
        </div>
        <div className="flex gap-5">
          <div className="bg-[#F6F6F6] flex items-center rounded-full w-72 px-3">
            <img src={search} className="w-4 h-4 cursor-pointer" />
            <Input
              placeholder="Search Land....."
              className="ml-2 bg-transparent border-none outline-none focus:!outline-none focus:bg-transparent hover:!bg-transparent focus:border-transparent"
            />
          </div>
          
        </div>
      </div>

      <div className="mt-8 overflow-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
            <th className="border border-gray-300 p-2 text-left">S/N</th>
              <th className="border border-gray-300 p-2 text-left">Name</th>
              <th className="border border-gray-300 p-2 text-left">Size</th>
              <th className="border border-gray-300 p-2 text-left">Crop</th>
              <th className="border border-gray-300 p-2 text-left">Location </th>
              <th className="border border-gray-300 p-2 text-left">Type</th>
              <th className="border border-gray-300 p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {landsData.map((data, index) => (
              <tr key={data._id}>
                 <td className="border border-gray-300 p-2">
                  {index+1 || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {data?.name || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {data?.totalArea?.value +" "+data?.totalArea?.unit || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {data?.currentCrop || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {data?.location?.address  || "N/A"} <br/>
                  {"Lat - "+data?.location?.coordinates?.latitude+",  Long"+data?.location?.coordinates?.longitude || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {data?.landType || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => {
                      const id = data?._id;
                      if (id) {
                        handleDelete(id);
                      } 
                    }}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LandPage;