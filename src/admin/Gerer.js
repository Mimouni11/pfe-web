import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
} from "mdb-react-ui-kit";
import Axios from "axios"; // Import Axios
import SERVER_URL from "../config";

function Gerer() {
  // Define state variables to store user input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Function to handle form submission and API call
  const handleSubmit = async () => {
    // Create form data
    const formData = new FormData();
    formData.append("username", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", selectedRole);

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

  // Function to generate random password
  const generateRandomPassword = () => {
    const randomPassword = Math.random().toString(36).slice(2);
    setPassword(randomPassword);
  };

  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center justify-content-center C1"
    >
      <div className="mask gradient-custom-3"></div>
      <MDBCard className="m-5" style={{ maxWidth: "600px", zIndex: 9999 }}>
        <MDBCardBody className="px-5">
          <h2 className="text-uppercase text-center mb-5">
            Register a new user
          </h2>
          <MDBInput
            wrapperClass="mb-4"
            label="Name"
            size="lg"
            id="form1"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Email"
            size="lg"
            id="form2"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <MDBInput
            wrapperClass="mb-4 position-relative"
            label="Password"
            size="lg"
            id="form3"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          >
            <MDBIcon
              far
              icon="smile"
              className="position-absolute end-0 top-50 translate-middle-y me-2 text-primary"
              style={{ cursor: "pointer" }}
              onClick={generateRandomPassword}
            />
          </MDBInput>
          <MDBDropdown>
            <MDBDropdownToggle
              className="mb-4 w-100"
              color="light"
              size="lg"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {selectedRole ? selectedRole : "Select Role"}
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem onClick={() => setSelectedRole("driver")}>
                Driver
              </MDBDropdownItem>
              <MDBDropdownItem onClick={() => setSelectedRole("mechanic")}>
                Mechanic
              </MDBDropdownItem>
              <MDBDropdownItem onClick={() => setSelectedRole("chef")}>
                Chef
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>

          <MDBBtn
            className="mb-4 w-100 gradient-custom-4"
            size="lg"
            onClick={handleSubmit}
          >
            Register
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Gerer;
