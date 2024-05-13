import React, { useState } from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";
import "./Sidebar.css";
import { Select, MenuItem, InputLabel } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import LogoutIcon from "@mui/icons-material/Logout";
import QrCodeIcon from "@mui/icons-material/QrCode";
import MapIcon from "@mui/icons-material/Map";
const Sidebar = ({ darkMode }) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook
  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");

    // Redirect to the login page
    navigate("/Login");
  };

  const toggleSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;

    // Redirect based on selected category
    switch (selectedCategory) {
      case "category1":
        navigate("/chef/Driver_tasks");
        break;
      case "category2":
        navigate("/chef/Mecano_tasks");
        break;
      default:
        // Do nothing if no category is selected
        break;
    }
  };

  const navigateToQRCode = () => {
    navigate("/chef/QrCode"); // Navigate to "/qr-code" when the button is clicked
  };

  const navigateToTasks = () => {
    navigate("/chef/tasks"); // Navigate to "/qr-code" when the button is clicked
  };

  const navigateToDashboard = () => {
    navigate("/chef/Dashboard");
  };

  const navigateToMap = () => {
    navigate("/chef/Tracking");
  };

  if (openSidebarToggle)
    return (
      <aside
        id="sidebar"
        className={darkMode ? "sidebar-dark" : ""}
        style={{ backgroundColor: "#dde6ed" }}
      >
        <div>
          <div className="sidebar-title" onClick={toggleSidebar}>
            <div className="sidebar-brand">
              <img className="logo" src="/logo.png" alt="Logo" />
            </div>

            <MenuIcon className="menu-icon" />
          </div>

          <div className="sidebar-list">
            <a className="sidebar-list-item" onClick={navigateToDashboard}>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </a>
            <a className="sidebar-list-item" onClick={navigateToQRCode}>
              <QrCodeIcon className="icon" />
              <span>QR Code </span>
            </a>
            <a className="sidebar-list-item" onClick={navigateToTasks}>
              <BsFillGrid3X3GapFill className="icon" />
              <span>Créer des tâches </span>
            </a>
            <a className="sidebar-list-item" onClick={navigateToMap}>
              <MapIcon className="icon" />
              <span>map </span>
            </a>
          </div>
        </div>
        <div className="logout-container">
          <li className="sidebar-list-item" onClick={handleLogout}>
            <LogoutIcon className="logout-icon" />
            <span>Deconnexion</span>
          </li>
        </div>
      </aside>
    );
  else return <></>;
};

export default Sidebar;
