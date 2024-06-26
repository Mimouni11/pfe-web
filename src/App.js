import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter and Route
import Loading from "./loading";
import Login from "./Login";
import Home from "./admin/Home"; // Import the Home component
import Gerer from "./admin/Gerer";
import ChefHome from "./chef/Home";
import Mecano_tasks from "./chef/Mecano_tasks";
import Driver_tasks from "./chef/Driver_tasks";
import QrCode from "./chef/QrCode";
import Profile from "./chef/Profile";
import Users from "./admin/Users";
import "./chef/tasks.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [showLoginform, setShowLoginform] = useState(false);
  useEffect(() => {
    // Simulate loading process (e.g., fetch data, initialize app)
    setTimeout(() => {
      setLoading(false); // Set loading state to false after a delay
    }, 2000); // Simulated loading time: 2 seconds
  }, []);

  useEffect(() => {
    // Show authentication form after loading
    if (!loading) {
      setShowLoginform(true);
    }
  }, [loading]);

  return (
    <div className="App">
      <Router>
        {/* Wrap your components with Router */}
        {loading ? (
          <Loading />
        ) : (
          <Routes>
            {/* Define routes */}
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/chef/Home" element={<ChefHome />} />
            <Route path="/chef/Profile" element={<Profile />}></Route>
            <Route path="/chef/Mecano_tasks" element={<Mecano_tasks />} />
            <Route path="/chef/Driver_tasks" element={<Driver_tasks />} />
            <Route path="/chef/QrCode" element={<QrCode />} />
            <Route path="/Users" element={<Users />} />
            <Route path="/Gerer" element={<Gerer />} />{" "}
            <Route path="/Login" element={<Login />} />{" "}
            {/* Add more routes as needed */}
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
