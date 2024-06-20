import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveLine } from "@nivo/line";
import SERVER_URL from "../../../config";

const TasksDoneOverTimeChart = () => {
  const [tasksData, setTasksData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasksData();
  }, []);

  const fetchTasksData = async () => {
    try {
      const response = await axios.get(
        `http://${SERVER_URL}:5001/tasks-done-over-time`
      );
      console.log("Response data:", response.data);
      setTasksData(formatDataForChart(response.data));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks data:", error);
      setLoading(false);
    }
  };

  const formatDataForChart = (data) => {
    const formattedData = [
      {
        id: "Done Tasks",
        data: data.map((item) => ({
          x: item.task_date_key,
          y: item.done_tasks,
        })),
      },
      {
        id: "Total Tasks",
        data: data.map((item) => ({
          x: item.task_date_key,
          y: item.total_tasks,
        })),
      },
    ];
    return formattedData;
  };

  return (
    <div style={{ height: 500, marginTop: "4%" }}>
      <h1>Tâches accomplie au fil du temps</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ResponsiveLine
          data={tasksData}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            legend: "Date",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            legend: "Number of Tasks",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          colors={{ scheme: "category10" }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      )}
    </div>
  );
};

export default TasksDoneOverTimeChart;
