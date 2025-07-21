import React from 'react'
import starBlack from "../../../assets/Ratings/starBlack.png";
import arrowButton from "../../../assets/Ratings/arrowButton.png";

const StoreRating = () => {
  return (
    <div className="w-full border border-[#DDE1E6] rounded-3xl p-4">
    <div className="flex flex-row justify-between items-center border-separate border-b-2 border-[#DDE1E6]">
      <h5 className="text-[20px] leading-5 font-bold">
        Store rating
      </h5>
      <div className="px-2 py-2 bg-transparent rounded-md ">
        <select className="bg-transparent outline-none text-md text-[#697077] font-semibold">
          <option value="optionA">Top Store</option>
        </select>
      </div>
    </div>
    <div className="flex flex-row justify-between items-baseline gap-2 py-[14px] px-[10px] border-separate border-b-2 border-[#DDE1E6]">
      <div className="flex flex-row gap-2">
      <p className="text-sm font-normal">1</p>
      <h1 className="text-sm font-normal">Restaurant Name 1</h1>
      </div>
      
      <div className="flex flex-row gap-1">
      <h2>4.9</h2>
      <div className="flex flex-col items-center">
        <img className="w-[17.8px] h-[17.9px]" src={starBlack} alt="star-black"/>
        <h5 className="text-[12px] leading-4 font-normal ">1 vote</h5>
      </div>
      </div>
     
    </div>

    <div className="flex flex-row justify-between items-baseline gap-2 py-[14px] px-[10px] ">
      <div className="flex flex-row gap-2">
      <p className="text-sm font-normal">2</p>
      <h1 className="text-sm font-normal">Restaurant Name 2</h1>
      </div>
      
      <div className="flex flex-row gap-1">
      <h2>4.7</h2>
      <div className="flex flex-col items-center">
        <img className="w-[17.8px] h-[17.9px]" src={starBlack} alt="star-black"/>
        <h5 className="text-[12px] leading-4 font-normal ">2 votes</h5>
      </div>
      </div>
     
    </div>

    <button className="flex flex-row gap-4 items-center px-2 text-primary">
      View More
      <img className="w-[24px] h-[24px]" src={arrowButton} alt="button-arrow"/>
    </button>
  </div>
  )
}

export default StoreRating