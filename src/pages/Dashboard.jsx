import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import followers from "../assets/followers.png";
import following from "../assets/following.png";
import community from "../assets/community.png";
import arrowRight from "../assets/arrow-right.png";
import axios from "axios";
import { useUserContext } from "../context/UserContext.jsx";
import BarChart from "../components/FarmerBar.jsx";
import FarmBarChart from "../components/FarmBarChart.jsx";
import AgentBarChart from "../components/AgentBarChart.jsx";
import TestBarChart from "../components/TestBarChart.jsx";
import LandBarChart from "../components/LandBarChart.jsx";
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);
const Dashboard = () => {
  const base_url = import.meta.env.VITE_API_URL;
  const { state } = useUserContext();
  const [farmersData, setFarmersData] = useState([]);
  const [agentsData, setAgentsData] = useState([]); 
  const [landData, setLandsData] = useState([]); 
  const [testData, setTestData] = useState([]); 
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const storedUser = JSON.parse(localStorage.getItem("user"))
  const config = {
    headers: { Authorization: `Bearer ${storedUser.token}` }
};
 

  useEffect(() => {
    // If no user, navigate to login
    if (!storedUser) {
      navigate("/login");
    } else {
      // Fetch data only if user exists

      const getFamers = async () => {
        try {
           
          const res = await axios.get(
            `${base_url}/admin/users/farmer`, 
            config
          ); 
          
          setFarmersData(res.data.data || []);
        } catch (err) {
          setError(err.message);
        }
      };
      

      const getAgents = async () => {
        try {
          const res = await axios.get(
            `${base_url}/admin/users/agent`,
            config
          );
          if (Array.isArray(res.data.data)) {

            setAgentsData(res.data.data);
            
          }
        } catch (err) {
          setError(err.message);
        }
      };

      const getTestData = async () => {
        try {
          const res = await axios.get(
            `${base_url}/admin/requests`,
            config
          );
          if (Array.isArray(res.data.data)) {
            
            setTestData(res.data.data);
            
          }
        } catch (err) {
          setError(err.message);
        }
      };

      const getLandData = async () => {
        try {
          const res = await axios.get(
            `${base_url}/admin/lands`,
            config
          );
          if (Array.isArray(res.data.data)) {
            setLandsData(res.data.data); 
          }
        } catch (err) {
          setError(err.message);
        }
      };
      getFamers();
      getAgents();
      getTestData()
      getLandData()
    }
  }, []);

 

  // Define data for the grid
  const data = [
    {
      key: 1,
      small_title: "Famers",
      content: `${farmersData.length} Farmers`,
      img: followers,
      from: "",
    },
    {
      key: 2,
      small_title: "Lands",
      content: `${landData.length} Lands`,
      img: following,
      from: "",
    },
    {
      key: 3,
      small_title: "Tests Requests",
      content: `${testData.length} Requests`,
      img: community,
      from: "",
    },
    {
      key: 4,
      small_title: "Agents",
      content: `${agentsData.length} Agents`,
      img: followers,
      from: "",
    },
  ];


  return (
    <div>
      <div className="mt-2 grid grid-cols-2 md:grid-cols-4 items-center justify-between flex-wrap gap-3">
        {data.map((e, index) => (
          <div className="bg-white w-full mt-3 p-2 md:p-4 rounded-md flex flex-col h-[115px] md:h-[inherit]" key={index}>
            <p className="mb-2 text-center w-full md:text-start">{e.small_title}</p>
            <div className="flex gap-2 items-center justify-between">
              <div className="flex gap-2 items-center flex-col md:flex-row  w-full justify-center md:justify-start">
                <img src={e.img} className="w-7" alt="icon" />
                <p className="font-semibold text-[12px]  md:text-lg">{e.content}</p>
              </div>
              <div>
                <img
                  src={arrowRight}
                  alt="arrow-right"
                  className=""
                />
              </div>
            </div>
            <div className="bg-[#EDFEF6] mt-3 w-28 rounded flex items-center justify-center">
              <p className="text-[#55E8AD] text-xs">{e.from}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        <div className="w-full bg-white rounded-md shadow-lg p-5 max-h-[400px]">
        {farmersData.length > 0 ? <FarmBarChart farmersData={farmersData} /> : <p>Loading data...</p>}
        </div>
        <div className="w-full bg-white rounded-md shadow-lg p-5 max-h-[400px] ">
        {agentsData.length > 0 ? <AgentBarChart agentsData={agentsData} /> : <p>Loading data...</p>}

        </div>
      </div>

      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        <div className="w-full bg-white rounded-md shadow-lg p-5 max-h-[400px] flex flex-col items-center justify-center">
        {testData.length > 0 ? <TestBarChart testData={testData} /> : <p>Loading data...</p>}
        </div>
        <div className="w-full bg-white rounded-md shadow-lg p-5  max-h-[400px]">
        {landData.length > 0 ? <LandBarChart landData={landData} /> : <p>Loading data...</p>}

        </div>
      </div>
      {/* <BarChart farmersData={agentChartData} /> */}
      

    </div>
  );
};

export default Dashboard;
