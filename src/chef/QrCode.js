import React, { useState } from "react";
import QRCode from "qrcode.react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import SERVER_URL from "..///config";
import Header from "./Header";
import Sidebar from "./Sidebar";

const QrCode = () => {
  const [searchMatricule, setSearchMatricule] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleSearch = () => {
    // Fetch tasks based on the entered matricule
    axios
      .post(`http://${SERVER_URL}:5001/search-matricule`, {
        matricule: searchMatricule,
      })
      .then((response) => {
        const data = response.data;
        // Check if tasks_data exists
        console.log("data", data);
        if (data && data.tasks_data) {
          // Extract tasks
          setTasks(
            data.tasks_data.map((taskData) => ({
              idtask: taskData[0],
              task: taskData[2], // Correctly extract the task description
              date: taskData[1],
              matricule: taskData[3], // Fetch and set the matricule value
            }))
          );
        } else {
          // If tasks_data is undefined or null, set tasks to an empty array
          setTasks([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setTasks([]);
      });
  };

  const generateQRCodeValue = () => {
    if (tasks.length > 0) {
      const taskIDs = tasks.map((task) => task.idtask).join(",");
      return taskIDs;
    }
    return "";
  };

  const updatePickupQRCode = (matricule, qrCode) => {
    axios
      .post(`http://${SERVER_URL}:5001/update-pickup-qr-code`, {
        matricule: matricule,
        qr_code: qrCode,
      })
      .then((response) => {
        console.log("QR code updated successfully:", response.data.message);
        // Optionally, you can display a success message to the user
      })
      .catch((error) => {
        console.error("Error updating QR code:", error);
        // Optionally, you can display an error message to the user
      });
  };

  return (
    <div className="grid-container">
      <Header></Header>
      <Sidebar></Sidebar>
      <div className="main-container">
        <h2>Search for Matricule</h2>
        <input
          type="text"
          placeholder="Enter truck's matricule"
          value={searchMatricule}
          onChange={(e) => setSearchMatricule(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        {tasks.length > 0 && (
          <div>
            <h3>Tasks:</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Task ID</th>
                  <th>Task Description</th>
                  <th>Date</th>
                  <th>Matricule</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={index}>
                    <td>{task.idtask}</td>
                    <td>{task.task}</td>
                    <td>{task.date}</td>
                    <td>{task.matricule}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        {tasks.length > 0 && (
          <div>
            <h2>QR Code</h2>
            <QRCode value={generateQRCodeValue()} />
            <button
              onClick={() =>
                updatePickupQRCode(
                  tasks.length > 0 ? tasks[0].matricule : "",
                  generateQRCodeValue()
                )
              }
            >
              Update QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QrCode;
