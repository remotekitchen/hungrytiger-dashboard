import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import emoji_devil from "../../../assets/Ratings/Emoji/emoji_devil.png";
import emoji_laugh from "../../../assets/Ratings/Emoji/emoji_laugh.png";
import emoji_love from "../../../assets/Ratings/Emoji/emoji_love.png";
import emoji_neutral from "../../../assets/Ratings/Emoji/emoji_neutral.png";
import emoji_sad from "../../../assets/Ratings/Emoji/emoji_sad.png";


const options = {
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "bar",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    plotOptions: {
      bar: {
        horizontal: true,
      },
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
  plotOptions: {
    bar: {
      horizontal: true,
      columnWidth: "20%",
    },
  },

  xaxis: {
    type: "category",

    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
};

const ChartSurvey = () => {
  const [state, setState] = useState({
    options: {
      colors: ["#42C2FF", "#80CAEE"],
      chart: {
        fontFamily: "Satoshi, sans-serif",
        height: 335,
        type: "bar",
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
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "20%",
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

      dataLabels: {
        enabled: false,
      },

      xaxis: {
        type: "category",
      },
    },

    series: [
      {
        data: [
          {
            x: "",
            y: 10,
          },
          {
            x: "",
            y: 8,
          },
          {
            x: "",
            y: 5,
          },
          {
            x: "",
            y: 7,
          },
          {
            x: "",
            y: 9,
          },
        ],
      },
    ],
  });
  return (
    <div className="flex flex-col p-2">
      <div>
        <h1 className="text-[20px] leading-5 font-bold">Survey Breakdown</h1>
      </div>

      <div className="flex flex-row items-center ">
        <div className="flex flex-col gap-6 mb-2">
          <img
            className="w-[28px] h-[28px]"
            src={emoji_love}
            alt="emoji_love"
          />
          <img
            className="w-[28px] h-[28px]"
            src={emoji_laugh}
            alt="emoji_laugh"
          />
          <img
            className="w-[28px] h-[28px]"
            src={emoji_neutral}
            alt="emoji_neutral"
          />
          <img
            className="w-[28px] h-[28px]"
            src={emoji_sad}
            alt="emoji_sad"
          />
          <img
            className="w-[28px] h-[28px]"
            src={emoji_devil}
            alt="emoji_devil"
          />
        </div>

        <div id="chartOne" className="w-full">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type={options.chart.type}
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartSurvey;
