import React from 'react';
import { payoutData } from '../../../data/data';

const PayoutSettings = () => {

  // status active bg green-500 text-white and inactive bg red-500 text-white
  if (payoutData) {
    payoutData.map((item) => {
      if (item.status === 'Active') {
        item.status = (
          <span className="bg-green-500 text-white rounded-full px-2 py-1">
            Active
          </span>
        );
      } 
      if (item.status === 'Inactive') {
        item.status = (
          <span className="bg-red-500 text-white rounded-full px-2 py-1">
            Inactive
          </span>
        );
      }
      return item;
    });
  }

  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold mb-7">Payout Settings</h1>
      <p>Set your payout frequency for each location</p>

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr className='text-left'>
              <th className="p-2">
                <input type="checkbox" />
              </th>
              <th className="p-2">Location</th>
              <th className="p-2">Payout Method</th>
              <th className="p-2">Status</th>
              <th className="p-2">Payment Frequency</th>
            </tr>
          </thead>
          <tbody>
            {payoutData.map((item, index) => (
              <tr key={index}>
                <td className="p-2">
                  <input type="checkbox" />
                </td>
                <td className="p-2">{item.location}</td>
                <td className="p-2">{item.payoutMethod}</td>
                <td className="p-2">{item.status}</td>
                <td className="p-2">
                  <select className="p-2">
                    <option value="item">{item.paymentFrequency}</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4">
        Save Changes
      </button>
    </div>
  );
};

export default PayoutSettings;
