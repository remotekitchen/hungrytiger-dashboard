import React from 'react'

const data = [
  {
    id: 1,
    invoiceHistory: 'INV-001',
    from: 'Company A',
    location: 'New York',
    frequency: 'Monthly',
    dueDate: '2023-09-15',
    amount: '$1000',
    status: 'Paid',
  },
  {
    id: 2,
    invoiceHistory: 'INV-002',
    from: 'Company B',
    location: 'New York',
    frequency: 'Monthly',
    dueDate: '2023-09-15',
    amount: '$1000',
    status: 'Paid',
  }
  // Add more data objects as needed
];

const Invoices = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className='text-3xl font-bold mb-8'>Invoices</h1>
      {/* open invoice history table */}
      <table className="min-w-full border-collapse border border-gray-300 mb-10">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-3 border-b border-gray-300 text-left">Open Invoices</th>
            <th className="py-2 px-3 border-b border-gray-300 text-left">From</th>
            <th className="py-2 px-3 border-b border-gray-300 text-left">Location</th>
            <th className="py-2 px-3 border-b border-gray-300 text-left">Frequency</th>
            <th className="py-2 px-3 border-b border-gray-300 text-left">Due Date</th>
            <th className="py-2 px-3 border-b border-gray-300 text-left">Amount</th>
            <th className="py-2 px-3 border-b border-gray-300 text-left">Status</th>
            <th className="py-2 px-3 border-b border-gray-300 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td className="py-2 px-3 border-b border-gray-300">{row.invoiceHistory} <br/> <p className='bg-gray-300 text-red-400 rounded-full text-center'>Overdue 14 days ago</p></td>
              <td className="py-2 px-3 border-b border-gray-300">{row.from}</td>
              <td className="py-2 px-3 border-b border-gray-300">{row.location}</td>
              <td className="py-2 px-3 border-b border-gray-300">{row.frequency}</td>
              <td className="py-2 px-3 border-b border-gray-300">{row.dueDate}</td>
              <td className="py-2 px-3 border-b border-gray-300">{row.amount}</td>
              <td className="py-2 px-3 border-b border-gray-300">{row.status}</td>
              <td className='flex jitems-center py-2 '>

              <button className="px-4 py-1 mt-2 bg-[#1363DF] text-white rounded">pay</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* invoices history table */}
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-3 border-b border-gray-300 text-left">Invoice History</th>
            <th className="py-2 px-3 border-b border-gray-300 text-left">From</th>
            <th className="py-2 px-3 border-b border-gray-300 text-left">Location</th>
            <th className="py-2 px-3 border-b border-gray-300 text-left">Frequency</th>
            <th className="py-2 px-3 border-b border-gray-300 text-left">Due Date</th>
            <th className="py-2 px-3 border-b border-gray-300 text-left">Amount</th>
            <th className="py-2 px-3 border-b border-gray-300 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td className="py-2 px-3 border-b border-gray-300">{row.invoiceHistory}</td>
              <td className="py-2 px-3 border-b border-gray-300">{row.from}</td>
              <td className="py-2 px-3 border-b border-gray-300">{row.location}</td>
              <td className="py-2 px-3 border-b border-gray-300">{row.frequency}</td>
              <td className="py-2 px-3 border-b border-gray-300">{row.dueDate}</td>
              <td className="py-2 px-3 border-b border-gray-300">{row.amount}</td>
              <td className="py-2 px-3 border-b border-gray-300">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Invoices