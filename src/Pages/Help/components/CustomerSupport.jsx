import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import QR from "../../../assets/platform_logos/QR.png";
import ScrollToTop from "../../ScrollToTop";

const CustomerSupport = () => {
  const location = useLocation();
  const fullUrl = `${window.location.origin}${location.pathname}${location.search}${location.hash}`;

  // State to store the value
  const [store, setStore] = useState("chatchef");

  useEffect(() => {
    if (fullUrl.includes("techchef")) {
      setStore("techchef");
    } else if (fullUrl.includes("chatchef")) {
      setStore("chatchef");
    }
  }, [fullUrl]);

  return (
    <>
      <ScrollToTop />
      <div>
        <img src={QR} className="w-40 h-40" alt="QR" />
        <p className="text-[#426479] py-4">
          Scan to Chat with Customer Support in Whatsapp
        </p>
        <h1 className="text-3xl font-bold">Customer Support information</h1>
        <h2 className="text-[#426479] py-2">Email Address</h2>
        <p className="px-3">
          {store === "chatchef"
            ? "sales@chatchefs.com"
            : store === "techchef"
            ? "techchefs.ca"
            : ""}{" "}
        </p>
        <h2 className="text-[#426479] py-2">Phone Number</h2>
        <p className="px-3">+1 236-239-6988</p>
      </div>
    </>
  );
};

export default CustomerSupport;
