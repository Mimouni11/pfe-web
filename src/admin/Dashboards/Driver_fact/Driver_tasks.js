import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import SERVER_URL from "../../../config";

const DriverTasksList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://${SERVER_URL}:5001/driver-tasks`
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching the tasks", error);
      }
    };

    fetchTasks();
  }, []);

  // Define columns for DataGrid
  const columns = [
    { field: "user_id", headerName: "User ID", flex: 1 },
    { field: "username", headerName: "Username", flex: 1 },
    { field: "task_id", headerName: "Task ID", flex: 1 },
    { field: "task_description", headerName: "Task Description", flex: 2 },
    { field: "KM_covered", headerName: "KM Covered", flex: 1 },
    { field: "destinations", headerName: "Destination", flex: 1 },
    { field: "vehicle_id", headerName: "Vehicle ID", flex: 1 },
    { field: "task_date_key", headerName: "Task Date", flex: 1 },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <h2>Liste des taches des chauffeurs</h2>
      <DataGrid
        rows={tasks}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        getRowId={(row) => row.task_id} // Specify the custom ID field
        autoHeight
      />
    </div>
  );
};

export default DriverTasksList;
