import React from "react";

const ThemeListTable = (data) => {
  const handleRowClick = (rowData) => {
    // console.log('Clicked row data:', rowData);
    // Perform any other actions you need with the clicked row data
  };

  return (
    <div className="overflow-x-auto mt-3">
      <table className="table-auto min-w-full divide-y divide-gray-200">
        <caption className="bg-yellow-500 uppercase text-blue-800 text-lg mb-2">
          Theme List
        </caption>

        <thead className="bg-gray-50">
          <tr>
            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Restaurant
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th> */}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Primary Color
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Secondary Color
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Positive Color
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Danger Color
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Warning Color
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cart Color
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Background Color
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Text Color
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stock Color
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Disable Color
            </th>
          </tr>
        </thead>
        <tbody>
          {data.list.map((item) => (
            <tr key={item.id} onClick={() => handleRowClick(item)}>
              {" "}
              {/* Assuming each item has a unique id */}
              <td>{item.primary_color}</td>
              <td>{item.secondary_color}</td>
              <td>{item.positive_color}</td>
              <td>{item.danger_color}</td>
              <td>{item.warning_color}</td>
              <td>{item.cart_color}</td>
              <td>{item.background_color}</td>
              <td>{item.text_color}</td>
              <td>{item.stock_color}</td>
              <td>{item.disable_color}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ThemeListTable;
