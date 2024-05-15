import React, { useState, useEffect } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import axios from "axios";
import SERVER_URL from "../config";

const NotificationDropdown = ({ open, handleClose }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const username = localStorage.getItem("username");
      const response = await axios.get(
        `http://${SERVER_URL}:5001/Get_notifications?username=${username}`
      );
      setNotifications(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  return (
    <Menu
      id="notification-dropdown"
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={open}
      onClose={handleClose}
    >
      {notifications.map((notification, index) => (
        <MenuItem key={index}>
          <NotificationsIcon />
          <div>
            <strong>{notification.title}</strong>
            <p>{notification.content}</p>
          </div>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default NotificationDropdown;
