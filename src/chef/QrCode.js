import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import SERVER_URL from "..///config";
import Header from "./Header";
import Sidebar from "./Sidebar";
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-react-ui-kit";

const QrCode = () => {
  const [searchMatricule, setSearchMatricule] = useState("");
  const [selectedOption, setSelectedOption] = useState(""); // New state for dropdown selection

  const [tasks, setTasks] = useState([]);
  const [qrCodes, setQRCodes] = useState([]); // New state to store QR Codes
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

  const fetchQRCodes = async () => {
    try {
      const response = await axios.get(
        `http://${SERVER_URL}:5001/fetch-qr-codes`
      );
      const data = response.data;
      // Check if qr_codes exists
      console.log("data", data);
      if (data && data.qr_codes) {
        setQRCodes(data.qr_codes);
      } else {
        setQRCodes([]);
      }
    } catch (error) {
      console.error("Error fetching QR codes:", error);
      setQRCodes([]);
    }
  };

  const decodeQRCode = (qrCodeBase64) => {
    return atob(qrCodeBase64);
  };

  useEffect(() => {
    fetchQRCodes(); // Fetch QR codes on component mount
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  const generateQRCodeValue = () => {
    if (tasks.length > 0) {
      const taskIDs = tasks.map((task) => task.idtask).join(",");
      return taskIDs;
    }
    return "";
  };

  const updatePickupQRCode = (matricule, qrCode) => {
    console.log("QR Code:", qrCode); // Log the QR code value

    let tableName = ""; // Initialize tableName variable

    // Determine the table based on the selected option
    switch (selectedOption) {
      case "pickup":
        tableName = "pickup";
        break;
      case "truck":
        tableName = "truck";
        break;
      case "semi":
        tableName = "semi";
        break;
      default:
        // Default to pickup table if no option is selected
        tableName = "pickup";
        break;
    }

    axios
      .post(`http://${SERVER_URL}:5001/update-${tableName}-qr-code`, {
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
    <div
      className="grid-container"
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr 1fr 1fr",
        gridTemplateRows: "0.2fr 3fr",
        gridTemplateAreas: `"sidebar header header header" "sidebar main main main"`,
        height: "100vh",
      }}
    >
      <Header
        style={{
          gridArea: "header",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 30px",
          boxShadow: "0 6px 7px -3px rgba(0, 0, 0, 0.35)",
        }}
      ></Header>
      <Sidebar
        style={{
          gridArea: "sidebar",
          overflowY: "auto",
          padding: "20px 20px",
          color: "rgba(255, 255, 255, 0.95)",
        }}
      ></Sidebar>
      <div
        className="main-container"
        style={{
          gridArea: "main",
          overflowY: "auto",
          padding: "20px 20px",
          color: "rgba(255, 255, 255, 0.95)",
        }}
      >
        <h2>Search for Matricule</h2>
        <div className="d-flex align-items-center">
          <input
            type="text"
            placeholder="Enter truck's matricule"
            value={searchMatricule}
            onChange={(e) => setSearchMatricule(e.target.value)}
          />
          <MDBDropdown className="ms-2">
            <MDBDropdownToggle color="primary" outline>
              {selectedOption || "Select Option"}
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem onClick={() => setSelectedOption("pickup")}>
                Pickup
              </MDBDropdownItem>
              <MDBDropdownItem onClick={() => setSelectedOption("truck")}>
                Truck
              </MDBDropdownItem>
              <MDBDropdownItem onClick={() => setSelectedOption("semi")}>
                Semi
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
          <button onClick={handleSearch}>Search</button>
          <button onClick={fetchQRCodes}>Fetch QR Codes</button>

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

          {qrCodes.length > 0 && (
            <div>
              <h2>Fetched QR Codes</h2>
              {qrCodes.map((qrCodeData, index) => (
                <div key={index}>
                  <p>Matricule: {qrCodeData.matricule}</p>
                  <QRCode value={decodeQRCode(qrCodeData.qr_code)} size={256} />
                </div>
              ))}
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
    </div>
  );
};

export default QrCode;
