import React, { useState } from "react";
import Select from "react-select";
import Sidebar from "./Sidebar";
import ActiveUsersCountDashboard from "./Dashboards/usersCountDashboard";
import NewUsersCountByDateDashboard from "./Dashboards/newusersperdate";
import DailyActiveUsersDashboard from "./Dashboards/DailyActiveUsersDashboard";
import AverageActivityPerDay from "./Dashboards/AverageactivityPerday";
import ActiveToTotalUsersRatio from "./Dashboards/Activetotalusers";
import VehicleMaintenanceChart from "./Dashboards/Vehicules/VehiculeMaintennancechart";
import "./Dashboard.css";
import VehicleMaintenanceTable from "./Dashboards/Vehicules/VehiculeMaintenancetable";
const options = [
  { value: "userManagement", label: "User Management" },
  { value: "vehicleManagement", label: "Vehicle Management" },
  { value: "driverTasks", label: "Driver Tasks" },
  { value: "mecanoTasks", label: "Mecano Tasks" },
];

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  return (
    <div className="grid-container">
      <Sidebar />
      <div className="main-container">
        <h2>Dashboard</h2>
        <Select
          value={selectedOption}
          onChange={handleChange}
          options={options}
          className="dashboard-select"
        />
        <div className="dashboard-container">
          {selectedOption.value === "vehicleManagement" ? (
            <>
              <VehicleMaintenanceChart />
              <VehicleMaintenanceTable />
            </>
          ) : (
            <>
              <div>
                <ActiveUsersCountDashboard />
              </div>
              <div>
                <ActiveToTotalUsersRatio />
              </div>
              <div>
                <NewUsersCountByDateDashboard />
              </div>
              <div>
                <DailyActiveUsersDashboard />
              </div>
              <div>
                <AverageActivityPerDay />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
