import ReactApexChart from "react-apexcharts";

const DonutChartSmartAgent = ({ series }) => {
  const chartData = {
    series: series,
    options: {
      chart: { type: "donut", position: "relative" },
      legend: { show: false },
      dataLabels: { enabled: false },
      tooltip: { enabled: false },
      fill: { colors: ["#B8E8FE", "#42C2FF", "#F1C21B", "#DA1E28"] },
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
    <section className="relative w-full h-full">
      <h2 className="text-3xl font-bold flex justify-center items-center py-5">
        Smart Agent
      </h2>
      <div className="relative">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="donut"
          width="100%"
        />
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="flex justify-center items-center flex-col font-bold">
            <h4 className="text-5xl font-bold mb-1">3</h4>
            <p className="text-xl font-medium">issues</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonutChartSmartAgent;
