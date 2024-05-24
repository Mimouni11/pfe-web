import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Sidebar from "./Sidebar";
import HeatMap from "./HeatMap"; // Import the HeatMap component
import "./tasks.css"; // Ensure the CSS file is imported

const Dashboard = () => {
  // Sample data for Recharts
  const barChartData = [
    { name: "January", sales: 65 },
    { name: "February", sales: 59 },
    { name: "March", sales: 80 },
    { name: "April", sales: 81 },
    { name: "May", sales: 56 },
    { name: "June", sales: 55 },
    { name: "July", sales: 40 },
  ];

  // Sample data for HeatMap
  const heatMapData = [
    { lat: 36.7580942, lng: 10.2820641, density: 1 },
    { lat: 36.7649158, lng: 10.2443758, density: 1 },
    { lat: 36.7649274, lng: 10.2443803, density: 1 },
    { lat: 36.7643875, lng: 10.2812212, density: 1 },
    { lat: 36.7333, lng: 9.1844, density: 1 },
  ];

  // Center of the heat map on Tunisia
  const heatMapCenter = [33.8869, 9.5375]; // Center coordinates for Tunisia

  return (
    <div className="grid-container">
      <Sidebar />
      <div className="container">
        <h2>Dashboard</h2>
        <div className="chart">
          <h3>Recharts Bar Chart</h3>
          <BarChart
            width={500}
            height={300}
            data={barChartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" />
          </BarChart>
        </div>
        <div className="map">
          <h3>Driver Heat Map</h3>
          <HeatMap data={heatMapData} center={heatMapCenter} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
