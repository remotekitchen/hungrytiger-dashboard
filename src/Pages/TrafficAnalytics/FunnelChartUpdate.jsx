import { Chart, registerables } from "chart.js";
import { FunnelController, FunnelElement } from "chartjs-chart-funnel";
import React, { useEffect, useRef } from "react";

Chart.register(...registerables, FunnelController, FunnelElement);

const FunnelChartUpdate = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const myFunnelChart = new Chart(ctx, {
      type: "funnel",
      data: {
        labels: [
          "Number Of DO Views 2500",
          "Added In the Cart 30",
          "Order Confirmed 14",
          "Payment Confirm 10",
        ],
        datasets: [
          {
            data: [75, 50, 30, 10],
            backgroundColor: ["#AAD2E8", "#6DB1E3", "#3380B9", "#315C84"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.label}: ${tooltipItem.raw}%`;
              },
            },
          },
        },
        layout: {
          padding: {
            top: 20,
            bottom: 20,
          },
        },
      },
    });

    return () => {
      myFunnelChart.destroy();
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default FunnelChartUpdate;
