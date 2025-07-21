import React from 'react'

const RatingsCard = () => {
  return (
    <div className="flex flex-row gap-10 w-full h-20">
      <div className="w-1/4 h-full rounded-lg border border-[#C1C7CD] p-4">
        <div>
          <h1 className="text-[#697077] text-base">Surveys Taken</h1>
        </div>

        <div className="flex justify-between">
          <div className="text-[#21272A] text-xl font-bold">684</div>
          <div className="bg-[#25A249] text-white rounded-full px-3 pt-[2px] pb-[2px]">
            +43%
          </div>
        </div>
      </div>

      <div className="w-1/4 h-full rounded-lg border border-[#C1C7CD] p-4">
        <div>
          <h1 className="text-[#697077] text-base">Average Score</h1>
        </div>

        <div>
            4.2
        </div>
       
      </div>

      <div className="w-1/4 h-full rounded-lg border border-[#C1C7CD] p-4">
        <div>
          <h1 className="text-[#697077] text-base"> Response Rate</h1>
        </div>

        <div className="flex justify-between">
          <div className="text-[#21272A] text-xl font-bold">58%</div>
          <div className="bg-[#DA1E28] text-white rounded-full px-3 pt-[2px] pb-[2px]">
            -31%
          </div>
        </div>
      </div>

      <div className="w-1/4 h-full rounded-lg border border-[#C1C7CD] p-4">
        <div>
          <h1 className="text-[#697077] text-base">Average Response Time</h1>
        </div>

        <div className="flex justify-between">
          <div className="text-[#21272A] text-xl font-bold">1d 2h</div>
          <div className="bg-[#25A249] text-white rounded-xl px-3 pt-[2px] pb-[2px]">
            +20%
          </div>
        </div>
      </div>
    </div>
  )
}

export default RatingsCard