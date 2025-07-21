import React from "react";

const Issues = () => {
  return (
    <div className="flex flex-row gap-2">
      <div className="w-1/2 border border-[#C1C7CD] rounded-3xl flex flex-col p-4 justify-center">
        <h1 className="text-center text-[20px] leading-5 font-bold">Top Strengths</h1>

        <div className="flex flex-col gap-1 px-2">
            <div className="flex flex-row justify-between items-baseline">
                <p className="text-[16px] leading-5 font-normal">Food:Taste</p>
                <p className="text-[16px] leading-5 font-normal text-[#25A249]">1 Mentions</p>
            </div>
            <div className="flex flex-row justify-between items-baseline">
                <p className="text-[16px] leading-5 font-normal">Food:Temperature</p>
                <p className="text-[16px] leading-5 font-normal text-[#25A249]">2 Mentions</p>
            </div>
            <div className="flex flex-row justify-between items-baseline">
                <p className="text-[16px] leading-5 font-normal">Food:Safety</p>
                <p className="text-[16px] leading-5 font-normal text-[#25A249]">2 Mentions</p>
            </div>
        </div>
      </div>
      <div className="w-1/2 border border-[#C1C7CD] rounded-3xl flex flex-col p-4 justify-center">
        <h1 className="text-center text-[20px] leading-5 font-bold">Top Issues</h1>

        <div className="flex flex-col gap-1 px-2">
            <div className="flex flex-row justify-between items-baseline">
                <p className="text-[16px] leading-5 font-normal">Food:Temperature</p>
                <p className="text-[16px] leading-5 font-normal text-[#DA1E28]">3 Mentions</p>
            </div>
            <div className="flex flex-row justify-between items-baseline">
                <p className="text-[16px] leading-5 font-normal">Service:Speed</p>
                <p className="text-[16px] leading-5 font-normal text-[#DA1E28]">1 Mentions</p>
            </div>
            <div className="flex flex-row justify-between items-baseline">
                <p className="text-[16px] leading-5 font-normal">Service:Friendliness</p>
                <p className="text-[16px] leading-5 font-normal text-[#DA1E28]">2 Mentions</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Issues;
