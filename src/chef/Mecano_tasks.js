import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Mecano_tasks.css";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Header from "./Header";
import Sidebar from "./Sidebar";
import SERVER_URL from "..///config";

const Mecano_tasks = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [freeMechanics, setFreeMechanics] = useState([]);
  const [model, setModel] = useState("pickup");
  const [matricule, setMatricule] = useState("");

  const fetchFreeMechanics = () => {
    // Check if a date is selected
    if (!selectedDate) {
      alert("Please select a date");
      return;
    }
    const utcDate = new Date(
      Date.UTC(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      )
    );
    const formattedDate = utcDate.toISOString().split("T")[0];
    axios
      .post(`http://${SERVER_URL}:5001/free-mechanics`, {
        date: formattedDate,
      })
      .then((response) => {
        if (response.data && response.data.mechanics) {
          setFreeMechanics(response.data.mechanics);
        } else {
          setFreeMechanics([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching free mechanics:", error);
      });
  };

  const handleTaskChange = (mechanicId, tasks) => {
    const updatedMechanics = freeMechanics.map((mechanic) => {
      if (mechanic.id === mechanicId) {
        return { ...mechanic, tasks: tasks };
      }
      return mechanic;
    });
    setFreeMechanics(updatedMechanics);
  };
  const saveTasks = (mechanicId, tasks) => {
    const updatedMechanic = freeMechanics.find(
      (mechanic) => mechanic.id === mechanicId
    );
    if (!updatedMechanic) {
      console.error("Mechanic not found");
      return;
    }
    const tasksToSave = updatedMechanic.tasks;
    const { model, matricule } = updatedMechanic; // Destructure model and matricule

    axios
      .post(`http://${SERVER_URL}:5001/insert-tasks`, {
        id_mecano: mechanicId,
        tasks: tasksToSave,
        date: selectedDate.toISOString().split("T")[0],
        model: model, // Include model in the request body
        matricule: matricule, // Include matricule in the request body
      })
      .then((response) => {
        console.log(mechanicId);
        console.log("Tasks saved successfully: %j", response.data);
        sendNotificationToMecano(mechanicId, tasksToSave);
      })
      .catch((error) => {
        console.error("Error saving tasks:", error);
      });
  };

  const sendNotificationToMecano = (mechanicId, tasks) => {
    axios
      .post(`http://${SERVER_URL}:5001/send_notificationmecano`, {
        username: mechanicId,
        title: "New Task Created",
        message: `New tasks assigned: ${tasks}`,
      })
      .then((response) => {
        console.log("Notification sent to mecano:", response.data.message);
      })
      .catch((error) => {
        console.error("Error sending notification to mecano:", error);
      });
  };

  const renderMechanics = () => {
    if (freeMechanics.length === 0) {
      return <p>No free mechanics available.</p>;
    }

    const handleModelChange = (mechanicId, selectedModel) => {
      // Update model state when model is changed
      setModel(selectedModel);
      handleMechanicDataChange(mechanicId, { model: selectedModel });
    };

    const handleMatriculeChange = (mechanicId, selectedMatricule) => {
      // Update matricule state when matricule is changed
      setMatricule(selectedMatricule);
      handleMechanicDataChange(mechanicId, { matricule: selectedMatricule });
    };

    const handleMechanicDataChange = (mechanicId, updatedData) => {
      // Update the specific mechanic's data
      const updatedMechanics = freeMechanics.map((mechanic) => {
        if (mechanic.id === mechanicId) {
          return { ...mechanic, ...updatedData };
        }
        return mechanic;
      });
      setFreeMechanics(updatedMechanics);
    };

    return (
      <div className="main-container">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Model</th>
              <th>Matricule</th>
              <th>Tasks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {freeMechanics.map((mechanic) => (
              <tr key={mechanic.id}>
                <td>{mechanic.name}</td>
                <td>
                  <select
                    value={mechanic.model}
                    onChange={(e) =>
                      handleModelChange(mechanic.id, e.target.value)
                    }
                  >
                    <option value="pickup">Pickup</option>
                    <option value="truck">Truck</option>
                    <option value="semi">Semi</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    value={mechanic.matricule}
                    onChange={(e) =>
                      handleMatriculeChange(mechanic.id, e.target.value)
                    }
                  />
                </td>
                <td>
                  <textarea
                    placeholder="Enter tasks..."
                    onChange={(e) =>
                      handleTaskChange(mechanic.id, e.target.value)
                    }
                  ></textarea>
                </td>
                <td>
                  <button
                    onClick={() => saveTasks(mechanic.id, mechanic.tasks)}
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  };

  const handleModelChange = (mechanicId, model) => {
    const updatedMechanics = freeMechanics.map((mechanic) => {
      if (mechanic.id === mechanicId) {
        return { ...mechanic, model: model };
      }
      return mechanic;
    });
    setFreeMechanics(updatedMechanics);
  };

  const handleMatriculeChange = (mechanicId, matricule) => {
    const updatedMechanics = freeMechanics.map((mechanic) => {
      if (mechanic.id === mechanicId) {
        return { ...mechanic, matricule: matricule };
      }
      return mechanic;
    });
    setFreeMechanics(updatedMechanics);
  };

  return (
    <div className="grid-container">
      <Header></Header>
      <Sidebar></Sidebar>
      <div className="main-container">
        <h2>Select a Date</h2>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
        />
        <button onClick={fetchFreeMechanics}>Fetch Free Mechanics</button>
        <div>
          <h3>Free Mechanics:</h3>
          {renderMechanics()}
        </div>
      </div>
    </div>
  );
};

export default Mecano_tasks;
