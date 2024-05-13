import React from "react";
import Mapping from "./Mapping";
import Sidebar from "./Sidebar";
import Header from "./Header";
const Tracking = () => {
  return (
    <div className="grid-container">
      <Sidebar></Sidebar>
      <Header></Header>
      <div className="main-container">
        <h1>Map View</h1>
        <Mapping />
      </div>
    </div>
  );
};

export default Tracking;
