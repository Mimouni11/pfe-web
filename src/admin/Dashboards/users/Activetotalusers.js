import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResponsivePie } from "@nivo/pie";
import SERVER_URL from "../../../config";

const ActiveToTotalUsersRatio = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://${SERVER_URL}:5001/active-to-total-users-ratio`
        );
        const { active_users_count, inactive_users_count, total_users_count } =
          response.data;

        const activePercentage = (
          (active_users_count / total_users_count) *
          100
        ).toFixed(2);
        const inactivePercentage = (
          (inactive_users_count / total_users_count) *
          100
        ).toFixed(2);

        const formattedData = [
          {
            id: "Active Users",
            label: "Active Users",
            value: parseFloat(activePercentage),
            percentage: `${activePercentage}%`,
          },
          {
            id: "Inactive Users",
            label: "Inactive Users",
            value: parseFloat(inactivePercentage),
            percentage: `${inactivePercentage}%`,
          },
        ];

        setData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  console.log("Data:", data);

  return (
    <div className="chart-container" style={{ height: "400px", width: "100%" }}>
      <h2>Active to Total Users Ratio</h2>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: "blues" }}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextColor="#333333"
        radialLabelsLinkColor={{ from: "color" }}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        sliceLabel={(d) => `${d.value}%`}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
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

export default ActiveToTotalUsersRatio;
