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

  const handleTypeChange = (mechanicId, taskType) => {
    const updatedMechanics = freeMechanics.map((mechanic) => {
      if (mechanic.id === mechanicId) {
        return { ...mechanic, taskType: taskType };
      }
      return mechanic;
    });
    setFreeMechanics(updatedMechanics);
  };

  const saveTasks = (mechanicId) => {
    const updatedMechanic = freeMechanics.find(
      (mechanic) => mechanic.id === mechanicId
    );
    if (!updatedMechanic) {
      console.error("Mechanic not found");
      return;
    }
    const { tasks, model, matricule, taskType } = updatedMechanic;

    axios
      .post(`http://${SERVER_URL}:5001/insert-tasks`, {
        id_mecano: mechanicId,
        tasks: tasks,
        date: selectedDate.toISOString().split("T")[0],
        model: model,
        matricule: matricule,
        tasktype: taskType, // Make sure taskType is correctly included
      })

      .then((response) => {
        console.log(mechanicId);
        console.log("Tasks saved successfully: %j", response.data);
        sendNotificationToMecano(mechanicId, tasks);
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
      setModel(selectedModel);
      handleMechanicDataChange(mechanicId, { model: selectedModel });
    };

    const handleMatriculeChange = (mechanicId, selectedMatricule) => {
      setMatricule(selectedMatricule);
      handleMechanicDataChange(mechanicId, { matricule: selectedMatricule });
    };

    const handleMechanicDataChange = (mechanicId, updatedData) => {
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
              <th>Type</th> {/* New column for task type */}
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
                    value={mechanic.tasks}
                    onChange={(e) =>
                      handleTaskChange(mechanic.id, e.target.value)
                    }
                  ></textarea>
                </td>
                <td>
                  <select
                    value={mechanic.taskType || "maintenance"}
                    onChange={(e) =>
                      handleTypeChange(mechanic.id, e.target.value)
                    }
                  >
                    <option value="maintenance">Maintenance</option>
                    <option value="reparation">Reparation</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() =>
                      saveTasks(mechanic.id, mechanic.tasks, mechanic.taskType)
                    }
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
