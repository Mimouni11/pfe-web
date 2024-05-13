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
    const formattedDate = utcDate.toISOString().split("T")[0]; // Make API call to fetch free mechanics
    console.log(formattedDate);
    axios
      .post(`http://${SERVER_URL}:5001/free-mechanics`, {
        date: formattedDate,
      })
      .then((response) => {
        if (response.data && response.data.mechanics) {
          setFreeMechanics(response.data.mechanics);
        } else {
          setFreeMechanics([]); // Set mechanics to an empty array if data is undefined
        }
      })
      .catch((error) => {
        console.error("Error fetching free mechanics:", error);
      });
  };

  const handleTaskChange = (mechanicId, tasks) => {
    // Update the tasks locally
    const updatedMechanics = freeMechanics.map((mechanic) => {
      if (mechanic.id === mechanicId) {
        return { ...mechanic, tasks: tasks };
      }
      return mechanic;
    });
    setFreeMechanics(updatedMechanics);
  };

  const saveTasks = (mechanicId, tasks) => {
    // Retrieve the tasks from the state
    const updatedMechanic = freeMechanics.find(
      (mechanic) => mechanic.id === mechanicId
    );
    if (!updatedMechanic) {
      console.error("Mechanic not found");
      return;
    }
    const tasksToSave = updatedMechanic.tasks;

    // Make a POST request to insert tasks into mecano_tasks table
    axios
      .post(`http://${SERVER_URL}:5001/insert-tasks`, {
        id_mecano: mechanicId,
        tasks: tasksToSave,
        date: selectedDate.toISOString().split("T")[0],
      })

      .then((response) => {
        console.log(mechanicId);
        console.log("Tasks saved successfully: %j", response.data); // Optionally update UI or show a success message
        sendNotificationToMecano(mechanicId, tasksToSave);
      })
      .catch((error) => {
        console.error("Error saving tasks:", error);
        // Optionally show an error message to the user
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

    return (
      <div className="main-container">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Tasks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {freeMechanics.map((mechanic) => (
              <tr key={mechanic.id}>
                <td>{mechanic.name}</td>
                <td>
                  <textarea
                    placeholder="Enter tasks..."
                    // Handle task input change
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
