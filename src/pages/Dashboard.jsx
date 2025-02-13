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
            console.log(res.data.data);
            
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
      from: "+20 from yesterday",
    },
    {
      key: 2,
      small_title: "Lands",
      content: `${landData.length} Lands`,
      img: following,
      from: "+5 from yesterday",
    },
    {
      key: 3,
      small_title: "Tests Requests",
      content: `${testData.length} Requests`,
      img: community,
      from: "+2 from yesterday",
    },
    {
      key: 4,
      small_title: "Agents",
      content: `${agentsData.length} Agents`,
      img: followers,
      from: "+20 from yesterday",
    },
  ];

  const userColumns = [
    {
      title: "Username",
      dataIndex: ["userID", "username"],
      key: "username",
      render: (username) => username || "N/A",
    },
    {
      title: "Email",
      dataIndex: ["userID", "email"],
      key: "email",
      render: (email) => email || "N/A",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => status || "N/A",
    },
    {
      title: "Coupon Code",
      dataIndex: "coupon",
      key: "coupon_code",
      render: (code) => code || "N/A",
    },
    {
      title: "Code Expiration",
      dataIndex: "exp_date",
      key: "code_expiration",
      render: (exp) =>
        exp ? new Date(exp * 1000).toLocaleDateString() : "N/A",
    },
  ];

  const couponColumns = [
    {
      title: "Coupon",
      dataIndex: "coupon",
      key: "coupon",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (duration, record) =>
        `${duration || "N/A"} ${record.duration_type || "N/A"}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => status || "N/A",
    },
  ];



  return (
    <div>
      <div className="mt-2 grid grid-cols-4 items-center justify-between flex-wrap">
        {data.map((e, index) => (
          <div className="bg-white mt-3 p-4 w-64 rounded-md" key={index}>
            <p className="mb-2">{e.small_title}</p>
            <div className="flex gap-2 items-center justify-between">
              <div className="flex gap-2 items-center">
                <img src={e.img} className="w-7" alt="icon" />
                <p className="font-semibold text-lg">{e.content}</p>
              </div>
              <div>
                <img
                  src={arrowRight}
                  alt="arrow-right"
                  className="w-[6px] mt-1"
                />
              </div>
            </div>
            <div className="bg-[#EDFEF6] mt-3 w-28 rounded flex items-center justify-center">
              <p className="text-[#55E8AD] text-xs">{e.from}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-6 gap-5">
        <div className="bg-white w-full rounded-md p-2">
          <div className="flex justify-between items-center">
            <h1 className="text-sm font-semibold">Users</h1>
            <Link to="/user-management">See All</Link>
          </div>
          <Table
            columns={userColumns}
            dataSource={agentsData}
            size="small"
            scroll={{ x: "max-content" }}
            pagination={false}
            className="mt-3"
          />
        </div>
        <div className="bg-white w-full rounded-md p-2">
          <div className="flex justify-between items-center">
            <h1 className="text-sm font-semibold">Coupon Purchased</h1>
            <Link to="/coupons">See All</Link>
          </div>

          <Table
            columns={couponColumns}
            dataSource={farmersData}
            size="small"
            scroll={{ x: "max-content" }}
            pagination={false}
            className="mt-3"
          />
        </div>
      </div>
      {/* <BarChart farmersData={agentChartData} /> */}

    </div>
  );
};

export default Dashboard;
