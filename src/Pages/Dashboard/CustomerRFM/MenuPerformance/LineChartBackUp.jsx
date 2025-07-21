// import React from "react";
// import ReactApexChart from "react-apexcharts";

// const LineChart = () => {
//   const chartData = {
//     series: [
//       {
//         name: "Series 1",
//         data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
//       },
//       {
//         name: "Series 2",
//         data: [20, 55, 70, 90, 86, 72, 61, 50, 45],
//       },
//       {
//         name: "Series 3",
//         data: [55, 35, 75, 90, 75, 95, 65, 80, 70],
//       },
//       {
//         name: "Series 4",
//         data: [10, 20, 30, 40, 50, 60, 70, 80, 90],
//       },
//     ],
//     options: {
//       chart: {
//         type: "line",
//         toolbar: {
//           show: false,
//         },
//         width: "100%", // Set chart width to 100% of the container
//         zoom: {
//           enabled: false,
//         },
//       },
//       stroke: {
//         curve: "smooth",
//         width: 4, // Adjust line thickness
//       },
//       colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560"], // Set different colors for lines
//       xaxis: {
//         categories: [
//           "Jan",
//           "Feb",
//           "Mar",
//           "Apr",
//           "May",
//           "Jun",
//           "Jul",
//           "Aug",
//           "Sep",
//         ],
//       },
//       grid: {
//         padding: {
//           right: 0,
//           left: 0,
//         },
//       },
//     },
//   };

//   return (
//     <div className="w-full">
//       <ReactApexChart
//         options={chartData.options}
//         series={chartData.series}
//         type="line"
//         height={350}
//       />
//     </div>
//   );
// };

// export default LineChart;
