/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";
import { greetings } from "../../../utils/dateformat";
import BarChart from "./Charts/BarChart";
import DoughnutChart from "./DoughnutChart";
import LiveData from "./LiveData";
import OrdersVolumeChart from "./OrdersVolumeChart";
import SalesVolumeChart from "./SalesVolumeChart";

const Overviews = () => {
  const [selectedIcon, setSelectedIcon] = useState("dollar");

  const auth = JSON.parse(localStorage.getItem("auth")).user;

  const first_name = auth?.first_name;
  const last_name = auth?.last_name;

  const handleToggle = () => {
    setSelectedIcon((prevIcon) =>
      prevIcon === "shopping" ? "dollar" : "shopping"
    );
  };
  const [selectedLocation, setSelectedLocation] = useState("Richmond");

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };
  return (
    <div>
      <div className="flex justify-between items-center m-4 py-4 px-6 bg-gradient-to-r from-[#184DE2] to-[#194DE2] rounded-md">
        <div className="text-white">
          <button
            name="admin"
            className="text-white bg-blue-400 px-3 rounded-md"
            disabled
          >
            Admin
          </button>
          <h1 className="text-2xl font-bold">{greetings()},</h1>
          <p className="text-lg font-medium mb-2">{`${first_name} ${last_name}`}</p>
          <div className="flex border w-[68px] rounded-md cursor-pointer">
            <div
              className={`p-1 rounded ${
                selectedIcon === "dollar" ? "bg-white" : "bg-transparent"
              }`}
              onClick={handleToggle}
            >
              <BsCurrencyDollar
                size={25}
                className={`p-1 rounded ${
                  selectedIcon === "dollar" ? "text-blue-500" : "text-white"
                }`}
              />
            </div>
            <div
              className={`p-1 rounded ${
                selectedIcon === "shopping" ? "bg-white" : "bg-transparent"
              }`}
              onClick={handleToggle}
            >
              <AiOutlineShopping
                size={25}
                className={`p-1 rounded ${
                  selectedIcon === "shopping" ? "text-blue-500" : "text-white"
                }`}
              />
            </div>
          </div>
        </div>
        <div
          className={`text-white text-center ${
            selectedIcon === "shopping" && "hidden"
          }`}
        >
          <h6 className="text-sm">Today's Sales</h6>
          <h2 className="text-4xl font-bold">$421</h2>
          {/* <div className="flex justify-between items-center">
            <button className="border-2 rounded-md px-3 me-2 py-1">nbd</button>
            <h6 className="text-sm">bb</h6>
          </div> */}
          <h1>+213.9% From last Saturday</h1>
        </div>
        <div
          className={`text-white text-center ${
            selectedIcon === "dollar" && "hidden"
          }`}
        >
          <h6 className="text-sm">Order Volume</h6>
          <h2 className="text-4xl font-bold">10</h2>
          <h1>+100% From last Saturday</h1>
        </div>
      </div>
      {selectedIcon == "dollar" && (
        <div className="flex justify-end mr-8">
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn w-56 btn-sm bg-base-200 text-gray-600 border-none hover:bg-base-200 m-1"
            >
              Locations
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-8 shadow bg-base-100 rounded-box w-[20rem] h-[12rem]"
            >
              <button
                className={`btn w-56 btn-sm relative ${
                  selectedLocation === "Richmond"
                    ? "bg-base-200"
                    : "bg-base-100"
                } text-gray-600 border-none hover:bg-base-200 m-1`}
                onClick={() => handleLocationChange("Richmond")}
              >
                {selectedLocation === "Richmond" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5 text-green-500 absolute right-2 top-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
                Richmond
              </button>
              <button
                className={`btn w-56 btn-sm relative ${
                  selectedLocation === "Vancouver"
                    ? "bg-base-200"
                    : "bg-base-100"
                } text-gray-600 border-none hover:bg-base-200 m-1`}
                onClick={() => handleLocationChange("Vancouver")}
              >
                {selectedLocation === "Vancouver" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5 text-green-500 absolute right-2 top-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
                Vancouver
              </button>
            </ul>
          </div>
        </div>
      )}
      {selectedIcon == "shopping" ? (
        <OrdersVolumeChart />
      ) : (
        <SalesVolumeChart
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
      )}
      {selectedIcon == "shopping" ? (
        <LiveData />
      ) : (
        <LiveData
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
      )}
      {selectedIcon == "shopping" ? (
        <DoughnutChart />
      ) : (
        <DoughnutChart
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
      )}
      {selectedIcon == "shopping" ? (
        <BarChart />
      ) : (
        <BarChart
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
      )}
      {/* <LiveData selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
      <DoughnutChart selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}/>
      <BarChart selectedLocation={selectedLocation}/> */}
      {/* <TableVR /> */}
    </div>
  );
};
export default Overviews;
