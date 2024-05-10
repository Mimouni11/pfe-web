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

const Dashboard = () => {
  // Sample data for Recharts
  const data = [
    { name: "January", sales: 65 },
    { name: "February", sales: 59 },
    { name: "March", sales: 80 },
    { name: "April", sales: 81 },
    { name: "May", sales: 56 },
    { name: "June", sales: 55 },
    { name: "July", sales: 40 },
  ];

  return (
    <div className="grid-container">
      <Sidebar></Sidebar>
      <div className="container">
        <h2>Dashboard</h2>
        <div className="chart">
          <h3>Recharts Bar Chart</h3>
          <BarChart
            width={500}
            height={300}
            data={data}
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
      </div>
    </div>
  );
};

export default Dashboard;
