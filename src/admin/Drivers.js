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

const DriverTasks = () => {
  const [tasks, setTasks] = useState([]);

  // Define the fetchTasks function
  // Define the fetchTasks function
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `http://${SERVER_URL}:5001/seetasksdriver`
      );
      setTasks(response.data.tasks_driver); // Correct the key to access tasks
    } catch (error) {
      console.error("Error fetching driver tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks(); // Call fetchTasks when the component mounts
  }, []);

  const handleRefresh = () => {
    fetchTasks(); // Call fetchTasks to refresh the table
  };

  return (
    <div className="main-container">
      <Table striped bordered hover style={{ margin: "auto" }}>
        <thead>
          <tr>
            <th>Tâches</th>
            <th>Date</th>
            <th>Matricule</th>
            <th>Terminé</th>
            <th>Nom d'utilisateur</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.tasks}</td>
              <td>{task.date}</td>
              <td>{task.matricule}</td>
              <td>{task.done}</td>
              <td>{task.username}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DriverTasks;
