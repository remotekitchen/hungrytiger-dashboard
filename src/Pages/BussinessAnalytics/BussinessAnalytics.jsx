import { useEffect, useState } from "react";
import { useGetPerformanceQuery } from "../../redux/features/businessPerformance/businessPerformanceApi";
import { useGetAllRestaurantQuery } from "../../redux/features/restaurentCreation/restaurentCreationApi";
import DatePickerForm from "./DatePicker/DatePickerForm";
import Chart from "./PerformanceChart/Chart";
import SalesCard from "./SalesData/SalesCard";

const BussinessAnalytics = () => {
  const [orderMethod, setOrderMethod] = useState("");
  const [daySelect, setDaySelect] = useState("today");
  const [selectedRestaurant, setSelectedRestaurant] = useState();
  const [value, setValue] = useState({
    // startDate: new Date(),
    // endDate: new Date().setMonth(11),
    startDate: "",
    endDate: "",
  });
  const handleDaySelectChange = (day) => {
    setDaySelect(day);
    setValue({ startDate: "", endDate: "" });
  };

  const handleValueChange = (newValue) => {
    setValue(newValue);
    setDaySelect("");
  };

  const { data: performanceData } = useGetPerformanceQuery({
    start_date: value?.startDate || "",
    end_date: value?.endDate || "",
    restaurantId: selectedRestaurant || 0,
    day: daySelect,
    orderMethod: orderMethod,
  });
  const { data: allRestaurant } = useGetAllRestaurantQuery();

  // console.log("🚀 ~ BussinessAnalytics ~ performanceData:", performanceData);

  // select first restaurant by default
  useEffect(() => {
    setSelectedRestaurant(allRestaurant?.results[0]?.id);
  }, [allRestaurant]);

  return (
    <div className="w-full h-screen pt-[70px] pb-6 px-6">
      <div className="w-full flex justify-between">
        <div className="w-1/3">
          <h1 className="text-3xl font-bold ">Business Performance</h1>
        </div>

        <DatePickerForm
          daySelect={daySelect}
          setDaySelect={handleDaySelectChange}
          selectedRestaurant={selectedRestaurant}
          setSelectedRestaurant={setSelectedRestaurant}
          orderMethod={orderMethod}
          setOrderMethod={setOrderMethod}
          allRestaurant={allRestaurant}
          value={value}
          setValue={handleValueChange}
        />
      </div>
      <SalesCard performanceData={performanceData} />
      <div className="w-full mt-4 border border-[#C1C7CD] rounded-2xl px-4 py-5">
        {/* <div className="w-full h-[50px] ml-4 flex flex-row gap-4">
          <button className="border-2 rounded-3xl py-2 px-6 bg-[#42C2FF] text-white text-[20px] leading-5 font-medium flex items-center justify-center">
            Default
          </button>

          <button className="border-2 rounded-3xl py-2 px-6 border-[#42C2FF] text-[#42C2FF] text-[20px] leading-5 font-medium flex items-center justify-center">
            Locations
          </button>

          <button className="border-2 rounded-3xl py-2 px-6 border-[#42C2FF] text-[#42C2FF] text-[20px] leading-5 font-medium flex items-center justify-center">
            Restrurents
          </button>
        </div> */}
        <div className="w-full h-[600px] mt-3">
          <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default m-4 p-3 sm:px-7.5 xl:col-span-8">
            {/* <h1 className="text-center">Monthly Sales Volume</h1> */}

            <Chart
              performanceData={performanceData}
              value={value}
              daySelect={daySelect}
            />
          </div>
        </div>
      </div>

      {/* <TableComponent /> */}
    </div>
  );
};

export default BussinessAnalytics;
