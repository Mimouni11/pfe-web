import React from "react";
import { BarLoader } from "react-spinners";
import "./loading.css";

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <img src="/logo.png" alt="Logo" className="logo" />
      <BarLoader color="#0084FF" />
    </div>
  );
};

export default SplashScreen;
