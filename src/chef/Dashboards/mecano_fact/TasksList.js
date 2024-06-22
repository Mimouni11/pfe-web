import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import SERVER_URL from "../../../config";

const TaskDetails = () => {
  const [taskDetails, setTaskDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  const fetchTaskDetails = async () => {
    try {
      const response = await axios.get(
        `http://${SERVER_URL}:5001/task-details`
      );
      console.log("Response data:", response.data); // Log the data to see its structure
      setTaskDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching task details:", error);
      setLoading(false);
    }
  };

  const columns = [
    { field: "task_id", headerName: "Task ID", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    { field: "task_for", headerName: "Task For", flex: 1 },
    { field: "task_type", headerName: "Task Type", flex: 1 },
    { field: "done", headerName: "Done", flex: 1 },
  ];

  return (
    <div style={{ height: 600, width: "100%", marginTop: "5%" }}>
      <h1>Task Details</h1>
      <DataGrid
        rows={taskDetails}
        columns={columns}
        pageSize={10}
        loading={loading}
        getRowId={(row) => row.task_id}
        autoHeight
      />
    </div>
  );
};

export default TaskDetails;
