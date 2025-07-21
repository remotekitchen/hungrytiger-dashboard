import React, { useEffect, useRef, useState } from "react";
import Loading from "../../../../Components/Loading";
import { useGetMerchantOrdersQuery } from "../../../../redux/features/orders/ordersApi";

import { FaDownload } from "react-icons/fa";
import { Link } from "react-router-dom";
import Datepicker from "react-tailwindcss-datepicker";
import { createArray } from "../../../../core/utils";
import {
  useGetLocationsQuery,
  useGetRestaurentsQuery,
} from "../../../../redux/features/menuCreation/menuCreationApi";
import BillingInvoiceTable from "./BillingInvoiceTable";

const BillingInvoice = () => {
  const [orderStatus, setOrderStatus] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [startDate, setStartDate] = useState(formatDate(lastWeek));
  const [endDate, setEndDate] = useState(formatDate(today));
  const isDisabled = !startDate || !endDate;

  const [value, setValue] = useState({
    startDate: startDate,
    endDate: endDate,
  });

  const datepickerRef = useRef(null);

  const handleValueChange = (newValue) => {
    setValue(newValue);
    setStartDate(newValue.startDate);
    setEndDate(newValue.endDate);
  };

  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const {
    data: restaurentList,
    isLoading: restaurantListLoading,
    isError: isRestaurantListError,
  } = useGetRestaurentsQuery();

  const {
    data: locationList,
    isLoading: isLocationLoading,
    isError: isLocationError,
  } = useGetLocationsQuery(selectedRestaurant);

  useEffect(() => {
    if (restaurentList?.results.length > 0) {
      setSelectedRestaurant(restaurentList.results[0].id);
    }
  }, [restaurentList]);

  useEffect(() => {
    if (locationList?.results.length > 0) {
      setSelectedLocation(locationList.results[0].id);
    }
  }, [locationList]);

  let optionContent;
  if (restaurantListLoading) optionContent = <option>Loading...</option>;
  else if (isRestaurantListError)
    optionContent = (
      <option>Something went wrong loading the restaurent</option>
    );
  else if (restaurentList.results.length === 0)
    optionContent = <option>No restaurent available right now</option>;
  else
    optionContent = restaurentList.results.map((item) => (
      <option value={item.id} key={item.id}>
        {item?.name}
      </option>
    ));

  let optionLocationContent;
  if (isLocationLoading) optionLocationContent = <option>Loading...</option>;
  else if (isLocationError)
    optionLocationContent = (
      <option>Something went wrong loading the locations</option>
    );
  else if (locationList?.results?.length === 0)
    optionLocationContent = <option>No location available right now</option>;
  else {
    optionLocationContent = locationList.results.map((item) => (
      <option value={item.id} key={item.id}>
        {item.name}
      </option>
    ));
  }

  const restaurantId = selectedRestaurant;
  const locationId = selectedLocation;

  const {
    data: merchantOrder,
    isLoading,
    isError,
  } = useGetMerchantOrdersQuery({
    restaurantId,
    locationId,
    page: page,
    start_date: startDate,
    end_date: endDate,
  });

  const pageArr = merchantOrder?.results ? createArray(merchantOrder) : [];

  let displayableContent;
  if (isLoading) displayableContent = <Loading />;
  else if (isError)
    displayableContent = <div>Something went wrong loading the orders</div>;
  else if (merchantOrder?.results?.length === 0)
    displayableContent = <div>No orders available right now</div>;
  else
    displayableContent = locationId ? (
      <div className="relative">
        <div className="w-[1200px] overflow-x-auto">
          <table className="min-w-[700px] w-full table-auto text-sm border-collapse border border-gray-300 my-6">
            <thead className="text-xs uppercase">
              <tr className="bg-[#DDE1E6]">
                <th className="p-3 text-left align-top">Customer</th>
                <th className="p-3 text-left align-top">Restaurant</th>
                <th className="p-3 text-left align-top">Location</th>
                <th className="p-3 text-left align-top">Date</th>
                <th className="p-3 text-left align-top">Time</th>
                <th className="p-3 text-left align-top">Order ID</th>
                <th className="p-3 text-left align-top">Subtotal</th>
                <th className="p-3 text-left align-top">Discount</th>
                <th className="p-3 text-left align-top">Payment Method</th>
                <th className="p-3 text-left align-top">Order Method</th>
                <th className="p-3 text-left align-top">Total</th>
                <th className="p-3 text-left align-top">Delivery Fee</th>
                <th className="p-3 text-left align-top">Status</th>
                <th className="p-3 text-left align-top">Qty</th>
                <th className="p-3 text-left align-top">Tax</th>
                <th className="p-3 text-left align-top">Convenience Fees</th>
                <th className="p-3 text-left align-top">Currency</th>
                <th className="p-3 text-left align-top">Is paid</th>
                <th className="p-3 text-left align-top">
                  Restaurant bearing delivery fee
                </th>
                <th className="p-3 text-left align-top">Net Amount</th>
              </tr>
            </thead>
            <tbody>
              {merchantOrder?.results?.map((order, index) => (
                <BillingInvoiceTable
                  key={index}
                  order={order}
                  selectedLocation={selectedLocation}
                  selectedRestaurant={selectedRestaurant}
                  locationList={locationList}
                  restaurentList={restaurentList}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-10/12 mt-10">
          {pageArr && (
            <div className="flex flex-wrap">
              {pageArr.map((getPage) => (
                <button
                  onClick={() => {
                    setPage(getPage);
                  }}
                  key={getPage}
                  className={`my-1 btn btn-sm ${
                    page === getPage && "btn-active"
                  }`}
                >
                  {getPage}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    ) : (
      <h1 className="text-xl">
        Please Select Restaurant and Location for Checking the Order
      </h1>
    );

  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold">Invoice and Billing</h1>
      <div className="my-4 flex flex-row justify-between items-center">
        <div className="flex items-center gap-3">
          <select
            value={selectedRestaurant}
            onChange={(e) => setSelectedRestaurant(e.target.value)}
            className="select select-bordered w-48 max-w-xs"
          >
            <option disabled selected>
              Select restaurant
            </option>
            {optionContent}
          </select>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            disabled={!selectedRestaurant}
            className="select select-bordered w-48 max-w-xs ms-2"
          >
            <option>Location</option>
            {optionLocationContent}
          </select>

          <div className="w-60">
            <Datepicker
              inputClassName="px-2 py-2 bg-white rounded-md"
              toggleClassName="absolute bg-sky-300 rounded-r-lg text-white right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
              placeholder={"Select Date"}
              primaryColor={"blue"}
              value={value}
              onChange={handleValueChange}
              displayFormat={"DD/MM/YYYY"}
              popoverDirection="down"
              showShortcuts={true}
            />
          </div>
        </div>

        <div>
          {isDisabled ? (
            <div className="tooltip" data-tip="Please Select Date">
              <button disabled className="btn cursor-not-allowed">
                <span>Export to excel</span>
                <FaDownload />
              </button>
            </div>
          ) : (
            <Link
              to={`${
                import.meta.env.VITE_API_ROOT
              }api/billing/v1/invoice-to-excel/?restaurant=${restaurantId}&location=[${locationId}]&start_date=${startDate}&end_date=${endDate}`}
              className={`btn font-medium px-5 py-2 bg-gray-300 rounded-lg mt-2 flex items-center gap-2`}
              download
            >
              <span>Export to excel</span>
              <FaDownload />
            </Link>
          )}
        </div>
      </div>
      {displayableContent}
    </div>
  );
};

export default BillingInvoice;
