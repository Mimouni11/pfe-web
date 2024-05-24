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
import Axios from "axios";
import SERVER_URL from "../config";
import User from "../Models/User"; // Adjust the import based on your file structure
import Admin from "../Models/Admin";
function Gerer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Add password field
  const [selectedRole, setSelectedRole] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [nameValid, setNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true); // Add password validation
  const [roleValid, setRoleValid] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!name || !email || !password || !selectedRole) {
      setError("All fields are required.");
      return;
    }

    setError("");

    const user = new User(name, email, password, selectedRole, vehicleType);

    try {
      await Admin.createUser(user);
      // Handle success (e.g., clear form, show success message)
    } catch (error) {
      setError("Error adding user. Please try again.");
    }
  };

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
              setNameValid(!!e.target.value);
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
              setEmailValid(!!e.target.value);
            }}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            size="lg"
            id="form3"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordValid(!!e.target.value);
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
                  setRoleValid(true);
                }}
              >
                Driver
              </MDBDropdownItem>
              <MDBDropdownItem
                onClick={() => {
                  setSelectedRole("mechanic");
                  setRoleValid(true);
                }}
              >
                Mechanic
              </MDBDropdownItem>
              <MDBDropdownItem
                onClick={() => {
                  setSelectedRole("chef");
                  setRoleValid(true);
                }}
              >
                Chef
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
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
            disabled={!nameValid || !emailValid || !passwordValid || !roleValid}
          >
            Register
          </MDBBtn>
          {error && <div style={{ color: "red" }}>{error}</div>}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Gerer;
