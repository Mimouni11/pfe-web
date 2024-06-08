import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveBar } from "@nivo/bar";
import SERVER_URL from "../../../config";

const VehicleMaintenanceBarChart = ({ vehicleId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://${SERVER_URL}:5001/vehicle-maintenance-by-vehicle/${vehicleId}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching the data", error);
      }
    };

    fetchData();
  }, [vehicleId]);

  // Prepare data for the chart
  const chartData = data
    .filter((item) => item.last_maintenance_date_key)
    .map((item) => ({
      date: new Date(item.last_maintenance_date_key)
        .toISOString()
        .split("T")[0], // Ensuring the date is properly formatted
      interval: item.maintenance_interval,
    }))
    .filter((item) => !isNaN(new Date(item.date).getTime())); // Filtering out invalid dates

  // Check if chartData is empty
  if (chartData.length === 0) {
    return <div>No data available for vehicle {vehicleId}</div>;
  }

  return (
    <div style={{ height: 400 }}>
      <h2>Maintenance Interval Trend for Vehicle {vehicleId}</h2>
      <ResponsiveBar
        data={chartData}
        keys={["interval"]}
        indexBy="date"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        axisBottom={{
          format: "%Y-%m-%d",
          tickValues: "every 1 month",
          legend: "Last Maintenance Date",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          legend: "Maintenance Interval",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        enableGridX
        enableGridY
      />
    </div>
  );
};

export default VehicleMaintenanceBarChart;
