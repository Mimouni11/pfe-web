import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveChoropleth } from "@nivo/geo";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import Sidebar from "./Sidebar";
import { geoData } from "./world_countries";
import "./dashboard.css";
import SERVER_URL from "../config";

const Dashboard = () => {
  const [activeUsersCount, setActiveUsersCount] = useState([]);
  const [inactiveUsersCount, setInactiveUsersCount] = useState([]);
  const [newUsersCountByDate, setNewUsersCountByDate] = useState([]);
  const [userActivityCount, setUserActivityCount] = useState([]);
  const [averageRetentionRate, setAverageRetentionRate] = useState([]);
  const [userEngagementScore, setUserEngagementScore] = useState([]);
  const [dailyActiveUsers, setDailyActiveUsers] = useState([]);
  const [userChurnRate, setUserChurnRate] = useState([]);
  const [averageActivityPerDay, setAverageActivityPerDay] = useState([]);
  const [usersWithMostActivities, setUsersWithMostActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activeUsersResponse = await axios.get(
          `http://${SERVER_URL}:5001/active-users-count`
        );
        setActiveUsersCount(activeUsersResponse.data);

        const inactiveUsersResponse = await axios.get(
          `http://${SERVER_URL}:5001/inactive-users-count`
        );
        setInactiveUsersCount(inactiveUsersResponse.data);

        const newUsersResponse = await axios.get(
          `http://${SERVER_URL}:5001/new-users-count-by-date`
        );
        setNewUsersCountByDate(newUsersResponse.data);

        const userActivityResponse = await axios.get(
          `http://${SERVER_URL}:5001/user-activity-count`
        );
        setUserActivityCount(userActivityResponse.data);

        const averageRetentionRateResponse = await axios.get(
          `http://${SERVER_URL}:5001/average-retention-rate`
        );
        setAverageRetentionRate(averageRetentionRateResponse.data);

        const userEngagementScoreResponse = await axios.get(
          `http://${SERVER_URL}:5001/user-engagement-score`
        );
        setUserEngagementScore(userEngagementScoreResponse.data);

        const dailyActiveUsersResponse = await axios.get(
          `http://${SERVER_URL}:5001/daily-active-users`
        );
        setDailyActiveUsers(dailyActiveUsersResponse.data);

        const userChurnRateResponse = await axios.get(
          `http://${SERVER_URL}:5001/user-churn-rate`
        );
        setUserChurnRate(userChurnRateResponse.data);

        const averageActivityPerDayResponse = await axios.get(
          `http://${SERVER_URL}:5001/average-activity-per-day`
        );
        setAverageActivityPerDay(averageActivityPerDayResponse.data);

        const usersWithMostActivitiesResponse = await axios.get(
          `http://${SERVER_URL}:5001/users-with-most-activities`
        );
        setUsersWithMostActivities(usersWithMostActivitiesResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid-container">
      <Sidebar />
      <div className="container">
        <h2>Dashboard</h2>
        <div className="dashboard-container">
          <h3>Active Users Count</h3>
          <div className="chart-container">
            <ResponsiveBar
              data={activeUsersCount}
              keys={["active_users_count"]}
              indexBy="status"
              margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
              padding={0.3}
              colors={{ scheme: "nivo" }}
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
              legends={[
                {
                  dataFrom: "keys",
                  anchor: "bottom",
                  direction: "row",
                  justify: false,
                  translateX: 0,
                  translateY: 56,
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

          <h3>Inactive Users Count</h3>
          <div className="chart-container">
            <ResponsivePie
              data={inactiveUsersCount}
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
              legends={[
                {
                  anchor: "bottom",
                  direction: "row",
                  translateY: 56,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: "#999",
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

          <h3>New Users Count by Date</h3>
          <div className="chart-container">
            <ResponsiveBar
              data={newUsersCountByDate}
              keys={["new_users_count"]}
              indexBy="hire_date"
              margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
              padding={0.3}
              colors={{ scheme: "nivo" }}
              borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Hire Date",
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
              legends={[
                {
                  dataFrom: "keys",
                  anchor: "bottom",
                  direction: "row",
                  justify: false,
                  translateX: 0,
                  translateY: 56,
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

          <h3>User Activity Count</h3>
          <div className="chart-container">
            <ResponsiveBar
              data={userActivityCount}
              keys={["activity_count"]}
              indexBy="user_id"
              margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
              padding={0.3}
              colors={{ scheme: "nivo" }}
              borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "User ID",
                legendPosition: "middle",
                legendOffset: 32,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Activity Count",
                legendPosition: "middle",
                legendOffset: -40,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
              legends={[
                {
                  dataFrom: "keys",
                  anchor: "bottom",
                  direction: "row",
                  justify: false,
                  translateX: 0,
                  translateY: 56,
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

          <h3>Average Retention Rate</h3>
          <div className="chart-container">
            <ResponsivePie
              data={averageRetentionRate}
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
              legends={[
                {
                  anchor: "bottom",
                  direction: "row",
                  translateY: 56,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: "#999",
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

          <h3>User Engagement Score</h3>
          <div className="chart-container">
            <ResponsiveBar
              data={userEngagementScore}
              keys={["engagement_score"]}
              indexBy="user_id"
              margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
              padding={0.3}
              colors={{ scheme: "nivo" }}
              borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "User ID",
                legendPosition: "middle",
                legendOffset: 32,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Engagement Score",
                legendPosition: "middle",
                legendOffset: -40,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
              legends={[
                {
                  dataFrom: "keys",
                  anchor: "bottom",
                  direction: "row",
                  justify: false,
                  translateX: 0,
                  translateY: 56,
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

          <h3>Daily Active Users</h3>
          <div className="chart-container">
            <ResponsiveBar
              data={dailyActiveUsers}
              keys={["daily_active_users"]}
              indexBy="date_key"
              margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
              padding={0.3}
              colors={{ scheme: "nivo" }}
              borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Date",
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
              legends={[
                {
                  dataFrom: "keys",
                  anchor: "bottom",
                  direction: "row",
                  justify: false,
                  translateX: 0,
                  translateY: 56,
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

          <h3>User Churn Rate</h3>
          <div className="chart-container">
            <ResponsivePie
              data={userChurnRate}
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
              legends={[
                {
                  anchor: "bottom",
                  direction: "row",
                  translateY: 56,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: "#999",
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

          <h3>Average Activity Per Day</h3>
          <div className="chart-container">
            <ResponsiveBar
              data={averageActivityPerDay}
              keys={["average_activity_per_day"]}
              indexBy="user_id"
              margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
              padding={0.3}
              colors={{ scheme: "nivo" }}
              borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "User ID",
                legendPosition: "middle",
                legendOffset: 32,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Average Activity Per Day",
                legendPosition: "middle",
                legendOffset: -40,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
              legends={[
                {
                  dataFrom: "keys",
                  anchor: "bottom",
                  direction: "row",
                  justify: false,
                  translateX: 0,
                  translateY: 56,
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

          <h3>Users With Most Activities</h3>
          <div className="chart-container">
            <ResponsiveBar
              data={usersWithMostActivities}
              keys={["activity_count"]}
              indexBy="user_id"
              margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
              padding={0.3}
              colors={{ scheme: "nivo" }}
              borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "User ID",
                legendPosition: "middle",
                legendOffset: 32,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Activity Count",
                legendPosition: "middle",
                legendOffset: -40,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
              legends={[
                {
                  dataFrom: "keys",
                  anchor: "bottom",
                  direction: "row",
                  justify: false,
                  translateX: 0,
                  translateY: 56,
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
