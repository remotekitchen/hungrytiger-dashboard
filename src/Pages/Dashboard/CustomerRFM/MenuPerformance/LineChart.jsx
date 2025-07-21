import ReactApexChart from "react-apexcharts";

const LineChart = () => {
  const generateRandomData = (count) => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push(Math.floor(Math.random() * 1201));
    }
    return data;
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const yTickValues = [
    0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1200,
  ];

  const seriesNames = ["Salad", "Burger", "Pizza", "Lemon Drink"];

  const series = seriesNames.map((name) => ({
    name,
    data: generateRandomData(12),
  }));

  const chartData = {
    series,
    options: {
      chart: {
        type: "line",
        toolbar: {
          show: true,
        },
        width: "100%",
        zoom: {
          enabled: false,
        },
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560"],
      xaxis: {
        categories: monthNames,
      },
      yaxis: {
        min: 0,
        max: 1200,
        tickAmount: 12,
        labels: {
          formatter: (value) => (value === 0 ? 0 : `${value}`),
        },
        tickPlacement: "between",
        tickValues: yTickValues,
      },
      grid: {
        padding: {
          right: 0,
          left: 0,
        },
      },
    },
  };

  return (
    <div className="w-full">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default LineChart;
