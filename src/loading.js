import React from "react";
import { BarLoader } from "react-spinners";
import "./loading.css";

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <img src="/logo.png" alt="Logo" className="logo-image" />
      <BarLoader color="#0084FF" width={"30%"} />
    </div>
  );
};

export default SplashScreen;
