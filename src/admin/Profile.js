import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "../chef/Header";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { Modal, Button, TextField } from "@mui/material"; // Import Modal, Button, and TextField from Material-UIimport SERVER_URL from "../config";
import SidebarC from "../chef/Sidebar";
import axios from "axios"; // Import Axios
import SERVER_URL from "../config";
const UserProfile = () => {
  const [showConfirmation, setShowConfirmation] = useState(false); // State to manage the visibility of the confirmation box
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false); // State to manage the visibility of the change password modal
  const [oldPassword, setOldPassword] = useState(""); // State to store the old password
  const [newPassword, setNewPassword] = useState(""); // State to store the new password
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Login");
  };

  const confirmChangeProfilePicture = () => {
    setShowConfirmation(true); // Show the confirmation box
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file

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

  const goprofile = () => {
    navigate("/admin/Profile");
  };

  const confirmChangePassword = () => {
    setShowChangePasswordModal(true); // Show the change password modal
  };

  const handleChangePassword = async () => {
    try {
      const username = localStorage.getItem("username"); // Retrieve username from local storage

      // Make a POST request to the change_password2 endpoint
      const response = await axios.post(
        `http://${SERVER_URL}:5001/change_password2`,
        {
          username: username,
          old_password: oldPassword,
          new_password: newPassword,
        }
      );

      // Check if the password change was successful
      if (response.data.status === "success") {
        console.log("Password changed successfully");
        // Optionally, you can add logic to inform the user that the password was changed successfully
      } else {
        console.log("Failed to change password:", response.data.message);
        // Optionally, you can add logic to inform the user that the password change failed
      }

      setShowChangePasswordModal(false); // Close the change password modal
    } catch (error) {
      console.error("Error changing password:", error);
      // Optionally, you can add logic to inform the user that an error occurred while changing the password
    }
  };
  const role = localStorage.getItem("role"); // Retrieve the role from local storage
  return (
    <div className="grid-container">
      {role === "admin" ? <Sidebar /> : <SidebarC />}
      <Header />
      <div className="main-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={
              localStorage.getItem("profilePictureURL") ||
              "/default-profile-picture.jpg"
            }
            alt="Profile Icon"
            style={{
              width: "100px",
              height: "100px",
              marginTop: "32px",
              cursor: "pointer",
              borderRadius: "50%",
            }}
            onClick={confirmChangeProfilePicture} // Open confirmation box when the image is clicked
          />
          <h1 style={{ fontSize: "24px", marginTop: "16px" }}>
            {/* Display user's name */}
            {localStorage.getItem("username")}
          </h1>
          <button
            style={{
              marginTop: "24px",
              width: "249px",
              padding: "8px",
              fontSize: "16px",
            }}
            onClick={confirmChangeProfilePicture} // Open confirmation box when the "Modifier Avatar" button is clicked
          >
            Modifier Avatar
          </button>
          <button
            style={{
              marginTop: "134px",
              width: "249px",
              padding: "8px",
              fontSize: "16px",
            }}
            onClick={confirmChangePassword}
          >
            Modifier Mot de passe
          </button>
          <button
            style={{
              marginTop: "35px",
              width: "249px",
              padding: "8px",
              fontSize: "16px",
            }}
            onClick={handleLogout}
          >
            Déconnexion
          </button>
        </div>
      </div>
      {/* Confirmation box for changing profile picture */}
      <Modal open={showConfirmation} onClose={() => setShowConfirmation(false)}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "5px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>
            Voulez-vous changer votre photo de profil?
          </h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "block", marginBottom: "20px" }}
          />
          <Button
            variant="contained"
            onClick={() => setShowConfirmation(false)}
            style={{ marginRight: "10px" }}
          >
            Non
          </Button>
          <Button variant="contained" onClick={handleFileChange}>
            Oui
          </Button>
        </div>
      </Modal>
      {/* Change Password Modal */}
      <Modal
        open={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "5px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>Modifier le mot de passe</h2>
          <TextField
            label="Ancien mot de passe"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Nouveau mot de passe"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Confirmer le nouveau mot de passe"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <Button
            variant="contained"
            onClick={handleChangePassword}
            style={{ marginRight: "10px" }}
          >
            Enregistrer
          </Button>
          <Button
            variant="contained"
            onClick={() => setShowChangePasswordModal(false)}
          >
            Annuler
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default UserProfile;
