import React, { useEffect, useState } from "react";
import axios from "axios";
import SERVER_URL from "../../../config";
import Table from "react-bootstrap/Table";

const VehicleMaintenanceTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://${SERVER_URL}:5001/vehicle-maintenance-fact`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching the data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Maintenance Data Table</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Vehicle ID</th>
            <th>Last Maintenance Date</th>
            <th>Next Maintenance Date</th>
            <th>Last Repair Date</th>
            <th>Maintenance Interval</th>
            <th>Time Since Last Repair</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.vehicle_id}>
              <td>{item.vehicle_id}</td>
              <td>{item.last_maintenance_date_key}</td>
              <td>{item.next_maintenance_date_key}</td>
              <td>{item.last_repared_at_key}</td>
              <td>{item.maintenance_interval}</td>
              <td>{item.time_since_last_repair}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default VehicleMaintenanceTable;
