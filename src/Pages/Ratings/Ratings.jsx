import React from "react";
import DatePickerForm from "../BussinessAnalytics/DatePicker/DatePickerForm";
import star from "../../assets/Ratings/star.png";
import arrowUp from "../../assets/Ratings/arrowUp.png";
import RatingsCard from "./RatingsData/RatingsCard";
import Chart from "./RatingsChart/Chart";
import arrowButton from "../../assets/Ratings/arrowButton.png";
import ChartHorizontal from "./RatingsChart/ChartHorizontal";
import ChartSurvey from "./RatingsChart/ChartSurvey";
import Issues from "./Issues/Issues";
import CurrentRating from "./CurrentRatings/CurrentRating";
import Working from "./Working";

const Ratings = () => {
  return (
    // <div className="w-full pt-16 pb-6 px-6 flex flex-col gap-4">
    //   <div className="w-full flex justify-between">
    //     <div className="w-1/3">
    //       <h1 className="text-3xl font-bold ">Rating Dashboard</h1>
    //     </div>

    //     <DatePickerForm />
    //   </div>

    //   <div className="w-full flex flex-col gap-[12px]">
    //     <div className="flex flex-row gap-8">
    //       <div className="w-1/2 flex flex-col">
    //         <div className="w-[50%] flex flex-col gap-2">
    //           <h2 className=" font-bold text-base">Average Rating</h2>
    //           <div className="flex flex-row gap-2">
    //             <img src={star} alt="rating-star" />
    //             <h1 className="text-[42px] leading-10 font-bold">4.5</h1>
    //           </div>
    //           <div className="flex flex-row gap-2 items-center">
    //             <div className="bg-[#25A249] text-[20px] leading-5 text-white rounded-full px-3 pt-[2px] pb-[2px] flex flex-row items-center ">
    //               <img
    //                 className="w-[18px] h-[18px]"
    //                 src={arrowUp}
    //                 alt="arrow-up"
    //               />
    //               2.5%
    //             </div>
    //             <h1 className="text-[22px] leading-5 font-bold">
    //               From Previous Year
    //             </h1>
    //           </div>
    //         </div>
    //         <div className="w-full h-full">
    //           <Chart />
    //         </div>
    //       </div>

    //       <CurrentRating />
    //     </div>
    //     <div className="w-full flex flex-row gap-2">
    //       <div className="w-1/2">
    //         <h5 className="text-[20px] leading-5 font-bold">Rating Breakdown</h5>
    //         <ChartHorizontal />
    //       </div>
    //       <div className="w-1/2 ">
    //         <ChartSurvey />
    //       </div>
    //     </div>
    //     <RatingsCard />
    //     <div>
    //       <Issues />
    //       <button className="flex flex-row gap-4 items-center px-2 text-primary mt-2">
    //         View Restaurant Rating
    //         <img
    //           className="w-[24px] h-[24px]"
    //           src={arrowButton}
    //           alt="button-arrow"
    //         />
    //       </button>
    //     </div>
    //   </div>
    // </div>

    <Working/>
  );
};

export default Ratings;
