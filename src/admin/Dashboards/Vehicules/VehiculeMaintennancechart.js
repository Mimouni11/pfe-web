import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "@nivo/line";
import SERVER_URL from "../../../config";

const VehicleMaintenanceChart = ({ vehicleId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://${SERVER_URL}:5001/vehicle-maintenance-fact`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching the data", error);
      }
    };

    fetchData();
  }, [vehicleId]); // Add vehicleId as a dependency

  // Filter data for the specific vehicle
  const filteredData = data.filter((item) => item.vehicle_id === vehicleId);

  // Prepare data for the chart
  const chartData = filteredData
    .filter((item) => item.last_maintenance_date_key) // Filter out items with undefined or null last_maintenance_date_key
    .map((item) => ({
      x: item.last_maintenance_date_key,
      y: item.maintenance_interval,
    }));

  // Check if chartData is empty
  if (chartData.length === 0) {
    return <div>No data available for vehicle {vehicleId}</div>;
  }

  return (
    <div style={{ height: 400 }}>
      <h2>Maintenance Interval Trend for Vehicle {vehicleId}</h2>
      <Line
        data={[
          {
            id: `Vehicle ${vehicleId}`,
            data: chartData,
          },
        ]}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "time", format: "%Y-%m-%d" }}
        xFormat="time:%Y-%m-%d"
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        axisBottom={{
          format: "%b %d",
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

export default VehicleMaintenanceChart;
