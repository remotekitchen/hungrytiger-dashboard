import React, { useState } from 'react'
import { payoutActivityData } from '../../../data/data'
import { RxDashboard } from 'react-icons/rx';
import { MdArrowCircleRight } from 'react-icons/md';
import { AiOutlineCloudDownload } from 'react-icons/ai';



const data = [
  { id: 1, name: 'Earnings', value: '$949.6', icon: <MdArrowCircleRight /> },
  { id: 2, name: 'Marketing', value: '-$332.48', icon: <MdArrowCircleRight /> },
  { id: 3, name: 'Uber Fees', value: '-$170.82', icon: <MdArrowCircleRight /> },
  { id: 4, name: 'Net Taxes', value: '$10.27', icon: <MdArrowCircleRight /> },
  { id: 5, name: 'Total Payout', value: '$456.03', icon: <RxDashboard /> },
];

const PayoutActivity = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };
  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold mb-7">Payout Activity</h1>
      <div className="flex items-center gap-6">
        <div className="flex my-4">
          <div>
            <input
              type="date"
              className="border border-gray-300 rounded-md p-2"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>
          <div>
            <input
              type="date"
              className="border border-gray-300 rounded-md p-2"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </div>
        </div>
        <div>
          <button className="bg-[#42C2FF] text-white font-bold py-2 px-4 rounded-lg">
          Resend Statement
          </button>
        </div>
        <div>
          <div className='flex items-center gap-2 text-[#42C2FF]'>
            <AiOutlineCloudDownload className="text-2xl" />
            <h1>Download</h1>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {
          payoutActivityData.map((item, index) => (
            <div key={index} className='bg-[#d8dee9] rounded-lg  p-10' >
              <h1 className='text-md'>{item.title}</h1>
              <p className='text-4xl font-bold'>{item.amount}</p>
            </div>
          ))
        }
      </div>
      <h2 className="text-2xl font-bold my-3">Payment breakdown</h2>
      <p>Your next payout is Sep 18, 2023. Payments typically deposit in 1-3 business days but may vary based on your bank</p>

      <div className="overflow-x-auto mt-3">
        {data.map((item) => (
          <div className="flex justify-between border border-gray-300 p-2" key={item.id}>
            <span className='flex gap-2 items-center'>{item.icon}{item.name}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PayoutActivity