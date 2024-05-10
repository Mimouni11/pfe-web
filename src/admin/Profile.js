import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Header from "../chef/Header";
import Sidebar from "./Sidebar";
import SERVER_URL from "../config";
import Edit from "./Edit"; // Import the Edit component

const ProfilePage = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [showEdit, setShowEdit] = useState(false); // State to manage visibility of Edit component
  const username = localStorage.getItem("username"); // Retrieve username from local storage

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Retrieve username from local storage
        const username = localStorage.getItem("username");

        // Make API call to retrieve user info based on username
        const response = await fetch(
          `http://${SERVER_URL}:5001/profile?username=${username}`
        );
        if (response.ok) {
          const data = await response.json();
          setUserInfo(data.profile);
        } else {
          console.error("Failed to fetch user info");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    // Retrieve profile picture URL from local storage
    const storedProfilePicture = localStorage.getItem("profilePictureURL");
    setProfilePicture(storedProfilePicture);
  }, []); // Run once when component mounts

  const handleEditProfile = () => {
    setShowEdit(true); // Show the Edit component when "Edit Profile" button is clicked
  };

  const handleCancelEdit = () => {
    setShowEdit(false); // Hide the Edit component when "Cancel" button is clicked
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid-container">
      <Header />
      <Sidebar />
      <Container className="main-container" style={{ height: "100%" }}>
        <Card style={{ backgroundColor: "#dde6ed" }}>
          <CardContent className="card1">
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar
                alt="User Avatar"
                src={profilePicture || "/default-avatar.jpg"}
                sx={{ width: 100, height: 100 }} // Adjust the width and height of the avatar
              />
              <div style={{ marginLeft: "20px" }}>
                <Typography variant="h4">{userInfo.name}</Typography>
                <Typography variant="subtitle1">
                  Username: {username}
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="card2">
            <Typography variant="subtitle1">Mail: {userInfo.Mail}</Typography>
            <Typography variant="subtitle1">Role: {userInfo.Role}</Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleEditProfile} // Call handleEditProfile when button is clicked
            >
              Edit Profile
            </Button>
          </CardContent>
        </Card>
        {showEdit && <Edit onCancel={handleCancelEdit} />}
      </Container>
    </div>
  );
};

export default ProfilePage;
