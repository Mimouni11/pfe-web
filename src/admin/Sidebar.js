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
const Sidebar = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook

  const toggleSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const navigateUsers = () => {
    navigate("/Users"); // Navigate to "/qr-code" when the button is clicked
  };
  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");

    // Redirect to the login page
    navigate("/Login");
  };

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
      style={{ backgroundColor: "#dde6ed" }}
    >
      {/* Shop title and Menu icon */}
      <div className="sidebar-title" onClick={toggleSidebar}>
        {!openSidebarToggle && (
          <div className="sidebar-brand">
            <img className="logo" src="/logo.png" alt="Logo" /> sawekji
          </div>
        )}
        <MenuIcon className="menu-icon" />
      </div>

      {/* Sidebar icons */}
      <ul className="sidebar-list">
        {!openSidebarToggle && (
          <>
            <li className="sidebar-list-item">
              <a href="">
                <DashboardIcon className="icon" /> Dashboard
              </a>
            </li>
            <li className="sidebar-list-item" onClick={navigateUsers}>
              <PeopleIcon className="icon" /> utilisateurs
            </li>
            <li className="sidebar-list-item">
              <BsFillGrid3X3GapFill className="icon" />
              <Select
                labelId="category-label"
                id="category-select"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="select-dropdown"
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Create tasks
                </MenuItem>
                <MenuItem value="category1">Category 1</MenuItem>
                <MenuItem value="category2">Category 2</MenuItem>
                <MenuItem value="category3">Category 3</MenuItem>
              </Select>
            </li>

            <li className="sidebar-list-item">
              <a href="">
                <BsFillGearFill className="icon" /> Setting
              </a>
            </li>
          </>
        )}
      </ul>
      <div className="logout-container">
        <ul>
          <li className="sidebar-list-item" onClick={handleLogout}>
            <LogoutIcon className="logout-icon" />
            Deconnexion
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
