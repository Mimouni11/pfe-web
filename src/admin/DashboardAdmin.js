import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import SERVER_URL from "../config";
import Sidebar from "./Sidebar";
import Header from "../chef/Header";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import "./Dashboard.css";

const Dashboard = () => {
  const [usersOverview, setUsersOverview] = useState({});
  const [vehicleMaintenanceOverview, setVehicleMaintenanceOverview] = useState(
    {}
  );
  const [driverTasksOverview, setDriverTasksOverview] = useState({});
  const [mecanoTasksOverview, setMecanoTasksOverview] = useState({});

  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
  }, []);

  return (
    <Box className="grid-container">
      <Sidebar />
      <Header />
      <Container className="main-container" maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={4} className="grid-content">
          <Grid item xs={12} md={6}>
            <Card className="chart-card">
              <CardContent>
                <Typography variant="h6">Users Overview</Typography>
                <Bar
                  data={{
                    labels: ["Total Users", "New Users Last Month"],
                    datasets: [
                      {
                        label: "Users",
                        data: [
                          usersOverview.total_users,
                          usersOverview.new_users_last_month,
                        ],
                        backgroundColor: ["#36a2eb", "#ff6384"],
                      },
                    ],
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className="chart-card">
              <CardContent>
                <Typography variant="h6">
                  Vehicle Maintenance Overview
                </Typography>
                <Bar
                  data={{
                    labels: [
                      "Total Vehicles",
                      "Due for Maintenance",
                      "Repaired Last Month",
                    ],
                    datasets: [
                      {
                        label: "Vehicles",
                        data: [
                          vehicleMaintenanceOverview.total_vehicles,
                          vehicleMaintenanceOverview.vehicles_due_for_maintenance,
                          vehicleMaintenanceOverview.vehicles_repaired_last_month,
                        ],
                        backgroundColor: ["#36a2eb", "#ff6384", "#4bc0c0"],
                      },
                    ],
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className="chart-card">
              <CardContent>
                <Typography variant="h6">Driver Tasks Overview</Typography>
                <Line
                  data={{
                    labels: [
                      "Total Tasks",
                      "Total KM Covered",
                      "Tasks Last Month",
                      "KM Last Month",
                    ],
                    datasets: [
                      {
                        label: "Tasks and KM",
                        data: [
                          driverTasksOverview.total_tasks,
                          driverTasksOverview.total_km_covered,
                          driverTasksOverview.tasks_last_month,
                          driverTasksOverview.km_last_month,
                        ],
                        backgroundColor: "#36a2eb",
                        borderColor: "#36a2eb",
                        fill: false,
                      },
                    ],
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className="chart-card">
              <CardContent>
                <Typography variant="h6">Mecano Tasks Overview</Typography>
                <Bar
                  data={{
                    labels: [
                      "Total Tasks",
                      "Completed Tasks",
                      "Tasks Last Month",
                      "Completed Last Month",
                    ],
                    datasets: [
                      {
                        label: "Tasks",
                        data: [
                          mecanoTasksOverview.total_tasks,
                          mecanoTasksOverview.completed_tasks,
                          mecanoTasksOverview.tasks_last_month,
                          mecanoTasksOverview.completed_last_month,
                        ],
                        backgroundColor: [
                          "#36a2eb",
                          "#ff6384",
                          "#4bc0c0",
                          "#9966ff",
                        ],
                      },
                    ],
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
