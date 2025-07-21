import React from "react";
import Chart from "react-apexcharts";

const RetentionChart = () => {
  // Options for the stacked area chart
  const areaChartOptions = {
    chart: {
      type: "area",
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    colors: ["#6A5ACD", "#5B4096"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      categories: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ],
      title: {
        text: "Month",
      },
    },
    yaxis: {
      title: {
        text: "Customer Count",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.6,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
    title: {
      text: "Customer Retention",
      align: "left",
    },
  };

  const areaChartSeries = [
    {
      name: "Total",
      data: [
        10000, 20000, 30000, 40000, 50000, 60000, 70000, 75000, 80000, 85000,
        90000,
      ],
    },
    {
      name: "Retained Customer",
      data: [
        5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000,
        55000,
      ],
    },
  ];

  // Options for the pie chart
  const pieChartOptions = {
    chart: {
      type: "pie",
    },
    labels: ["New", "Retained"],
    colors: ["#6A5ACD", "#5B4096"],
    legend: {
      position: "bottom",
      fontSize: "14px",
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "8px",
        fontWeight: "bold",
      },
      dropShadow: {
        enabled: false,
      },
      formatter: (val, opts) => {
        const label = opts.w.globals.labels[opts.seriesIndex];
        return `${label}\n(${val.toFixed(1)}%)`;
      },
      offset: -10,
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
        offsetY: 0,
        dataLabels: {
          offset: -5,
          minAngleToShowLabel: 10,
        },
      },
    },
    title: {
      text: "Total Retention",
      align: "center",
      margin: 10,
      offsetX: 0,
      offsetY: 10,
      floating: false,
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#000",
      },
    },
  };

  const pieChartSeries = [73.4, 26.6];

  return (
    <div className="my-5 grid grid-cols-12 gap-2 w-full h-full">
      <div className="grid col-span-9 bg-gray-100 h-96 rounded-lg">
        {/* Stacked area chart implementation */}
        <Chart
          options={areaChartOptions}
          series={areaChartSeries}
          type="area"
          height="100%"
        />
      </div>
      <div className="grid col-span-3 items-center justify-center">
        {/* Pie chart implementation */}
        <Chart
          options={pieChartOptions}
          series={pieChartSeries}
          type="pie"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default RetentionChart;
