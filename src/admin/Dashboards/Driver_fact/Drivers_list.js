import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import SERVER_URL from "../../../config";

const DriversList = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get(`http://${SERVER_URL}:5001/drivers`);
        setDrivers(response.data);
      } catch (error) {
        console.error("Error fetching the drivers", error);
      }
    };

    fetchDrivers();
  }, []);

  // Define columns for DataGrid
  const columns = [
    { field: "user_id", headerName: "ID", flex: 1 },
    { field: "username", headerName: "Name", flex: 2 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <h2>Drivers List</h2>
      <DataGrid
        rows={drivers}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        getRowId={(row) => row.user_id} // Specify the custom ID field
        autoHeight
      />
    </div>
  );
};

export default DriversList;
