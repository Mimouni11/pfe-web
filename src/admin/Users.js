import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Header from "../chef/Header";
import Sidebar from "./Sidebar";
import SERVER_URL from "../config";
import "./Users.css";
import { Button } from "@mui/material";
import Gerer from "./Gerer"; // Import the Gerer component
import DeleteIcon from "@mui/icons-material/Delete";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import RefreshIcon from "@mui/icons-material/Refresh";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [isBoxVisible, setIsBoxVisible] = useState(false);

  // Define the fetchUsers function
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://${SERVER_URL}:5001/users`);
      setUsers(response.data.users);
      console.log(response);
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

  const handleDeleteUser = async (userId) => {
    try {
      // Make API call to delete user
      await axios.delete(`http://${SERVER_URL}:5001/users?id=${userId}`); // Fetch updated list of users
      fetchUsers();
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
        <h1>User List</h1>
        <Button
          variant="contained"
          sx={{ mt: 3, mb: 2, bgcolor: "0084FF" }}
          onClick={handleToggleBox}
        >
          Add a User
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
                  <DeleteIcon onClick={() => handleDeleteUser(user.id)} />{" "}
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
      </div>
    </div>
  );
};

export default Users;
