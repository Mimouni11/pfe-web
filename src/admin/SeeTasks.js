import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Header from "../chef/Header";
import Sidebar from "./Sidebar";
import SERVER_URL from "../config";
import "./Users.css";
import { Button, Modal } from "@mui/material"; // Import Modal component from MUI
import DeleteIcon from "@mui/icons-material/Delete";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import RefreshIcon from "@mui/icons-material/Refresh";
import DatePicker from "react-datepicker"; // Import DatePicker component
import "react-datepicker/dist/react-datepicker.css"; // Import datepicker CSS

const SeeTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedRole, setSelectedRole] = useState("mechanic");
  const [selectedDate, setSelectedDate] = useState(null); // State for selected date

  // Define the fetchTasks function
  const fetchTasks = async () => {
    try {
      let endpoint =
        selectedRole === "mechanic" ? "/seetasksmecano" : "/seetasksdriver";
      const response = await axios.get(`http://${SERVER_URL}:5001${endpoint}`);
      setTasks(response.data.tasks_mecano); // Assuming both endpoints return similar data
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks(); // Call fetchTasks when the component mounts or when selectedRole changes
  }, [selectedRole]);

  const handleRefresh = () => {
    fetchTasks(); // Call fetchTasks to refresh the table
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value); // Update the selected role when dropdown value changes
  };

  const handleDateChange = (date) => {
    setSelectedDate(date); // Update selected date when datepicker value changes
  };

  // Filter tasks based on selectedDate
  const filteredTasks = selectedDate
    ? tasks.filter((task) => {
        // Parse task date string into a Date object
        const taskDate = new Date(task.date);

        // Format the selected date to match the task date format
        const selectedDateFormat = selectedDate
          .toDateString()
          .slice(4, 15)
          .replace(/\s(\d)$/, "-0$1");

        // Format the task date to match the selected date format
        const taskDateFormat = taskDate
          .toDateString()
          .slice(4, 15)
          .replace(/\s(\d)$/, "-0$1");

        // Compare the formatted dates
        return selectedDateFormat === taskDateFormat;
      })
    : tasks;

  return (
    <div className="grid-container">
      <Header />
      <Sidebar />
      <div className="main-container">
        <h1>Liste des tâches</h1>
        <div className="dropdown-container">
          <RefreshIcon
            className="refresh"
            onClick={handleRefresh}
          ></RefreshIcon>
          <select value={selectedRole} onChange={handleRoleChange}>
            <option value="mechanic">Mécanicien</option>
            <option value="driver">Chauffeur</option>
          </select>
          {/* Datepicker */}
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="Sélectionner une date"
          />
        </div>
        <Table striped bordered hover style={{ margin: "auto" }}>
          <thead>
            <tr>
              <th>Tâches</th>
              <th>Date</th>
              <th>Terminé</th>
              <th>Nom d'utilisateur</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task, index) => (
              <tr key={index}>
                <td>{task.tasks}</td>
                <td>{task.date}</td>
                <td>{task.done}</td>
                <td>{task.username}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default SeeTasks;
