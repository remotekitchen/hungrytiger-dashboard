import React, { useState } from 'react'
import SubcriptionDetailsModal from '../Modal/SubcriptionDetailsModal';

const data = [
  {
    id: 1,
    Monthly: 'Monthly',
    RecurringCost: '$1000',
    TotalLocations: '1',
    Plans: 'Plan A',
    Products: 'Product A',
    StartDate: '2023-09-15',
    NextInvoiceDue: '2023-09-15',
  },
  // Add more data objects as needed
];

const Subscription = () => {
  const [subscriptionDetailsModal, setSubscriptionDetailsModal] = useState(false)
  return (
    <div>
      <h1 className='text-3xl'>Subscriptions</h1>
      <div className="rounded-lg p-4 border-2 border-black mt-4 z-10">
        <div className="flex justify-between items-center mb-4">
          <div className='flex gap-2 items-center'>
            <div className="text-xl font-semibold">Subscriptions 422cc</div>
              <span className='bg-[#C8FFE7] text-green-500 px-4 py-1 border rounded'>Active</span>
          </div>
          <div>
            <button onClick={() => setSubscriptionDetailsModal(true)} className="border border-black px-3 py-1 rounded-md mr-2">View details</button>
          </div>
        </div>
        <hr className="mb-4 border border-black" />
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-3 text-left">Frequency</th>
              <th className="py-2 px-3 text-left">Recurring cost</th>
              <th className="py-2 px-3 text-left">Total locations</th>
              <th className="py-2 px-3 text-left">Plans</th>
              <th className="py-2 px-3 text-left">Products</th>
              <th className="py-2 px-3 text-left">Start Date</th>
              <th className="py-2 px-3 text-left">Next Invoice Due</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td className="py-2 px-3">{row.Monthly}</td>
                <td className="py-2 px-3">{row.RecurringCost}</td>
                <td className="py-2 px-3">{row.TotalLocations}</td>
                <td className="py-2 px-3">{row.Plans}</td>
                <td className="py-2 px-3">{row.Products}</td>
                <td className="py-2 px-3">{row.StartDate}</td>
                <td className="py-2 px-3">{row.NextInvoiceDue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <SubcriptionDetailsModal subscriptionDetailsModal={subscriptionDetailsModal} setSubscriptionDetailsModal={setSubscriptionDetailsModal}/>
    </div>
  )
}

export default Subscription