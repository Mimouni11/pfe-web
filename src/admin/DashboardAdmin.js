import React, { useState } from "react";
import Select from "react-select";
import Sidebar from "./Sidebar";
import ActiveUsersCountDashboard from "./Dashboards/users/usersCountDashboard";
import NewUsersCountByDateDashboard from "./Dashboards/users/newusersperdate";
import DailyActiveUsersDashboard from "./Dashboards/users/DailyActiveUsersDashboard";
import AverageActivityPerDay from "./Dashboards/users/AverageactivityPerday";
import ActiveToTotalUsersRatio from "./Dashboards/users/Activetotalusers";
import VehicleMaintenanceChart from "./Dashboards/Vehicules/VehiculeMaintennancechart";
import VehicleMaintenanceTable from "./Dashboards/Vehicules/VehiculeMaintenancetable";
import VehicleMaintenancePieChart from "./Dashboards/Vehicules/VehicleMaintenancePieChart";
import VehicleMaintenancePieChartmodel from "./Dashboards/Vehicules/Vehiclemaintenancemodel";
import VehicleStatusPieChart from "./Dashboards/Vehicules/VehicleStatusPieChart";
import DriversList from "./Dashboards/Driver_fact/Drivers_list";
import DriverTasksList from "./Dashboards/Driver_fact/Driver_tasks";
import "./Dashboard.css";
import Kilometrage from "./Dashboards/Driver_fact/Kilmotrage";
import Destination_count from "./Dashboards/Driver_fact/destinations_count";
import MechanicPerformanceChart from "./Dashboards/mecano_fact/mecanoperformance";
import VehicleModelPerformanceRadialBarChar from "./Dashboards/mecano_fact/VehicleModelPerformanceChart";
import TaskDetails from "./Dashboards/mecano_fact/TasksList";
import TasksDoneOverTimeChart from "./Dashboards/mecano_fact/TasksDoneOverTimeChart";
const options = [
  { value: "userManagement", label: "User Management" },
  { value: "vehicleManagement", label: "Vehicle Management" },
  { value: "driverTasks", label: "Driver Tasks" },
  { value: "mecanoTasks", label: "Mecano Tasks" },
];

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleSelectVehicle = (vehicleId) => {
    setSelectedVehicle(vehicleId);
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
              {selectedVehicle && (
                <VehicleMaintenanceChart vehicleId={selectedVehicle} />
              )}
              <VehicleMaintenanceTable onSelectVehicle={handleSelectVehicle} />
              <VehicleMaintenancePieChart />
              <VehicleMaintenancePieChartmodel />
              <VehicleStatusPieChart />
            </>
          ) : selectedOption.value === "driverTasks" ? (
            <div className="driver-tasks-container">
              <div className="drivers-list-container">
                <DriversList className="data-grid" />
              </div>
              <div className="driver-tasks-list-container">
                <DriverTasksList className="data-grid" />
              </div>
              <Kilometrage></Kilometrage>
              <Destination_count></Destination_count>
            </div>
          ) : selectedOption.value === "mecanoTasks" ? (
            <>
              <MechanicPerformanceChart></MechanicPerformanceChart>
              <VehicleModelPerformanceRadialBarChar></VehicleModelPerformanceRadialBarChar>
              <TasksDoneOverTimeChart></TasksDoneOverTimeChart>
              <TaskDetails></TaskDetails>
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
