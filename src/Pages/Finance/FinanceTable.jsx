import React, { useState } from 'react';

const FinanceTable = () => {

    const paymentData = [
        {
            id: 1,
            orderDate: '2023-08-01',
            orderID: '#12345',
            orderStatus: 'Shipped',
            paymentStatus: 'Paid',
            cancellationStatus: 'Not Cancelled',
            platform: 'Online Store',
            revenue: 10.0,
            calculatedPayment: 330.0,
            differenceAmount: 10.0,
            actualPayment: 9.0,
            brand: 'ABC Brand',
          },
          {
            id: 2,
            orderDate: '2023-08-02',
            orderID: '#12346',
            orderStatus: 'Pending',
            paymentStatus: 'Pending',
            cancellationStatus: 'Cancelled',
            platform: 'Mobile App',
            revenue: 180.0,
            calculatedPayment: 170.0,
            differenceAmount: 50.0,
            actualPayment: 5.0,
            brand: 'XYZ Brand',
          },
          {
            id: 3,
            orderDate: '2023-08-01',
            orderID: '#12347',
            orderStatus: 'Shipped',
            paymentStatus: 'Paid',
            cancellationStatus: 'Not Cancelled',
            platform: 'Online Store',
            revenue: 350.0,
            calculatedPayment: 330.0,
            differenceAmount: 20.0,
            actualPayment: 8.0,
            brand: 'ABC Brand',
          },
          {
            id: 4,
            orderDate: '2023-08-01',
            orderID: '#12347',
            orderStatus: 'Shipped',
            paymentStatus: 'Paid',
            cancellationStatus: 'Not Cancelled',
            platform: 'Online Store',
            revenue: 350.0,
            calculatedPayment: 330.0,
            differenceAmount: 20.0,
            actualPayment: 8.0,
            brand: 'ABC Brand',
          },
          {
            id: 5,
            orderDate: '2023-08-01',
            orderID: '#12347',
            orderStatus: 'Shipped',
            paymentStatus: 'Paid',
            cancellationStatus: 'Not Cancelled',
            platform: 'Online Store',
            revenue: 350.0,
            calculatedPayment: 330.0,
            differenceAmount: 20.0,
            actualPayment: 8.0,
            brand: 'ABC Brand',
          },
          {
            id: 6,
            orderDate: '2023-08-01',
            orderID: '#12347',
            orderStatus: 'Shipped',
            paymentStatus: 'Paid',
            cancellationStatus: 'Not Cancelled',
            platform: 'Online Store',
            revenue: 350.0,
            calculatedPayment: 330.0,
            differenceAmount: 20.0,
            actualPayment: 8.0,
            brand: 'ABC Brand',
          },
      ];
    

  const columns = [
    { key: 'orderDate', title: 'Order Date' },
    { key: 'orderID', title: 'Order ID' },
    { key: 'orderStatus', title: 'Order Status' },
    { key: 'paymentStatus', title: 'Payment Status' },
    { key: 'cancellationStatus', title: 'Cancellation Status' },
    { key: 'platform', title: 'Platform' },
    { key: 'revenue', title: 'Revenue' },
    { key: 'calculatedPayment', title: 'Calculated Payment' },
    { key: 'differenceAmount', title: 'Difference Amount' },
    { key: 'actualPayment', title: 'Actual Payment' },
    { key: 'brand', title: 'Brand' },
  ];

  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...paymentData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="flex flex-col overflow-x-auto">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm font-light table-auto border-collapse">
              <thead className="border-b bg-gray-200">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      scope="col"
                      className="px-6 py-4 font-semibold text-gray-700 cursor-pointer"
                      onClick={() => requestSort(column.key)}
                    >
                      {column.title}
                      {sortConfig.key === column.key && (
                        <span className="ml-2">
                          {sortConfig.direction === 'asc' ? '▲' : '▼'}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedData.map((payment) => (
                  <tr className="border-b dark:border-neutral-500" key={payment.id}>
                    {columns.map((column) => (
                      <td key={column.key} className="px-6 py-4">
                        {column.key === 'revenue' ||
                        column.key === 'calculatedPayment' ||
                        column.key === 'differenceAmount' ||
                        column.key === 'actualPayment' ? (
                          <span>${payment[column.key].toFixed(2)}</span>
                        ) : (
                          payment[column.key]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceTable;
