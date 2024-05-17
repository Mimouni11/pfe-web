import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Header from "../chef/Header";
import Sidebar from "./Sidebar";
import SERVER_URL from "../config";
import "./Users.css";
import { Button, Modal } from "@mui/material"; // Import Modal component from MUI
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddCar from "./AddCar"; // Import the AddCar component

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [selectedVehicleMatricule, setSelectedVehicleMatricule] =
    useState(null); // State to track selected vehicle matricule for deletion
  const [showConfirmation, setShowConfirmation] = useState(false); // State to control visibility of confirmation box

  // Define the fetchVehicles function
  const fetchVehicles = async () => {
    try {
      const response = await axios.get(`http://${SERVER_URL}:5001/Vehicules`);
      setVehicles(response.data.vehicules);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  useEffect(() => {
    fetchVehicles(); // Call fetchVehicles when the component mounts
  }, []);

  const handleToggleBox = () => {
    setIsBoxVisible(!isBoxVisible);
  };

  const handleDeleteVehicle = async (matricule) => {
    setSelectedVehicleMatricule(matricule); // Set the selected vehicle matricule for deletion
    setShowConfirmation(true); // Show the confirmation box
  };

  const confirmDeleteVehicle = async () => {
    try {
      // Make API call to delete vehicle
      await axios.delete(
        `http://${SERVER_URL}:5001/Vehicules?matricule=${selectedVehicleMatricule}`
      );
      setShowConfirmation(false); // Hide the confirmation box
      fetchVehicles(); // Fetch updated list of vehicles
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  const handleRefresh = () => {
    fetchVehicles(); // Call fetchVehicles to refresh the table
  };

  return (
    <div className="grid-container">
      <Header />
      <Sidebar />
      <div className="main-container">
        <h1>Liste des véhicules</h1>
        <Button
          variant="contained"
          style={{
            marginTop: "16px",
            marginBottom: "16px",
            backgroundColor: "#0084FF",
          }}
          onClick={handleToggleBox}
        >
          Ajouter véhicule
        </Button>
        <RefreshIcon className="refresh" onClick={handleRefresh}></RefreshIcon>
        <Table striped bordered hover style={{ margin: "auto" }}>
          <thead>
            <tr>
              <th>Matricule</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.matricule}>
                <td>{vehicle.matricule}</td>
                <td>{vehicle.type}</td>
                <td>
                  <DeleteIcon
                    onClick={() => handleDeleteVehicle(vehicle.matricule)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {isBoxVisible && (
          <div className="overlay">
            <div className="box">
              <AddCar /> {/* Render AddCar component */}
              <Button
                variant="contained"
                style={{
                  marginTop: "16px",
                  marginBottom: "16px",
                  backgroundColor: "#0084FF",
                }}
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
              Êtes-vous sûr de vouloir supprimer le véhicule avec ce matricule?
            </h2>
            <p>{selectedVehicleMatricule}</p>
            <Button
              variant="contained"
              onClick={confirmDeleteVehicle}
              style={{ marginRight: "8px" }}
            >
              Confirmer
            </Button>
            <Button
              variant="contained"
              onClick={() => setShowConfirmation(false)}
            >
              Annuler
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Vehicles;
