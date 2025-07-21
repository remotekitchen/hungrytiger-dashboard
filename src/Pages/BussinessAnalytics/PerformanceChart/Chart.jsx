import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const toFixedTwo = (value) => parseFloat(value || 0).toFixed(2);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
};

const getDatesArray = (startDate, endDate) => {
  const datesArray = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    datesArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return datesArray;
};

const formatStartEndDate = (dateString) => {
  const date = new Date(dateString);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const monthName = monthNames[monthIndex];
  return `${monthName} ${day}`;
};

const Chart = ({ performanceData, daySelect, value }) => {
  const [state, setState] = useState({
    options: {
      legend: {
        show: false,
        position: "top",
        horizontalAlign: "left",
      },
      colors: ["#42C2FF", "#80CAEE"],
      chart: {
        fontFamily: "Satoshi, sans-serif",
        height: 335,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#42C2FF",
          top: 10,
          blur: 4,
          left: 0,
          opacity: 0.1,
        },
        toolbar: {
          show: false,
        },
      },
      responsive: [
        {
          breakpoint: 1024,
          options: {
            chart: {
              height: 300,
            },
          },
        },
        {
          breakpoint: 1366,
          options: {
            chart: {
              height: 350,
            },
          },
        },
      ],
      stroke: {
        width: [2, 2],
      },
      grid: {
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 4,
        colors: "#fff",
        strokeColors: ["#42C2FF", "#80CAEE"],
        strokeWidth: 3,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        hover: {
          size: undefined,
          sizeOffset: 5,
        },
      },
      xaxis: {
        type: "category",
        categories: [],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        title: {
          style: {
            fontSize: "0px",
          },
        },
        min: 0,
        max: 1200, // This will be updated dynamically
        labels: {
          formatter: function (value) {
            return value;
          },
        },
      },
    },
    series: [
      {
        name: "Sales",
        data: [],
      },
      {
        name: "Revenue",
        data: [],
      },
    ],
  });

  useEffect(() => {
    let categories;
    let salesData = [];
    let revenueData = [];
    let maxAmount = 0;

    if (performanceData?.orderData) {
      salesData = performanceData.orderData.map(
        (dayData) => dayData?.total_orders || 0
      );
      revenueData = performanceData.orderData.map((dayData) =>
        toFixedTwo(dayData?.amount)
      );
      maxAmount = Math.max(
        ...performanceData.orderData.map((data) => data.amount || 0)
      );
      // Round up to the nearest 10
      maxAmount = Math.ceil(maxAmount / 10) * 10;
    }

    if (daySelect === "7") {
      categories = performanceData?.orderData
        ?.map((data) => formatDate(data.end))
        .reverse();
    } else if (daySelect === "30") {
      categories = performanceData?.orderData
        ?.map((data) => formatDate(data.end))
        .reverse();
    } else if (value?.startDate && value?.endDate) {
      const datesArray = getDatesArray(value.startDate, value.endDate);
      categories = datesArray.map((date) => formatStartEndDate(date));
    } else {
      categories = [
        "12 AM",
        "2 AM",
        "4 AM",
        "6 AM",
        "8 AM",
        "10 AM",
        "12 PM",
        "2 PM",
        "4 PM",
        "6 PM",
        "8 PM",
        "10 PM",
      ];
    }

    setState((prevState) => ({
      ...prevState,
      options: {
        ...prevState.options,
        xaxis: {
          ...prevState.options.xaxis,
          categories: categories,
        },
        yaxis: {
          ...prevState.options.yaxis,
          max: maxAmount,
        },
      },
      series: [
        // {
        //   name: "Sales",
        //   data: salesData,
        // },
        {
          name: "Sales",
          data: revenueData,
        },
      ],
    }));
  }, [performanceData, daySelect, value]);

  return (
    <div id="chartOne" className="-ml-5">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type={state.options.chart.type}
        height={500}
      />
    </div>
  );
};

export default Chart;
