import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveBar } from "@nivo/bar";
import SERVER_URL from "../../../config";

const MechanicPerformanceChart = () => {
  const [mechanicPerformance, setMechanicPerformance] = useState([]);

  useEffect(() => {
    fetchMechanicPerformance();
  }, []);

  const fetchMechanicPerformance = async () => {
    try {
      const response = await axios.get(
        `http://${SERVER_URL}:5001/mechanic-performance`
      );
      setMechanicPerformance(response.data);
    } catch (error) {
      console.error("Error fetching mechanic performance data:", error);
    }
  };

  const data = mechanicPerformance.map((item) => ({
    username: item.username,
    totalTasks: item.total_tasks,
    totalDoneTasks: item.total_done_tasks,
    percentageTasksDone: item.percentage_tasks_done,
  }));

  return (
    <div style={{ height: 400 }}>
      <ResponsiveBar
        data={data}
        keys={["totalTasks", "totalDoneTasks"]}
        indexBy="username"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "blues" }}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Mechanic",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Tasks",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};

export default MechanicPerformanceChart;
