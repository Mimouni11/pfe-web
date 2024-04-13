// Loading.js
import React from "react";
import { css } from "@emotion/react";
import RotateLoader from "react-spinners/RotateLoader";
import "./loading.css";

const Loading = () => {
  const override = css`
    display: block;
    margin: 0 auto;
  `;

  return (
    <div className="loading-container">
      <img src="/semi.jpg" alt="Logo" className="logo" />{" "}
      <div className="spinner-container">
        <RotateLoader color="#000000" css={override} loading={true} size={30} />
      </div>
    </div>
  );
};

export default Loading;
