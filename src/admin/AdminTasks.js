import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import SERVER_URL from "..///config";
import Sidebar from "./Sidebar";
import Header from "../chef/Header";

const AdminTasks = () => {
  const [pendingTasks, setPendingTasks] = useState([]);

  useEffect(() => {
    fetchPendingTasks();
  }, []);

  const fetchPendingTasks = () => {
    axios
      .get(`http://${SERVER_URL}:5001/pending-tasks`)
      .then((response) => {
        console.log("Pending Tasks Response:", response.data); // Debugging log
        if (response.data && response.data.tasks) {
          setPendingTasks(response.data.tasks);
        } else {
          setPendingTasks([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching pending tasks:", error);
      });
  };

  const approveTask = (taskId) => {
    axios
      .post(`http://${SERVER_URL}:5001/approve-task`, null, {
        params: {
          task_id: taskId,
        },
      })
      .then((response) => {
        console.log("Task approved successfully:", response.data);
        fetchPendingTasks(); // Refresh the list after approval
      })
      .catch((error) => {
        console.error("Error approving task:", error);
      });
  };

  return (
    <div className="grid-container">
      <Sidebar />
      <Header />
      <div className="main-container">
        <h2>Pending Tasks</h2>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Mechanic ID</th>
              <th>Tasks</th>
              <th>Date</th>
              <th>Model</th>
              <th>Matricule</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id_mecano}</td>
                <td>{task.tasks}</td>
                <td>{task.date}</td>
                <td>{task.model}</td>
                <td>{task.matricule}</td>
                <td>
                  <button onClick={() => approveTask(task.id)}>Approve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AdminTasks;
