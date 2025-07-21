import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import TestCompo from "./TabComponents/TestCompo";
import Tab from "./Tab";
import RadialProgress from "./RadialProgress";

const DoughnutChart = ({
  selectedLocation,
  setSelectedLocation,
  val
}) => {

  const [selectedTab, setSelectedTab] = useState("All");

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };
  const tabData = [
    { name: "All", element: <TestCompo /> },
    { name: "Basic", element: <TestCompo /> },
    { name: "Marketing", element: <TestCompo /> },
    { name: "Post-Sales", element: <TestCompo /> },
  ];

  const selectedTabContent =
    tabData.find((data) => data.name === selectedTab)?.element || null;
  // const selectedTab = tabSelection[tabName];
  return (
    <div className="grid grid-cols-4 justify-between items-start gap-4 my-12 m-4">
      <div className="col-span-2 text-center">
        <div id="chartThree" className="border-2 p-4">
          {/* <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          /> */}
          <RadialProgress selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}/>
          <button name="smart-agent" className="btn btn-sm block mx-auto my-4">
            Smart Agent
          </button>
        </div>
      </div>
      <div className="col-span-2 shadow-lg bg-white rounded-md">
        <div className="">
          <Tab
            tabData={tabData}
            selectedTab={selectedTab}
            onTabClick={handleTabClick}
          />
          <div>{selectedTabContent}</div>
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;
