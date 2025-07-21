import React from "react";
import chatchef_logo from "../../../assets/campaign/chatchef_logo.png";
import styles from "./fissionCampaign.module.css";
const FissionCampaignImage = () => {
  return (
    <div
      className={`${styles.fissionCampaign__image_container} flex items-center justify-center h-64 p-3 w-96 my-3 rounded-xl`}
    >
      {/* <h1>hello world</h1> */}
      {/* campaign preview */}
      <div className=" h-4/5 w-4/5 p-3 bg-blue-300 rounded-lg">
        <img
          src={chatchef_logo}
          alt="chatchef logo"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default FissionCampaignImage;
