import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import Axios from "axios"; // Import Axios
import SERVER_URL from "../config";

function AddCar() {
  // Define state variables to store user input and validation status
  const [matricule, setMatricule] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [matriculeValid, setMatriculeValid] = useState(true); // Default to true since it's not initially invalid
  const [vehicleTypeValid, setVehicleTypeValid] = useState(false); // Default to false since a vehicle type must be selected
  const [error, setError] = useState(""); // State variable to store error message

  // Function to handle form submission and API call
  const handleSubmit = async () => {
    try {
      // Perform form validation
      if (!matricule || !vehicleType) {
        setError("Please fill in all fields."); // Display error message if any field is empty
        return;
      }

      // Send API request to add the car
      await Axios.post(`http://${SERVER_URL}:5001/addcar`, {
        matricule,
        vehicleType,
      });

      // Clear form fields and reset validation status
      setMatricule("");
      setVehicleType("");
      setMatriculeValid(true);
      setVehicleTypeValid(false);
      setError("");
    } catch (error) {
      console.error("Error adding car:", error);
      setError("Failed to add car. Please try again."); // Display error message if request fails
    }
  };

  // Function to handle vehicle type selection
  const handleVehicleTypeChange = (type) => {
    setVehicleType(type); // Update selected vehicle type
    setVehicleTypeValid(true); // Update vehicle type validity when selected
  };

  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center justify-content-center C1"
    >
      <div className="mask gradient-custom-3"></div>
      <MDBCard className="m-5" style={{ maxWidth: "600px", zIndex: 9999 }}>
        <MDBCardBody className="px-5">
          <h2
            className="text-uppercase text-center mb-5"
            style={{ color: "#000" }}
          >
            Add a new car
          </h2>
          <MDBInput
            wrapperClass="mb-4"
            label="Matricule"
            size="lg"
            id="matricule"
            type="text"
            value={matricule}
            onChange={(e) => {
              setMatricule(e.target.value);
              setMatriculeValid(!!e.target.value); // Update matricule validity based on input
            }}
          />
          <MDBDropdown>
            <MDBDropdownToggle className="mb-4 w-100" color="light" size="lg">
              {vehicleType ? vehicleType : "Select Vehicle Type"}
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem
                onClick={() => handleVehicleTypeChange("pickup")}
              >
                Pickup
              </MDBDropdownItem>
              <MDBDropdownItem onClick={() => handleVehicleTypeChange("truck")}>
                Truck
              </MDBDropdownItem>
              <MDBDropdownItem onClick={() => handleVehicleTypeChange("semi")}>
                Semi
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
          <MDBBtn
            className="mb-4 w-100 gradient-custom-4"
            size="lg"
            onClick={handleSubmit}
            disabled={!matriculeValid || !vehicleTypeValid}
          >
            Add Car
          </MDBBtn>
          {/* Render error message */}
          {error && <div style={{ color: "red" }}>{error}</div>}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default AddCar;
