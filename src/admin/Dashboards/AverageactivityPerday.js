import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveBar } from "@nivo/bar";
import SERVER_URL from "../../config";

const AverageActivityPerDay = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://${SERVER_URL}:5001/average-activity-per-day`
        );

        const formattedData = response.data.map((item) => ({
          user: `User ${item.user_id}`,
          average_activity: item.average_activity_per_day,
        }));

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

  return (
    <div className="chart-container">
      <h2>Average Activity Per Day</h2>
      <ResponsiveBar
        data={data}
        keys={["average_activity"]}
        indexBy="user"
        margin={{ top: 50, right: 50, bottom: 100, left: 60 }}
        padding={0.3}
        colors={{ scheme: "nivo" }}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 45,
          legend: "User",
          legendPosition: "middle",
          legendOffset: 60,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Average Activity",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};

export default AverageActivityPerDay;
