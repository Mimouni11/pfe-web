import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResponsivePie } from "@nivo/pie";
import SERVER_URL from "../../../config";

const VehicleMaintenancePieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://${SERVER_URL}:5001/vehicle-maintenance-count`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching the data", error);
      }
    };

    fetchData();
  }, []);

  // Prepare data for the chart
  const chartData = data.map((item) => ({
    id: `Vehicle ${item.vehicle_id}`,
    label: `Vehicle ${item.vehicle_id}`,
    value: item.maintenance_count,
  }));

  // Check if chartData is empty
  if (chartData.length === 0) {
    return <div>No maintenance data available</div>;
  }

  return (
    <div style={{ height: 400 }}>
      <h2>Maintenance Count for Each Vehicle</h2>
      <ResponsivePie
        data={chartData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: "nivo" }}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: "color" }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};

export default VehicleMaintenancePieChart;
