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
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";
import "./Sidebar.css";
import { Select, MenuItem, InputLabel } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import LogoutIcon from "@mui/icons-material/Logout";
import QrCodeIcon from "@mui/icons-material/QrCode";

import {
  Box,
  IconButton,
  Typography,
  useTheme,
  Modal,
  Button,
} from "@mui/material";

const Sidebar = ({ darkMode }) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // State to store the selected file
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");

    // Redirect to the login page
    navigate("/Login");
  };

  const profilePictureURL =
    localStorage.getItem("profilePictureURL") || "/default-profile-picture.jpg";

  const toggleSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const navigateToUsers = () => {
    navigate("/admin/Users"); // Navigate to "/qr-code" when the button is clicked
  };

  const navigateToVehicules = () => {
    navigate("/admin/Vehicules"); // Navigate to "/qr-code" when the button is clicked
  };
  const navigateToHome = () => {
    navigate("/admin/Home"); // Navigate to "/qr-code" when the button is clicked
  };
  const navigateToSeeTasks = () => {
    navigate("/admin/SeeTasks"); // Navigate to "/qr-code" when the button is clicked
  };
  const navigateToProfile = () => {
    setShowConfirmation(true); // Show the confirmation box
  };

  const goprofile = () => {
    navigate("/admin/Profile");
  };

  const confirmChangeProfilePicture = () => {
    setShowConfirmation(true); // Show the confirmation box
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    setSelectedFile(file); // Update the selectedFile state with the selected file

    if (file) {
      const reader = new FileReader(); // Create a FileReader object
      reader.onload = () => {
        const dataURL = reader.result; // Get the data URL representing the file
        localStorage.setItem("profilePictureURL", dataURL); // Update localStorage with the new profile picture URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }

    setShowConfirmation(false); // Close the confirmation box
  };
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

        <div className="profile-container">
          <Box display="flex" justifyContent="center" alignItems="center">
            <label htmlFor="profile-picture-input">
              <img
                alt="profile-user"
                width="100px"
                height="100px"
                src={profilePictureURL}
                style={{ cursor: "pointer", borderRadius: "50%" }}
                onClick={navigateToProfile}
              />
            </label>
          </Box>
          <Box textAlign="center">
            <Typography
              variant="h3"
              sx={{ m: "10px 10px 10px 10px" }}
            ></Typography>
            <Typography>
              <a className="modif" onClick={goprofile}>
                Modifier profile
              </a>
            </Typography>
          </Box>
        </div>

        <div className="sidebar-list">
          <a className="sidebar-list-item" onClick={navigateToHome}>
            <HomeIcon className="icon" />
            <span>Home</span>
          </a>
          <a className="sidebar-list-item">
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </a>
          <a className="sidebar-list-item" onClick={navigateToUsers}>
            <BsFillGrid3X3GapFill className="icon" />
            <span>Gérer utilisateurs</span>
          </a>
          <a className="sidebar-list-item" onClick={navigateToVehicules}>
            <BsFillGrid3X3GapFill className="icon" />
            <span>Gérer vehicules</span>
          </a>
          <a className="sidebar-list-item" onClick={navigateToSeeTasks}>
            <BsFillGrid3X3GapFill className="icon" />
            <span>Tasks</span>
          </a>
        </div>
      </div>
      <div className="logout-container">
        <li className="sidebar-list-item" onClick={handleLogout}>
          <LogoutIcon className="logout-icon" />
          <span>Deconnexion</span>
        </li>
      </div>

      {/* Confirmation box for changing profile picture */}
      <Modal open={showConfirmation} onClose={() => setShowConfirmation(false)}>
        <div className="confirmation-box">
          <h2>Do you want to change the profile picture?</h2>
          <input
            type="file"
            id="profile-picture-input-modal"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <label htmlFor="profile-picture-input-modal">
            <Button variant="contained" component="span" sx={{ mr: 2 }}>
              Yes
            </Button>
          </label>
          <Button
            variant="contained"
            onClick={() => setShowConfirmation(false)}
          >
            No
          </Button>
        </div>
      </Modal>
    </aside>
  );
};

export default Sidebar;
