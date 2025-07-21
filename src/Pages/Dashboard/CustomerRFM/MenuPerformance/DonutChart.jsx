import React from "react";
import ReactApexChart from "react-apexcharts";

const DonutChart = ({ series }) => {
  const chartData = {
    series: series,
    options: {
      chart: { type: "donut" },
      legend: { show: false },
      dataLabels: { enabled: false },
      tooltip: { enabled: false },
      fill: { colors: ["#F1FF4C", "#FF6767", "#73FF78"] },
      states: {
        hover: { filter: { type: "lighten", value: 0.5 } },
        active: { filter: { type: "none", value: 0 } },
      },
      stroke: { width: 0 },
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            size: "70%",
            labels: {
              show: false,
            },
          },
        },
      },
    },
  };

  return (
    <div className="relative w-full h-full">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        width="100%"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div>
          <h4 className="text-xl font-bold mb-1">Item Sold</h4>
          <p className="text-lg font-medium">2.5k</p>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
