import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Profile = () => {
  return (
    <div className="grid-container">
      <Header />

      <Sidebar />
    </div>
  );
};

export default Profile;
