import React, { useState, useEffect } from "react";
import {
  MDBCarousel,
  MDBCarouselItem,
  MDBCarouselCaption,
  MDBBtn,
  MDBDatePicker,
} from "mdb-react-ui-kit";
import DatePicker from "react-datepicker";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const DriverTasks = () => {
  const [selectedDate, setSelectedDate] = useState(null); // State for selected date
  const [freeTrucks, setFreeTrucks] = useState([]); // State for free trucks
  const [selectedTruck, setSelectedTruck] = useState(""); // State for selected truck type
  const [fetchedDrivers, setFetchedDrivers] = useState([]); // State for fetched drivers
  const [selectedDriver, setSelectedDriver] = useState({}); // State for selected driver
  const [taskFields, setTaskFields] = useState([{ id: "", description: "" }]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleTaskIdChange = (value, index) => {
    const updatedTaskFields = [...taskFields];
    updatedTaskFields[index].id = value;
    setTaskFields(updatedTaskFields);
  };

  const handleTaskDescriptionChange = (value, index) => {
    const updatedTaskFields = [...taskFields];
    updatedTaskFields[index].description = value;
    setTaskFields(updatedTaskFields);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date); // Update selected date
  };

  const handleTruckSelection = (truckType) => {
    setSelectedTruck(truckType); // Update selected truck type
  };

  const fetchFreeTrucks = () => {
    // Check if both selectedTruck and selectedDate are set
    if (!selectedTruck || !selectedDate) {
      alert("Please select both a truck type and a date");
      return;
    }

    const formattedDate = selectedDate.toISOString().split("T")[0]; // Calculate formatted date

    axios
      .get("http://192.168.1.136:5001/free-trucks", {
        params: {
          type: selectedTruck,
          date: formattedDate,
        },
      })
      .then((response) => {
        if (response.data && response.data.free_trucks) {
          setFreeTrucks(response.data.free_trucks);
        } else {
          setFreeTrucks([]); // Set trucks to an empty array if data is undefined
        }
      })
      .catch((error) => {
        console.error("Error fetching free trucks:", error);
      });
  };

  const fetchFreeDrivers = (truck) => {
    // Check if selectedDate is null
    if (!selectedDate) {
      console.error("Selected date is null");
      return;
    }

    // Make API call to fetch free drivers based on truck
    axios
      .post("http://192.168.1.136:5001/free-drivers", {
        date: selectedDate.toISOString().split("T")[0], // Pass date as a single-element tuple
        type: selectedTruck,
      })
      .then((response) => {
        if (response.data && response.data.drivers) {
          setFetchedDrivers(response.data.drivers);
          console.log("Fetched drivers:", response.data.drivers);
        } else {
          setFetchedDrivers([]); // Set drivers to an empty array if data is undefined
        }
      })
      .catch((error) => {
        console.error("Error fetching free drivers:", error);
      });
  };

  const handleFetchFreeDrivers = (truck) => {
    fetchFreeDrivers(truck);
  };

  const handleDriverSelection = (event) => {
    const selectedDriverUsername = event.target.value;
    setSelectedDriver({ username: selectedDriverUsername });
  };

  useEffect(() => {
    // Fetch free drivers initially
    fetchFreeDrivers(selectedTruck);
  }, [selectedTruck]);

  const handleSaveTask = (matricule) => {
    // Check if all necessary data is available
    console.log("Selected driver:", selectedDriver);
    console.log("Selected date:", selectedDate);
    console.log("Task fields:", taskFields);

    if (
      !selectedDriver.username || // Check if username is present
      !matricule || // Check if matricule is present
      !selectedDate ||
      taskFields.some((task) => !task.id || !task.description)
    ) {
      alert("Please select a driver, date, and fill in all task fields");
      return;
    }

    // Iterate over taskFields array and send POST request for each task
    taskFields.forEach((task) => {
      const taskData = {
        id_task: task.id,
        username: selectedDriver.username, // Pass the username instead of id_driver
        task: task.description,
        date: selectedDate.toISOString().split("T")[0],
        matricule: matricule, // Use the matricule from the table row
      };

      // Make POST request to insert task for the driver
      axios
        .post("http://192.168.1.136:5001/insert-tasks-driver", taskData)
        .then((response) => {
          console.log("Task inserted successfully:", response.data.message);
          // Optionally, you can reset the taskFields array after successful insertion
          setTaskFields([{ id: "", description: "" }]);
        })
        .catch((error) => {
          console.error("Error inserting task:", error);
        });
    });
  };

  const navigateToQRCode = () => {
    navigate("/chef/QrCode"); // Navigate to "/qr-code" when the button is clicked
  };

  return (
    <div>
      <div style={styles.carouselContainer}>
        <MDBCarousel
          showIndicators
          showControls
          fade
          ride="carousel"
          style={styles.carousel}
        >
          <MDBCarouselItem itemId={1}>
            <img src="/isuzu.jpg" className="d-block w-100" alt="..." />
            <MDBCarouselCaption>
              <h5>Pick Up</h5>
              <MDBBtn
                color="primary"
                onClick={() => handleTruckSelection("pickup")}
              >
                Choose
              </MDBBtn>
            </MDBCarouselCaption>
          </MDBCarouselItem>

          <MDBCarouselItem itemId={2}>
            <img src="/box_truck.jpeg" className="d-block w-100" alt="..." />
            <MDBCarouselCaption>
              <h5>Small Truck</h5>
              <MDBBtn
                color="primary"
                onClick={() => handleTruckSelection("truck")}
              >
                Choose
              </MDBBtn>
            </MDBCarouselCaption>
          </MDBCarouselItem>

          <MDBCarouselItem itemId={3}>
            <img src="/truck.jpg" className="d-block w-100" alt="..." />
            <MDBCarouselCaption>
              <h5>Semi</h5>
              <MDBBtn
                color="primary"
                onClick={() => handleTruckSelection("semi")}
              >
                Choose
              </MDBBtn>
            </MDBCarouselCaption>
          </MDBCarouselItem>
        </MDBCarousel>
      </div>
      <h2>Select a Date</h2>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => handleDateChange(date)}
      />
      <input
        type="text"
        value={selectedTruck}
        onChange={(e) => setSelectedTruck(e.target.value)}
        placeholder="Selected Truck"
      />
      <MDBBtn
        onClick={() => fetchFreeTrucks(selectedTruck)}
        color="primary"
        className="mt-3"
      >
        Fetch Free Trucks
      </MDBBtn>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Matricule</th>
            <th>Type</th>
            <th>Task ID</th>
            <th>Task Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(freeTrucks) &&
            freeTrucks.map((truck, index) => (
              <tr key={index}>
                <td>{truck.matricule}</td>
                <td>{truck.type}</td>
                <td>
                  <input
                    type="text"
                    value={taskFields[index] ? taskFields[index].id : ""}
                    onChange={(e) => handleTaskIdChange(e.target.value, index)}
                    placeholder="Task ID"
                  />
                </td>
                <td>
                  <textarea
                    value={
                      taskFields[index] ? taskFields[index].description : ""
                    }
                    onChange={(e) =>
                      handleTaskDescriptionChange(e.target.value, index)
                    }
                    placeholder="Task Description"
                  ></textarea>
                </td>
                <td>
                  {/* Button to fetch free drivers */}
                  <button
                    style={{ padding: "5px 10px", fontSize: "14px" }}
                    onClick={() => handleFetchFreeDrivers(truck)}
                  >
                    Fetch Free Drivers
                  </button>
                  {/* Dropdown menu */}
                  <select
                    style={{ padding: "5px", fontSize: "14px" }}
                    onChange={(event) => handleDriverSelection(event, truck)}
                    value={selectedDriver ? selectedDriver.id : ""}
                  >
                    <option value="">Select Driver</option>
                    {fetchedDrivers.map((driver) => (
                      <option key={driver.id} value={driver.id}>
                        {driver.username}
                      </option>
                    ))}
                  </select>

                  {/* Save button */}
                  <button
                    style={{ padding: "5px 10px", fontSize: "14px" }}
                    onClick={() => handleSaveTask(truck.matricule)}
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <button onClick={navigateToQRCode}>Go to QR Code</button>
    </div>
  );
};

const styles = {
  carouselContainer: {
    width: "50%", // Adjust the width as needed
    margin: "0 auto", // Center the carousel horizontally
    marginTop: "20px", // Add top margin
  },
  carousel: {
    width: "100%", // Set the carousel width to 100%
  },
};

export default DriverTasks;
