import React, { useState } from "react";
import QRCode from "qrcode.react";
import axios from "axios";
import Table from "react-bootstrap/Table";

const QrCode = () => {
  const [searchUsername, setSearchUsername] = useState("");
  const [driverInfo, setDriverInfo] = useState(null);
  const [tasks, setTasks] = useState([]);

  const handleSearch = () => {
    // Fetch driver info and tasks based on the entered username
    axios
      .post(`http://192.168.1.136:5001/search-driver`, {
        username: searchUsername,
      })
      .then((response) => {
        const data = response.data;
        setDriverInfo({
          id: data.driver_data[0][0],
          username: data.driver_data[0][1],
        }); // Extracting ID and Username
        setTasks(
          data.driver_data
            .slice(1) // Exclude the first element which contains ID and Username
            .map((taskData) => ({
              idtask: taskData[2],
              task: taskData[4],
              date: taskData[3],
              matricule: taskData[5], // Fetch and set the matricule value
            }))
        );
      })
      .catch((error) => {
        console.error("Error fetching driver info:", error);
        setDriverInfo(null);
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
      .post("http://192.168.1.136:5001/update-pickup-qr-code", {
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
    <div>
      <h2>Search for Driver</h2>
      <input
        type="text"
        placeholder="Enter driver's username"
        value={searchUsername}
        onChange={(e) => setSearchUsername(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {driverInfo && (
        <div>
          <h3>Driver Information:</h3>
          <p>
            <strong>ID:</strong> {driverInfo.id}
          </p>
          <p>
            <strong>Username:</strong> {driverInfo.username}
          </p>
        </div>
      )}

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

      {driverInfo && (
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
  );
};

export default QrCode;
