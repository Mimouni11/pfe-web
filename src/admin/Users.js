import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Header from "../chef/Header";
import Sidebar from "./Sidebar";
import SERVER_URL from "../config";
import "./Users.css";
import { Button, Modal } from "@mui/material"; // Import Modal component from MUI
import Gerer from "./Gerer"; // Import the Gerer component
import DeleteIcon from "@mui/icons-material/Delete";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import RefreshIcon from "@mui/icons-material/Refresh";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null); // State to track selected user ID for deletion
  const [showConfirmation, setShowConfirmation] = useState(false); // State to control visibility of confirmation box
  const [emailToDelete, setEmailToDelete] = useState(""); // State to store email of user to delete

  // Define the fetchUsers function
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://${SERVER_URL}:5001/users`);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Call fetchUsers when the component mounts
  }, []);

  const handleToggleBox = () => {
    setIsBoxVisible(!isBoxVisible);
  };

  const handleDeleteUser = async (userId, userEmail) => {
    setSelectedUserId(userId); // Set the selected user ID for deletion
    setEmailToDelete(userEmail); // Set the email of user to delete
    setShowConfirmation(true); // Show the confirmation box
  };

  const confirmDeleteUser = async () => {
    try {
      // Make API call to delete user
      await axios.delete(
        `http://${SERVER_URL}:5001/users?id=${selectedUserId}`
      );
      setShowConfirmation(false); // Hide the confirmation box
      fetchUsers(); // Fetch updated list of users
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleRefresh = () => {
    fetchUsers(); // Call fetchUsers to refresh the table
  };

  return (
    <div className="grid-container">
      <Header />
      <Sidebar />
      <div className="main-container">
        <h1>Liste des utilisateurs</h1>
        <Button
          variant="contained"
          sx={{ mt: 3, mb: 2, bgcolor: "0084FF" }}
          onClick={handleToggleBox}
        >
          Ajouter utilisateur
        </Button>
        <RefreshIcon className="refresh" onClick={handleRefresh}></RefreshIcon>
        <p>hahahah</p>
        <Table striped bordered hover style={{ margin: "auto" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <DeleteIcon
                    onClick={() => handleDeleteUser(user.id, user.email)}
                  />{" "}
                  <ManageAccountsIcon></ManageAccountsIcon>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {isBoxVisible && (
          <div className="overlay">
            <div className="box">
              <Gerer /> {/* Replace placeholder content with Gerer component */}
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "0084FF" }}
                onClick={handleToggleBox}
              >
                Close
              </Button>
            </div>
          </div>
        )}
        {/* Confirmation Modal */}
        <Modal
          open={showConfirmation}
          onClose={() => setShowConfirmation(false)}
        >
          <div className="confirmation-box">
            <h2>
              Are you sure you want to delete the user with this email address?
            </h2>
            <p>{emailToDelete}</p>
            <Button
              variant="contained"
              onClick={confirmDeleteUser}
              sx={{ mr: 2 }}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              onClick={() => setShowConfirmation(false)}
            >
              Cancel
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Users;
