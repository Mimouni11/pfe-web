import React from "react";
import Sidebar from "./Sidebar";
import ActiveUsersCountDashboard from "./Dashboards/usersCountDashboard";
import NewUsersCountByDateDashboard from "./Dashboards/newusersperdate";
import DailyActiveUsersDashboard from "./Dashboards/DailyActiveUsersDashboard";
import AverageActivityPerDay from "./Dashboards/AverageactivityPerday";
import ActiveToTotalUsersRatio from "./Dashboards/Activetotalusers";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="grid-container">
      <Sidebar />
      <div className="main-container">
        <h2>Dashboard</h2>
        <div className="dashboard-container">
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
