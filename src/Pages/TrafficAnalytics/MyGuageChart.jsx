import React from "react";
import GaugeChart from "react-gauge-chart";

const MyGaugeChart = () => {
  return (
    <div
      style={{
        // backgroundColor: "#333",
        padding: "20px",
        borderRadius: "10px",
        width: "max-content",
        margin: "auto",
      }}
    >
      {/* <h3 style={{ color: "black", textAlign: "center" }}>
        GaugeChart with default props
      </h3> */}
      <GaugeChart
        id="gauge-chart"
        nrOfLevels={5}
        percent={0.76}
        colors={["#BC2970", "#FF5C65", "#FD9982", "#F8C268", "#6CCE81"]}
        arcWidth={0.4}
        textColor="#000000"
      />
    </div>
  );
};

export default MyGaugeChart;
