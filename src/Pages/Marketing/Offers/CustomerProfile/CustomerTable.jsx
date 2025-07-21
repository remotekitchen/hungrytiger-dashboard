import React, { useState } from "react";
import { useGetCustomerProfileQuery } from "../../../../redux/features/customer/customerApi";
import { useGetAllRestaurantQuery } from "../../../../redux/features/restaurentCreation/restaurentCreationApi";
import Searching from "./Searching";
import ExcelExport from "./ExcelExport";

const CustomerTable = () => {
  const { data: allRestaurant, isLoading: restaurantLoading } =
    useGetAllRestaurantQuery();

  const restaurantId = allRestaurant?.results?.[0]?.id;

  const { data, error, isLoading } = useGetCustomerProfileQuery(restaurantId, {
    skip: !restaurantId,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const userDataToExport = data?.map((item, index) => ({
    Username: item?.user?.first_name + " " + item?.user?.last_name,
    PhoneNumber: item?.user?.phone,
    Email: item?.user?.email,
    RewardPoints: item?.user?.reward_points,
    TotalOrder: item?.total_ordered,
    TotalOrderValue: item?.ordered_value,
    LastOrderTime:
      new Date(item?.last_time_order).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }) +
      " " +
      new Date(item?.last_time_order).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
  }));
  const tableRows = currentData?.map((item, index) => (
    <tr key={index} className="text-center tracking-tight">
      <th></th>
      <td className="text-lg">
        {item?.user?.first_name + " " + item?.user?.last_name}
      </td>
      <td className="text-lg">{item?.user?.phone}</td>
      <td className="text-lg">{item?.user?.email}</td>
      <td className="text-lg">{item?.user?.reward_points}</td>
      <td className="text-lg">{item?.total_ordered}</td>
      <td className="text-lg">{item?.ordered_value?.toFixed(2)}</td>
      <td className="text-lg">
        {new Date(item?.last_time_order).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}{" "}
        {new Date(item?.last_time_order).toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </td>
    </tr>
  ));

  return isLoading ? (
    <div className="flex flex-col justify-center items-center mt-10 text-3xl text-center w-full">
      <Searching/>
      Loading the Data Please Wait...
    </div>
  ) : (
    <div className="flex flex-col justify-end items-end gap-4">
      <div className="btn btn-primary mr-8">
        <ExcelExport data={userDataToExport} fileName="Customer" />
      </div>
      <div className="overflow-x-auto">
        <table className="table table-md">
          <thead>
            <tr className="text-md text-primary text-center">
              <th></th>
              <th>Customer Name</th>
              <th>Customer Phone Number</th>
              <th>Customer Email</th>
              <th>Loyalty Points</th>
              <th>Overall Ordered Time</th>
              <th>Overall Order Value</th>
              <th>Last Order Time</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>

        {/* Pagination */}
        <div className="grid grid-cols-10 gap-5 mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="bg-gray-300 text-gray-700 px-2 py-1 text-sm rounded-full"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-2 py-1 text-sm rounded-full ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="bg-gray-300 text-gray-700 px-2 py-1 text-sm rounded-full"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
export default CustomerTable;
