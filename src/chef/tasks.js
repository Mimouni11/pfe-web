import React, { useState } from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import "./tasks.css";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Tasks = () => {
  const navigate = useNavigate();
  const [selectedContainer, setSelectedContainer] = useState(null);

  const handleContainerSelect = (container) => {
    setSelectedContainer(container);
    if (container === 2) {
      navigate("/chef/Mecano_tasks");
    }
    if (container === 1) {
      navigate("/chef/Driver_tasks");
    }
  };

  return (
    <div className="grid-container" style={{ backgroundColor: "", minHeight: "100vh" }}>
      <Header />
      <Sidebar />

      <div className="main-container">
        <div className="container-wrapper">
          <MDBContainer
            breakpoint="lg"
            className="container"
            style={{
              backgroundImage: 'url("/driver1.avif")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              marginRight: "10px", // Add right margin to the first container
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
              backgroundImage: 'url("/mecano2.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              marginLeft: "10px", // Add left margin to the second container
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
