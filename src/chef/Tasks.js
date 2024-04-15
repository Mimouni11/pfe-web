import React, { useState } from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./tasks.css"; // Import custom CSS file for styling
import Navbar from "./Navbar";
const Tasks = () => {
  // State to track which container is selected
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [selectedContainer, setSelectedContainer] = useState(null);

  const handleContainerSelect = (container) => {
    setSelectedContainer(container);
    // Navigate to MecanoTasks component when container 2 is selected
    if (container === 2) {
      navigate("/chef/Mecano_tasks");
    }
    if (container === 1) {
      navigate("/chef/Driver_tasks");
    }
  };

  return (
    <div style={{ backgroundColor: "#7E9487", minHeight: "100vh" }}>
      <Navbar></Navbar>
      <div className="tasks-container">
        <div className="container-wrapper">
          <MDBContainer
            breakpoint="lg"
            className="container"
            style={{
              backgroundImage: 'url("/truck.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h2>Drivers</h2>
            <p>Create the drivers's tasks</p>
            <button onClick={() => handleContainerSelect(1)}>Create</button>
          </MDBContainer>
          <MDBContainer
            breakpoint="lg"
            className="container"
            style={{
              backgroundImage: 'url("/mecano.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h2>Mechanics</h2>
            <p>Create the mechanics's tasks</p>
            <button onClick={() => handleContainerSelect(2)}>Create</button>
          </MDBContainer>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
