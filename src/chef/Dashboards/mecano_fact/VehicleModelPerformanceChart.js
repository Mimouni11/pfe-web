import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveSunburst } from "@nivo/sunburst";
import SERVER_URL from "../../../config";

const VehicleModelPerformanceSunburstChart = () => {
  const [vehicleModelPerformance, setVehicleModelPerformance] = useState([]);

  useEffect(() => {
    fetchVehicleModelPerformance();
  }, []);

  const fetchVehicleModelPerformance = async () => {
    try {
      const response = await axios.get(
        `http://${SERVER_URL}:5001/vehicle-model-performance`
      );
      console.log("Response data:", response.data); // Log the data to see its structure
      if (Array.isArray(response.data)) {
        setVehicleModelPerformance(response.data);
      } else {
        console.error("Unexpected response data format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching vehicle model performance data:", error);
    }
  };

  // Group data by mechanic and vehicle model
  const groupedData = vehicleModelPerformance.reduce((acc, item) => {
    const mechanic = acc.find((child) => child.name === item.username);

    if (mechanic) {
      mechanic.children.push({
        name: item.vehicle_model,
        value: item.tasks_done_per_model,
      });
    } else {
      acc.push({
        name: item.username,
        children: [
          {
            name: item.vehicle_model,
            value: item.tasks_done_per_model,
          },
        ],
      });
    }

    return acc;
  }, []);

  const data = {
    name: "Mechanics",
    children: groupedData,
  };

  return (
    <div style={{ height: 500 }}>
      <h1>
        Taux de réparation des véhicules par catégorie pour chaque mécanicien
      </h1>
      <ResponsiveSunburst
        data={data}
        margin={{ top: 40, right: 20, bottom: 20, left: 20 }}
        id="name"
        value="value"
        cornerRadius={2}
        borderWidth={1}
        borderColor={{ theme: "background" }}
        colors={{ scheme: "purple_blue" }}
        childColor={{
          from: "color",
          modifiers: [["brighter", 0.1]],
        }}
        enableArcLabels={true}
        arcLabel="id"
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 1.4]] }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 14,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 10,
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default VehicleModelPerformanceSunburstChart;
