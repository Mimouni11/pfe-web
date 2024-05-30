import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";
import SERVER_URL from "../config";
import Sidebar from "./Sidebar";
import Header from "../chef/Header";
import "./Dashboard.css"; // Import the CSS file

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [newUsers, setNewUsers] = useState(0);
  const [userActivity, setUserActivity] = useState([]);
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [vehicleStatus, setVehicleStatus] = useState([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [taskStatus, setTaskStatus] = useState([]);
  const [taskCompletionRate, setTaskCompletionRate] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [
        totalUsersRes,
        newUsersRes,
        userActivityRes,
        totalVehiclesRes,
        vehicleStatusRes,
        totalTasksRes,
        taskStatusRes,
        taskCompletionRateRes,
      ] = await Promise.all([
        axios.get(`http://${SERVER_URL}:5001/total_users`),
        axios.get(`http://${SERVER_URL}:5001/new_users`),
        axios.get(`http://${SERVER_URL}:5001/user_activity`),
        axios.get(`http://${SERVER_URL}:5001/total_vehicles`),
        axios.get(`http://${SERVER_URL}:5001/vehicle_status`),
        axios.get(`http://${SERVER_URL}:5001/total_tasks`),
        axios.get(`http://${SERVER_URL}:5001/task_status`),
        axios.get(`http://${SERVER_URL}:5001/task_completion_rate`),
      ]);

      setTotalUsers(totalUsersRes.data[0].total);
      setNewUsers(newUsersRes.data[0].new_users);
      setUserActivity(userActivityRes.data);
      setTotalVehicles(totalVehiclesRes.data[0].total);
      setVehicleStatus(vehicleStatusRes.data);
      setTotalTasks(totalTasksRes.data[0].total);
      setTaskStatus(taskStatusRes.data);
      setTaskCompletionRate(taskCompletionRateRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const userActivityData = {
    labels: userActivity.map((item) => item.date),
    datasets: [
      {
        label: "User Activity",
        data: userActivity.map((item) => item.count),
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const vehicleStatusData = {
    labels: vehicleStatus.map((item) => item.status),
    datasets: [
      {
        data: vehicleStatus.map((item) => item.count),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const taskStatusData = {
    labels: taskStatus.map((item) =>
      item.done === "yes" ? "Done" : "Not Done"
    ),
    datasets: [
      {
        data: taskStatus.map((item) => item.count),
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  const taskCompletionRateData = {
    labels: taskCompletionRate.map((item) => item.date),
    datasets: [
      {
        label: "Task Completion Rate",
        data: taskCompletionRate.map((item) => item.count),
        backgroundColor: "rgba(153,102,255,0.4)",
        borderColor: "rgba(153,102,255,1)",
        borderWidth: 1,
      },
    ],
  };

  const runEtl = async () => {
    try {
      const response = await axios.post(`http://${SERVER_URL}:5001/run_etl`);
      console.log(response.data);
      fetchData(); // Re-fetch data after ETL process completes
    } catch (error) {
      console.error("Error running ETL process:", error);
    }
  };

  return (
    <div className="grid-container">
      <Sidebar />
      <Header />
      <div className="main-container">
        <div className="grid-content">
          <div className="chart-card">
            <h2>User Management</h2>
            <p>Total Users: {totalUsers}</p>
            <p>New Users: {newUsers}</p>
            <Bar data={userActivityData} />
          </div>
          <div className="chart-card">
            <h2>Task Completion Rate</h2>
            <Line data={taskCompletionRateData} />
          </div>
          <div className="chart-card">
            <h2>Vehicle Management</h2>
            <p>Total Vehicles: {totalVehicles}</p>
            <Pie data={vehicleStatusData} />
          </div>
          <div className="chart-card">
            <h2>Task Summary</h2>
            <p>Total Tasks: {totalTasks}</p>
            <Pie data={taskStatusData} />
          </div>
          <div className="chart-card">
            <button onClick={runEtl}>Run ETL Process</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
