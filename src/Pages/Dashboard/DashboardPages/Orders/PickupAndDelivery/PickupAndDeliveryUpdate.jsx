import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { pickupData } from '../../../../../data/data';

const PickupAndDeliveryUpdate = () => {
  const [activeSection, setActiveSection] = useState('pending'); // Default to 'pending'

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  // order order_type when PickUp is yellow color, when Delivery is green color.code generate

  if (activeSection === 'pending') {
    pickupData.map((row) => {
      if (row.order_type === 'Pickup') {
        row.order_type = <p className='bg-[#FFEAB6] text-black text-center rounded-full'>{row.order_type}</p>;
      } else {
        row.order_type = <p className='bg-[#C4FFAF] text-black text-center rounded-full'>{row.order_type}</p>;
      }
    });
  }


  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold mb-7">Pickup And Delivery</h1>
      <div className="flex justify-between items-center  h-12 border-b border-b-[#DDE1E6]">
        <div className='flex gap-4'>
          <div
            className={`cursor-pointer ${activeSection === 'pending'
              ? 'text-[#12516F] border-b-2 border-b-[#12516F]'
              : 'text-black'
              }`}
            onClick={() => handleSectionClick('pending')}
          >
            Pending
          </div>
          <div
            className={`cursor-pointer ${activeSection === 'active'
              ? 'text-[#12516F] border-b-2 border-b-[#12516F]'
              : 'text-black'
              }`}
            onClick={() => handleSectionClick('active')}
          >
            Active
          </div>
          <div
            className={`cursor-pointer ${activeSection === 'complete'
              ? 'text-[#12516F] border-b-2 border-b-[#12516F]'
              : 'text-black'
              }`}
            onClick={() => handleSectionClick('complete')}
          >
            Complete
          </div>
        </div>
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-l-lg p-1 outline-none px-10 w-[250px]"
            />
            <div className=' absolute top-1 right-3'>
              <BiSearch className='text-2xl text-[#697077]' />
            </div>
          </div>
        </div>
      </div>
      {activeSection === 'pending' && (
        <table className="min-w-full border-collapse border border-gray-300 my-6 ">
          <thead>
            <tr className="bg-[#DDE1E6]">
              <th className="py-2 px-3  text-left">Received Time</th>
              <th className="py-2 px-3  text-left">Customer Name</th>
              <th className="py-2 px-3  text-left">Contact Number</th>
              <th className="py-2 px-3  text-left">Order Type</th>
              <th className="py-2 px-3  text-left">Order ID</th>
              <th className="py-2 px-3  text-left">Subtotal</th>
              <th className="py-2 px-3  text-left">Details</th>
              <th className="py-2 px-3  text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {pickupData.map((row) => (
              <tr key={row.id}>
                <td className="py-2 px-3 ">{row.received_time} <br /> <p className=''>{row.received_date}</p></td>
                <td className="py-2 px-3 ">{row.contact_number}</td>
                <td className="py-2 px-3 ">{row.contact_number}</td>
                <td className="py-2 px-3 ">{row.order_type}</td>
                <td className="py-2 px-3 ">{row.order_id}</td>
                <td className="py-2 px-3 ">{row.subtotal}</td>
                <td className="py-2 px-3 text-blue-500 underline">Click</td>
                <td className='flex jitems-center py-2 '>
                  <button className="px-4 py-1 mt-2 bg-[#42C2FF] text-white rounded-lg">Process</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {activeSection === 'active' && (
        // Render the Active table here
        <table className="min-w-full border-collapse border border-gray-300 my-6 ">
          <thead>
            <tr className="bg-[#DDE1E6]">
              <th className="py-2 px-3  text-left">Preparing</th>
              <th className="py-2 px-3  text-left">Contact Number</th>
              <th className="py-2 px-3  text-left">Order Type</th>
              <th className="py-2 px-3  text-left">Details</th>
              <th className="py-2 px-3  text-left">ETA</th>
              <th className="py-2 px-3  text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {pickupData.map((row) => (
              <tr key={row.id}>
                <td className="py-2 px-3 ">{row.preparing}</td>
                <td className="py-2 px-3 ">{row.contact_number}</td>
                <td className="py-2 px-3 ">{row.order_type}</td>
                <td className="py-2 px-3 text-blue-500 underline">Click</td>
                <td className="py-2 px-3 ">{row.ETA}</td>
                <td className='flex items-center py-2 '>
                  <button className="px-4 py-1 bg-green-500 text-white rounded-lg" >Mark Ready</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {activeSection === 'complete' && (
        // Render the Complete table here
        <div className="flex flex-col overflow-x-auto">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 my-6">
                  <thead>
                    <tr className="bg-[#DDE1E6]">
                      <th className="py-2 px-3  text-left">Received</th>
                      <th className="py-2 px-3  text-left">Delivered</th>
                      <th className="py-2 px-3  text-left">Customer Name</th>
                      <th className="py-2 px-3  text-left">Contact Number</th>
                      <th className="py-2 px-3  text-left">Order Type</th>
                      <th className="py-2 px-3  text-left">Order ID</th>
                      <th className="py-2 px-3  text-left">Subtotal</th>
                      <th className="py-2 px-3  text-left">Estimated Payout</th>
                      <th className="py-2 px-3  text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pickupData.map((row) => (
                      <tr key={row.id}>
                        <td className="py-2 px-3 ">{row.received_time} <br /> <p className=''>{row.received_date}</p></td>
                        <td className="py-2 px-3 ">{row.delivery_time} <br /> <p className=''>{row.delivery_date}</p></td>
                        <td className="py-2 px-3 ">{row.contact_number}</td>
                        <td className="py-2 px-3 ">{row.contact_number}</td>
                        <td className="py-2 px-3 ">{row.order_type}</td>
                        <td className="py-2 px-3 ">{row.order_id}</td>
                        <td className="py-2 px-3 ">{row.subtotal}</td>
                        <td className="py-2 px-3 ">{row.payout}</td>
                        <td className='flex jitems-center py-2 '>
                          <button className="px-4 py-1 mt-5 bg-[#42C2FF] text-white rounded-lg" >Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className='flex justify-center items-end min-h-screen'>

        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <a href="#" className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
            <span className="sr-only">Previous</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
            </svg>
          </a>

          <a href="#" aria-current="page" className="relative z-10 inline-flex items-center bg-[#42C2FF] px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">1</a>
          <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">2</a>
          <a href="#" className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">3</a>
          <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
          <a href="#" className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">8</a>
          <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">9</a>
          <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">10</a>
          <a href="#" className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
            <span className="sr-only">Next</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
          </a>
        </nav>
      </div>
    </div>
  );
};

export default PickupAndDeliveryUpdate;
