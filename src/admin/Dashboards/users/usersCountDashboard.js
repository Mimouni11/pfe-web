import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveBar } from "@nivo/bar";
import SERVER_URL from "../../../config";

const ActiveUsersCountDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activeUsersResponse = await axios.get(
          `http://${SERVER_URL}:5001/active-users-count`
        );
        const inactiveUsersResponse = await axios.get(
          `http://${SERVER_URL}:5001/inactive-users-count`
        );

        const data = [
          {
            status: "active",
            count: activeUsersResponse.data[0].active_users_count,
          },
          {
            status: "inactive",
            count: inactiveUsersResponse.data[0].inactive_users_count,
          },
        ];

        setData(data);
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
      <h2>Active vs Inactive Users Count</h2>
      <ResponsiveBar
        data={data}
        keys={["count"]}
        indexBy="status"
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: "blues" }}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Status",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Count",
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

export default ActiveUsersCountDashboard;
