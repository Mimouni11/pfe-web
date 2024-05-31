import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import SERVER_URL from "../config";
import Sidebar from "./Sidebar";
import Header from "../chef/Header";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";

const Dashboard = () => {
  const [usersOverview, setUsersOverview] = useState({});
  const [vehicleMaintenanceOverview, setVehicleMaintenanceOverview] = useState(
    {}
  );
  const [driverTasksOverview, setDriverTasksOverview] = useState({});
  const [mecanoTasksOverview, setMecanoTasksOverview] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await axios.get(
          `http://${SERVER_URL}:5001/api/users_overview`
        );
        setUsersOverview(usersData.data[0]);

        const vehicleData = await axios.get(
          `http://${SERVER_URL}:5001/api/vehicle_maintenance_overview`
        );
        setVehicleMaintenanceOverview(vehicleData.data[0]);

        const driverTasksData = await axios.get(
          `http://${SERVER_URL}:5001/api/driver_tasks_overview`
        );
        setDriverTasksOverview(driverTasksData.data[0]);

        const mecanoTasksData = await axios.get(
          `http://${SERVER_URL}:5001/api/mecano_tasks_overview`
        );
        setMecanoTasksOverview(mecanoTasksData.data[0]);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box className="grid-container">
      <Sidebar />
      <Header />
      <div className="main-container">
        {" "}
        <Container>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
          <Grid container spacing={4} className="grid-content">
            <Grid item xs={12} md={6}>
              <Paper elevation={3} style={{ padding: "16px" }}>
                <Typography variant="h6" gutterBottom>
                  Users Overview
                </Typography>
                <div style={{ height: 400 }}>
                  <ResponsiveBar
                    data={[
                      {
                        id: "Total Users",
                        value: usersOverview.total_users,
                      },
                      {
                        id: "New Users Last Month",
                        value: usersOverview.new_users_last_month,
                      },
                    ]}
                    keys={["value"]}
                    indexBy="id"
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                    padding={0.3}
                    colors={{ scheme: "nivo" }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "User Type",
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
                    labelTextColor={{
                      from: "color",
                      modifiers: [["darker", 1.6]],
                    }}
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
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} style={{ padding: "16px" }}>
                <Typography variant="h6" gutterBottom>
                  Vehicle Maintenance Overview
                </Typography>
                <div style={{ height: 400 }}>
                  <ResponsiveBar
                    data={[
                      {
                        id: "Total Vehicles",
                        value: vehicleMaintenanceOverview.total_vehicles,
                      },
                      {
                        id: "Due for Maintenance",
                        value:
                          vehicleMaintenanceOverview.vehicles_due_for_maintenance,
                      },
                      {
                        id: "Repaired Last Month",
                        value:
                          vehicleMaintenanceOverview.vehicles_repaired_last_month,
                      },
                    ]}
                    keys={["value"]}
                    indexBy="id"
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                    padding={0.3}
                    colors={{ scheme: "nivo" }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "Vehicle Status",
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
                    labelTextColor={{
                      from: "color",
                      modifiers: [["darker", 1.6]],
                    }}
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
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} style={{ padding: "16px" }}>
                <Typography variant="h6" gutterBottom>
                  Driver Tasks Overview
                </Typography>
                <div style={{ height: 400 }}>
                  <ResponsiveLine
                    data={[
                      {
                        id: "Tasks and KM",
                        data: [
                          {
                            x: "Total Tasks",
                            y: driverTasksOverview.total_tasks,
                          },
                          {
                            x: "Total KM Covered",
                            y: driverTasksOverview.total_km_covered,
                          },
                          {
                            x: "Tasks Last Month",
                            y: driverTasksOverview.tasks_last_month,
                          },
                          {
                            x: "KM Last Month",
                            y: driverTasksOverview.km_last_month,
                          },
                        ],
                      },
                    ]}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{ type: "point" }}
                    yScale={{
                      type: "linear",
                      min: "auto",
                      max: "auto",
                      stacked: true,
                      reverse: false,
                    }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "Metric",
                      legendOffset: 36,
                      legendPosition: "middle",
                    }}
                    axisLeft={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "Value",
                      legendOffset: -40,
                      legendPosition: "middle",
                    }}
                    colors={{ scheme: "nivo" }}
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
                  />
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} style={{ padding: "16px" }}>
                <Typography variant="h6" gutterBottom>
                  Mecano Tasks Overview
                </Typography>
                <div style={{ height: 400 }}>
                  <ResponsiveLine
                    data={[
                      {
                        id: "Tasks and Hours",
                        data: [
                          {
                            x: "Total Tasks",
                            y: mecanoTasksOverview.total_tasks,
                          },
                          {
                            x: "Total Hours",
                            y: mecanoTasksOverview.total_hours,
                          },
                          {
                            x: "Tasks Last Month",
                            y: mecanoTasksOverview.tasks_last_month,
                          },
                          {
                            x: "Hours Last Month",
                            y: mecanoTasksOverview.hours_last_month,
                          },
                        ],
                      },
                    ]}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{ type: "point" }}
                    yScale={{
                      type: "linear",
                      min: "auto",
                      max: "auto",
                      stacked: true,
                      reverse: false,
                    }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "Metric",
                      legendOffset: 36,
                      legendPosition: "middle",
                    }}
                    axisLeft={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "Value",
                      legendOffset: -40,
                      legendPosition: "middle",
                    }}
                    colors={{ scheme: "nivo" }}
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
                  />
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Box>
  );
};

export default Dashboard;
