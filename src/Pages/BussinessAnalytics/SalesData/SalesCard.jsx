import React from "react";

const SalesCard = ({ performanceData }) => {
  return (
    <div className="flex flex-row gap-10 w-full h-20">
      <div className="w-1/4 h-full rounded-lg border border-[#C1C7CD] p-4">
        <div>
          <h1 className="text-[#697077] text-base">Gross Sales</h1>
        </div>

        <div className="flex justify-between">
          <div className="text-[#21272A] text-xl font-bold">
            {performanceData?.gross_sales !== undefined
              ? `CA$${parseFloat(performanceData.gross_sales).toFixed(2)}`
              : "CA$0.00"}
          </div>

          {/* <div className="bg-[#25A249] text-white rounded-full px-3 pt-[2px] pb-[2px]">
            +2.5%
          </div> */}
        </div>
      </div>

      <div className="w-1/4 h-full rounded-lg border border-[#C1C7CD] p-4">
        <div>
          <h1 className="text-[#697077] text-base">Net Sales</h1>
        </div>

        <div className="flex justify-between">
          <div className="text-[#21272A] text-xl font-bold">
            {performanceData?.net_sales !== undefined
              ? `CA$${parseFloat(performanceData?.net_sales).toFixed(2)}`
              : "CA$0.00"}
          </div>
          {/* <div className="bg-[#DA1E28] text-white rounded-full px-3 pt-[2px] pb-[2px]">
            -5%
          </div> */}
        </div>
      </div>

      <div className="w-1/4 h-full rounded-lg border border-[#C1C7CD] p-4">
        <div>
          <h1 className="text-[#697077] text-base">Order Volume</h1>
        </div>

        <div className="flex justify-between">
          <div className="text-[#21272A] text-xl font-bold">
            {performanceData?.order_volume || "0"}
          </div>
          {/* <div className="bg-[#25A249] text-white rounded-full px-3 pt-[2px] pb-[2px]">
            +1.2%
          </div> */}
        </div>
      </div>

      <div className="w-1/4 h-full rounded-lg border border-[#C1C7CD] p-4">
        <div>
          <h1 className="text-[#697077] text-base">Average Order Value</h1>
        </div>

        <div className="flex justify-between">
          <div className="text-[#21272A] text-xl font-bold">
            {performanceData?.avg_order_value !== undefined
              ? `CA$${parseFloat(performanceData?.avg_order_value).toFixed(2)}`
              : "CA$0.00"}
          </div>
          {/* <div className="bg-[#25A249] text-white rounded-xl px-3 pt-[2px] pb-[2px]">
            +5.2%
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SalesCard;
