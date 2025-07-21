import { useEffect, useState } from "react";
import { useGetAccountDetailsQuery } from "../../../../redux/features/Account/accountApi";
import { useGetRestaurentsQuery } from "../../../../redux/features/menuCreation/menuCreationApi";
import {
  useGetSalesDataQuery,
  useGetSalesDataUpdateQuery,
} from "../../../../redux/features/salesDashboard/salesApi";
import OverviewCard from "./OverviewCard";
import OverviewChart from "./OverviewChart";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "../../../Ratings/DatePicker/DatePicker";

const Overviews = () => {
  const { data: salesData } = useGetSalesDataQuery();
  const [transformedData, setTransformedData] = useState(null);
  const [orderMethod, setOrderMethod] = useState("");
  const [daySelect, setDaySelect] = useState("today");
  const [selectedRestaurant, setSelectedRestaurant] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [range, setRange] = useState(false);

  // // console.log("STARTDATE", startDate);
  // // console.log("ENDDATE", endDate);

  // // console.log("salesData", salesData);
  // // console.log("🚀 ~ Overviews ~ daySelect:", daySelect);

  const formatDateToLongString = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const formattedStartDate = formatDateToLongString(startDate);
  const formattedEndDate = formatDateToLongString(endDate);

  const {
    data: restaurantList,
    isLoading: isRestaurantLoading,
    isError: isRestaurantError,
    error: restaurantError,
  } = useGetRestaurentsQuery();
  const { data: userData } = useGetAccountDetailsQuery();

  /* Format date for date Range picker */
  function formatDate(dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const handleDaySelect = (e) => {
    setDaySelect(e.target.value);
    setStartDate("");
    setEndDate("");
    setRange(true);
  };

  /* end */
  const { data: salesDataUpdate } = useGetSalesDataUpdateQuery({
    start_date: startDate ? formatDate(startDate) : "",
    end_date: endDate ? formatDate(endDate) : "",
    restaurantId: parseInt(selectedRestaurant) || 0,
    day: startDate || endDate ? "" : daySelect || "today",
    orderMethod: orderMethod || "",
  });

  // // console.log("🚀 ~ Overviews ~ salesDataUpdate:", salesDataUpdate);

  // select first restaurant by default
  useEffect(() => {
    if (restaurantList?.results?.length > 0) {
      setSelectedRestaurant(restaurantList.results[0].id);
    }
  }, [restaurantList]);

  // useEffect(() => {
  //   if (daySelect) {
  //     setStartDate();
  //     setEndDate();
  //   }
  // }, [daySelect, startDate, endDate]);

  useEffect(() => {
    if (salesData?.results) {
      const data = salesData.results;

      // Get the current date and month
      const today = new Date();
      const currentMonth = today.getMonth(); // 0-based index (0 = January, 11 = December)
      const currentYear = today.getFullYear();
      const startOfToday = new Date(today.setHours(0, 0, 0, 0));
      const endOfToday = new Date(today.setHours(23, 59, 59, 999));

      // Initialize result structure
      const result = {
        today_sales: 0,
        order_of_this_month: 0,
        sales_of_this_month: 0,
        monthly_sales_revenue: Array.from({ length: 12 }, () => ({
          sales: 0,
          revenue: 0,
        })),
      };

      // Iterate over each order
      data.forEach((order) => {
        if (selectedRestaurant && order.restaurant !== selectedRestaurant) {
          return;
        }

        if (orderMethod !== "all" && order.order_method !== orderMethod) {
          return;
        }

        const orderDate = new Date(order.created_date);

        // Check if the order date is today
        if (orderDate >= startOfToday && orderDate <= endOfToday) {
          result.today_sales += order.total;
        }

        // Check if the order date is in the current month
        if (
          orderDate.getMonth() === currentMonth &&
          orderDate.getFullYear() === currentYear
        ) {
          result.order_of_this_month += 1;
          result.sales_of_this_month += order.total;
        }

        // Check the month of the order date
        if (orderDate.getFullYear() === currentYear) {
          const month = orderDate.getMonth();
          result.monthly_sales_revenue[month].sales += 1;
          result.monthly_sales_revenue[month].revenue += order.total;
        }
      });

      // Assign monthly sales and revenue to the result
      result.january_sales_revenue = result.monthly_sales_revenue[0];
      result.february_sales_revenue = result.monthly_sales_revenue[1];
      result.march_sales_revenue = result.monthly_sales_revenue[2];
      result.april_sales_revenue = result.monthly_sales_revenue[3];
      result.may_sales_revenue = result.monthly_sales_revenue[4];
      result.june_sales_revenue = result.monthly_sales_revenue[5];
      result.july_sales_revenue = result.monthly_sales_revenue[6];
      result.august_sales_revenue = result.monthly_sales_revenue[7];
      result.september_sales_revenue = result.monthly_sales_revenue[8];
      result.october_sales_revenue = result.monthly_sales_revenue[9];
      result.november_sales_revenue = result.monthly_sales_revenue[10];
      result.december_sales_revenue = result.monthly_sales_revenue[11];
      // Update the state with the transformed data
      setTransformedData(result);
    } else {
      // console.log("No sales data available.");
    }
  }, [salesData, selectedRestaurant, orderMethod]);

  const [activeTab, setActiveTab] = useState("all");
  const seriesData = [500, 300, 200, 150];

  // Function to generate dynamic class name
  const getClassName = (tabName) => {
    return `text-xl font-bold cursor-pointer ${
      activeTab === tabName ? "border-b-2 border-[#12516F] text-[#12516F]" : ""
    }`;
  };

  // Function to handle tab click
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <section className="w-full h-full p-2">
      <h2 className="text-3xl font-bold">Dashboard</h2>
      {/* header  */}
      <div className="my-10">
        <div className="p-5 bg-[#42C2FF] rounded-2xl text-white">
          <div className="w-full h-full flex justify-between">
            <div>
              <p className="font-medium">{getTimeOfDay()}</p>
              <h2 className="text-3xl font-bold ">
                {userData?.first_name ? userData?.first_name : "User"}
              </h2>
            </div>
            <div className="">
              {daySelect || startDate == null || endDate == null ? (
                <p className="font-medium text-xl">
                  {daySelect === "today"
                    ? "Todays Sales"
                    : daySelect === "yesterday"
                    ? "Yesterday Sales"
                    : daySelect === "7"
                    ? "Last 7 days Sales"
                    : daySelect == "30"
                    ? "Last 30 days Sales"
                    : "Todays Sales"}
                </p>
              ) : (
                <div className="flex flex-col justify-center">
                  <span className="text-xl font-bold">Total Sales</span>
                  <span className="flex items-center gap-2">
                    <span className="text-xl font-bold">From:</span>{" "}
                    <span className="font-medium">{formattedStartDate}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-xl font-bold">To:</span>{" "}
                    <span className="font-medium">{formattedEndDate}</span>
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-bold">
                CA $
                <span>
                  {salesDataUpdate?.today_sale
                    ? parseFloat(salesDataUpdate?.today_sale).toFixed(2)
                    : 0}
                </span>{" "}
              </h3>

              {/* <div className="flex items-center gap-3">
                <p className="flex items-center gap-1 px-2 bg-[#25A249] rounded-xl">
                  <span>
                    <FaArrowUp />
                  </span>
                  <span>+</span>
                  <span>2.5</span>
                  <span>%</span>
                </p>
                <h5 className="font-medium">From Last Monday</h5>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="border border-gray-300 rounded-2xl px-3 py-5">
        <div className="flex justify-between px-10">
          {/* <div>
            <span className="px-10 py-2 rounded-2xl bg-[#25A249]"></span>
          </div> */}
          <div></div>
          {/* select category  */}
          <div>
            <div>
              <form>
                <div className="flex items-center gap-3">
                  <select
                    className="select select-bordered w-full"
                    name="restaurant"
                    value={selectedRestaurant}
                    onChange={(e) =>
                      setSelectedRestaurant(parseFloat(e.target.value))
                    }
                  >
                    <option disabled selected value={0}>
                      Select Restaurant
                    </option>
                    {restaurantList?.results?.map((res) => (
                      <option key={res.id} value={res.id}>
                        {res.name}
                      </option>
                    ))}
                  </select>
                  {/* <select className="select select-bordered select-sm w-auto bg-white">
                    <option selected>All Channels</option>
                    <option>Channel One</option>
                    <option>Channel Two</option>
                  </select>
                  <select className="select select-bordered select-sm w-auto bg-white">
                    <option selected>Sort By Day</option>
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                  </select> */}
                  <select
                    className="select select-bordered w-28"
                    name="order_method"
                    value={orderMethod}
                    onChange={(e) => setOrderMethod(e.target.value)}
                  >
                    <option disabled selected value={0}>
                      Select Order Method
                    </option>
                    <option value="">All</option>
                    <option value="delivery">Delivery</option>
                    <option value="pickup">Pickup</option>
                  </select>

                  <select
                    className="select select-bordered w-32"
                    name="day_select"
                    value={daySelect}
                    onChange={handleDaySelect}
                  >
                    <option disabled selected value={0}>
                      Select Day
                    </option>
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                    <option value={7}>Last 7 days</option>
                    <option value={30}>Last 30 days</option>
                  </select>

                  {/* <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    isClearable
                    placeholderText="Start Date"
                    showIcon
                    className="text-center bg-[#42C2FF] w-[150px] text-white text-sm rounded-lg"
                  />
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    isClearable
                    placeholderText="End Date"
                    showIcon
                    className="text-center bg-[#42C2FF] w-[150px] text-white text-sm rounded-lg"
                  /> */}

                  <DatePicker
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    daySelect={daySelect}
                    setDaySelect={setDaySelect}
                    range={range}
                    startDate={startDate}
                    endDate={endDate}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* chart  */}
        <div className="my-5">
          <OverviewChart
            salesDataUpdate={salesDataUpdate}
            daySelect={daySelect}
            startDate={startDate}
            endDate={endDate}
          />
          {/* <ApexChart /> */}
        </div>
      </div>

      {/* total overview */}
      <div className="w-full flex justify-between gap-5 my-5">
        <OverviewCard
          text={`Order of ${
            daySelect === "today" || daySelect === "yesterday"
              ? daySelect
              : daySelect == "7"
              ? "the last 7 days"
              : daySelect == "30"
              ? "the last 30 days"
              : startDate && endDate
              ? `${formattedStartDate} - ${formattedEndDate}`
              : daySelect
          }`}
          count={`${salesDataUpdate?.this_month_order}`}
          percentage=""
        />
        <OverviewCard
          text={`Sales of ${
            daySelect === "today" || daySelect === "yesterday"
              ? daySelect
              : daySelect == "7"
              ? "the last 7 days"
              : daySelect == "30"
              ? "the last 30 days"
              : startDate && endDate
              ? `${formattedStartDate} - ${formattedEndDate}`
              : daySelect
          }`}
          count={`$ ${parseFloat(salesDataUpdate?.this_month_sale).toFixed(2)}`}
          percentage=""
        />
        {/* <OverviewCard
          text="Website visit this month"
          count="--"
          percentage=""
        /> */}
        <OverviewCard
          text="Total Registered Clients"
          count={`${salesDataUpdate?.total_customer}`}
          percentage=""
        />
      </div>

      {/* overview 2nd chart  */}
      {/* <div className="border border-gray-300 rounded-2xl px-3 py-5 my-5">
        <div className="grid grid-cols-12">
          <div className="grid col-span-4">
            <DonutChartSmartAgent series={seriesData} />
          </div>
          <div className="grid col-span-8">
            <div>
              <ul className="w-full flex justify-between items-center px-5">
                <span
                  className={getClassName("all")}
                  onClick={() => handleTabClick("all")}
                >
                  All
                </span>
                <span
                  className={getClassName("basic")}
                  onClick={() => handleTabClick("basic")}
                >
                  Basic
                </span>
                <span
                  className={getClassName("marketing")}
                  onClick={() => handleTabClick("marketing")}
                >
                  Marketing
                </span>
                <span
                  className={getClassName("management")}
                  onClick={() => handleTabClick("management")}
                >
                  Management
                </span>
              </ul>
            </div>
            <SmartAgentCard />
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default Overviews;
