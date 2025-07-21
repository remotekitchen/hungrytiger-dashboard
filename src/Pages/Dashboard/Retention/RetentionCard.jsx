import React from "react";
import { CiDollar } from "react-icons/ci";

const RetentionCard = () => {
  return (
    <div className="my-5 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      <div className="rounded border border-gray-200 bg-[#F3F4F6] p-3 cursor-pointer">
        <div className="flex justify-between items-center">
          <p className="font-bold">Total Customer</p>
          <p className="text-green-500">+16.45%</p>
        </div>
        <p className="font-bold text-xl py-1 text-[#000000ab]">200</p>
        <div className="flex items-center justify-between">
          <p className="text-blue-500 font-medium">View net earning</p>
          <p className="p-2 bg-[#d6ddeb] rounded text-blue-500">
            <CiDollar className="font-bold text-lg text-blue-500" />
          </p>
        </div>
      </div>

      <div className="rounded border border-gray-200 bg-[#F3F4F6] p-3 cursor-pointer">
        <div className="flex justify-between items-center">
          <p className="font-bold">Loyalty Customer</p>
          <p className="text-green-500">+40</p>
        </div>
        <p className="font-bold text-xl py-1 text-[#000000ab]">120</p>
        <div className="flex items-center justify-between">
          <p className="text-blue-500 font-medium">See details</p>
          <p className="p-2 bg-[#d6ddeb] rounded text-blue-500">
            <CiDollar className="font-bold text-lg text-blue-500" />
          </p>
        </div>
      </div>

      <div className="rounded border border-gray-200 bg-[#F3F4F6] p-3 cursor-pointer">
        <div className="flex justify-between items-center">
          <p className="font-bold">Retention rate</p>
          <p className="text-red-500">-3.75%%</p>
        </div>
        <p className="font-bold text-xl py-1 text-[#000000ab]">30%</p>
        <div className="flex items-center justify-between">
          <p className="text-blue-500 font-medium">View all orders</p>
          <p className="p-2 bg-[#d6ddeb] rounded text-blue-500">
            <CiDollar className="font-bold text-lg text-blue-500" />
          </p>
        </div>
      </div>

      <div className="rounded border border-gray-200 bg-[#F3F4F6] p-3 cursor-pointer">
        <div className="flex justify-between items-center">
          <p className="font-bold">Average order time</p>
          <p className="text-green-500">+0.00%</p>
        </div>
        <p className="font-bold text-xl py-1 text-[#000000ab]">3.2</p>
        <div className="flex items-center justify-between">
          <p className="text-blue-500 font-medium">Times per month</p>
          <p className="p-2 bg-[#d6ddeb] rounded text-blue-500">
            <CiDollar className="font-bold text-lg text-blue-500" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default RetentionCard;
