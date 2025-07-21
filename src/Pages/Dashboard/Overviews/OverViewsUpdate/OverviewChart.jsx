import Chart from "react-apexcharts";

const OverviewChart = ({
  transformedData,
  salesDataUpdate,
  daySelect,
  startDate,
  endDate,
}) => {
  // console.log("startDate", startDate);
  // // console.log(typeof daySelect)
  // // console.log(
  //   "🚀 ~ OverviewChart ~ salesDataUpdate:",
  //   salesDataUpdate?.orderData
  // );
  // Function to convert values to fixed two decimal places
  const toFixedTwo = (value) => parseFloat(value || 0).toFixed(2);

  // Extract sales and revenue data from salesDataUpdate
  const salesData =
    salesDataUpdate?.orderData?.map((dayData) => dayData?.total_orders || 0) ||
    [];

  const revenueData =
    salesDataUpdate?.orderData?.map((dayData) => toFixedTwo(dayData?.amount)) ||
    [];
  // // console.log("🚀 ~ OverviewChart ~ salesData:", salesData);
  // // console.log("🚀 ~ OverviewChart ~ revenueData:", revenueData);

  /* last 7 days calculation adnan */
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  }

  /* Start date and end date calculation */
  // Function to generate an array of dates between two dates
  const getDatesArray = (startDate, endDate) => {
    const datesArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
      datesArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return datesArray;
  };

  const datesArray = getDatesArray(startDate, endDate);

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

  const dateArrayFormat = datesArray.map((date) => formatStartEndDate(date));

  // console.log("dateArrayFormat length:", dateArrayFormat.length); // Should be 5
  // console.log("dateArrayFormat:", dateArrayFormat);

  const Day7 = salesDataUpdate?.orderData?.map((data) => formatDate(data.end));

  // console.log("7 Days", Day7);
  /* end */

  let categories;

  if (daySelect === "7") {
    categories = salesDataUpdate?.orderData?.map((data) =>
      formatDate(data.end)
    );
  } else if (daySelect === "30") {
    categories = salesDataUpdate?.orderData?.map((data) =>
      formatDate(data.end)
    );
  } else if (startDate && endDate) {
    categories = dateArrayFormat;
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

  /* end */

  // Sample data for the chart
  const chartData = {
    series: [
      {
        name: "Sales",
        data: salesData,
      },
      {
        name: "Revenue",
        data: revenueData,
      },
    ],
    options: {
      chart: {
        id: "line-with-data-labels",
        toolbar: {
          show: true,
        },
      },
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        categories: categories,
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return value.toFixed(0);
          },
        },
      },
    },
  };

  return (
    <section>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
      {/* <div className="flex px-10 justify-between">
        <p>Monday, Oct 19</p>
        <div className="flex items-center gap-3">
          Last Monday Sales
          <div className="form-control">
            <input type="checkbox" className="toggle toggle-info" />
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default OverviewChart;
