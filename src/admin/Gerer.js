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

function Gerer() {
  // Define state variables to store user input and validation status
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [nameValid, setNameValid] = useState(true); // Default to true since it's not initially invalid
  const [emailValid, setEmailValid] = useState(true); // Default to true since it's not initially invalid
  const [roleValid, setRoleValid] = useState(false); // Default to false since a role must be selected
  const [error, setError] = useState(""); // State variable to store error message

  // Function to handle form submission and API call
  const handleSubmit = async () => {
    // Validate all fields except password
    if (!name || !email || !selectedRole) {
      setError("All fields are required.");
      return;
    }

    // If all fields are filled, clear any previous error
    setError("");

    // Create form data
    const formData = new FormData();
    formData.append("username", name);
    formData.append("email", email);
    formData.append("role", selectedRole);
    formData.append("vehicleType", vehicleType); // Append vehicleType to the form data

    try {
      // Make API call to add user
      const response = await Axios.post(
        `http://${SERVER_URL}:5001/add_user`,
        formData
      );

      // Handle success
      console.log("User added successfully:", response.data);
    } catch (error) {
      // Handle error
      console.error("Error adding user:", error);
    }
  };

  // Function to handle vehicle type selection
  const handleVehicleTypeChange = (type) => {
    setVehicleType(type);
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
            Créer un nouvel utilisateur
          </h2>
          <MDBInput
            wrapperClass="mb-4"
            label="Name"
            size="lg"
            id="form1"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
              setNameValid(!!e.target.value); // Update name validity based on input
            }}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Email"
            size="lg"
            id="form2"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailValid(!!e.target.value); // Update email validity based on input
            }}
          />
          <MDBDropdown>
            <MDBDropdownToggle className="mb-4 w-100" color="light" size="lg">
              {selectedRole ? selectedRole : "Select Role"}
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem
                onClick={() => {
                  setSelectedRole("driver");
                  setRoleValid(true); // Update role validity when selected
                }}
              >
                Driver
              </MDBDropdownItem>
              <MDBDropdownItem
                onClick={() => {
                  setSelectedRole("mechanic");
                  setRoleValid(true); // Update role validity when selected
                }}
              >
                Mechanic
              </MDBDropdownItem>
              <MDBDropdownItem
                onClick={() => {
                  setSelectedRole("chef");
                  setRoleValid(true); // Update role validity when selected
                }}
              >
                Chef
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
          {/* Conditionally render the vehicle type dropdown */}
          {selectedRole === "driver" && (
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
                <MDBDropdownItem
                  onClick={() => handleVehicleTypeChange("truck")}
                >
                  Truck
                </MDBDropdownItem>
                <MDBDropdownItem
                  onClick={() => handleVehicleTypeChange("semi")}
                >
                  Semi
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          )}
          <MDBBtn
            className="mb-4 w-100 gradient-custom-4"
            size="lg"
            onClick={handleSubmit}
            disabled={!nameValid || !emailValid || !roleValid}
          >
            Register
          </MDBBtn>
          {/* Render error message */}
          {error && <div style={{ color: "red" }}>{error}</div>}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Gerer;
