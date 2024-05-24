import React, { useState } from "react";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Typography, Modal, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ darkMode }) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Login");
  };

  const profilePictureURL =
    localStorage.getItem("profilePictureURL") || "/default-profile-picture.jpg";

  const toggleSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const navigateToUsers = () => {
    navigate("/admin/Users");
  };

  const navigateToVehicules = () => {
    navigate("/admin/Vehicules");
  };

  const navigateToHome = () => {
    navigate("/admin/Home");
  };

  const navigateToSeeTasks = () => {
    navigate("/admin/SeeTasks");
  };

  const navigateAdminTasks = () => {
    navigate("/admin/AdminTasks");
  };

  const navigateAdminTasksdriver = () => {
    navigate("/admin/AdminTasksdriver");
  };

  const navigateToProfile = () => {
    setShowConfirmation(true);
  };

  const goprofile = () => {
    navigate("/admin/Profile");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result;
        localStorage.setItem("profilePictureURL", dataURL);
      };
      reader.readAsDataURL(file);
    }

    setShowConfirmation(false);
  };

  return (
    <aside id="sidebar" className={darkMode ? "sidebar-dark" : ""}>
      <div className="sidebar-content">
        <div className="sidebar-title" onClick={toggleSidebar}>
          <div className="sidebar-brand">
            <img className="logo" src="/logo.png" alt="Logo" />
          </div>
        </div>

        <div className="profile-container">
          <Box display="flex" justifyContent="center" alignItems="center">
            <label htmlFor="profile-picture-input">
              <img
                alt="profile-user"
                width="100px"
                height="100px"
                src={profilePictureURL}
                className="profile-picture"
                onClick={navigateToProfile}
              />
            </label>
          </Box>
          <Box textAlign="center">
            <Typography variant="h5" className="profile-name"></Typography>
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
          <a className="sidebar-list-item" onClick={navigateAdminTasks}>
            <BsFillGrid3X3GapFill className="icon" />
            <span>Pending Tasks mecano</span>
          </a>
          <a className="sidebar-list-item" onClick={navigateAdminTasksdriver}>
            <BsFillGrid3X3GapFill className="icon" />
            <span>Pending Tasks driver</span>
          </a>
          <a className="sidebar-list-item" onClick={navigateToSeeTasks}>
            <BsFillGrid3X3GapFill className="icon" />
            <span>Tasks</span>
          </a>
        </div>

        <div className="logout-container">
          <li className="sidebar-list-item logout-item" onClick={handleLogout}>
            <LogoutIcon className="logout-icon" />
            <span>Deconnexion</span>
          </li>
        </div>
      </div>

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
