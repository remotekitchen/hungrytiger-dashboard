import React, { useEffect, useRef, useState } from "react";
import Loading from "../../../../Components/Loading";
import { useGetMerchantOrdersQuery } from "../../../../redux/features/orders/ordersApi";

import Datepicker from "react-tailwindcss-datepicker";
import { createArray } from "../../../../core/utils";
import {
  useGetLocationsQuery,
  useGetRestaurentsQuery,
} from "../../../../redux/features/menuCreation/menuCreationApi";
import OrderHistorySearch from "./OrderHistorySearch";
import OrderHistoryTableRow from "./OrderHistoryTableRow";
import OrderProductsList from "./OrderProductsList/OrderProductsList";

const OrderHistory = () => {
  const [orderStatus, setOrderStatus] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [seeOrderedProduct, setSeeOrderedProduct] = useState([]);

  const [value, setValue] = useState({
    startDate: startDate,
    endDate: endDate,
  });
  // // console.log("🚀 ~ value from order history:", endDate);

  const datepickerRef = useRef(null); // Ref for accessing Datepicker component

  const handleValueChange = (newValue) => {
    setValue(newValue);
    setStartDate(newValue.startDate);
    setEndDate(newValue.endDate);
  };

  /* For getting RestaurantId and locationId */
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedOrderVoucher, setSelectedOrderVoucher] = useState(null);

  // console.log("Voucher",selectedOrderVoucher)

  const {
    data: restaurentList,
    isLoading: restaurantListLoading,
    isError: isRestaurantListError,
    error: restaurantListError,
  } = useGetRestaurentsQuery();

  // to get the locations for that restaurant
  const {
    data: locationList,
    isLoading: isLocationLoading,
    isError: isLocationError,
    error: locationError,
  } = useGetLocationsQuery(selectedRestaurant);

  // Effect to set default selectedRestaurant and selectedLocation
  useEffect(() => {
    if (restaurentList?.results.length > 0) {
      // Set default selectedRestaurant to the first restaurant's ID
      setSelectedRestaurant(restaurentList.results[0].id);
    }
  }, [restaurentList]);

  useEffect(() => {
    if (locationList?.results.length > 0) {
      // Set default selectedLocation to the first location's ID
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
      <>
        <option value={item.id}>{item.name}</option>
      </>
    ));
  }

  const restaurantId = selectedRestaurant;
  const locationId = selectedLocation;

  /* here Orders are based on locations */
  // const {
  //   data: singleOrder,
  //   isLoading,
  //   isError,
  // } = useGetOrderQuery({ restaurantId, locationId });

  // merchant order
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

  // console.log("merchantOrder", merchantOrder)
  // // console.log("🚀 ~ OrderHistory ~ merchantOrder:", merchantOrder);

  const pageArr = merchantOrder?.results ? createArray(merchantOrder) : [];

  let displayableContent;
  if (isLoading) displayableContent = <Loading />;
  else if (isError)
    displayableContent = (
      <option>Something went wrong loading the orders</option>
    );
  else if (merchantOrder?.results?.length === 0)
    displayableContent = <option>No orders available right now</option>;
  else
    displayableContent = locationId ? (
      <>
        <div className="relative overflow-x-auto ">
          <OrderProductsList
            orderdItem={seeOrderedProduct}
            voucher={selectedOrderVoucher}
          />
          <table className="w-full table-auto text-sm  border-collapse border border-gray-300 my-6">
            <thead className="text-xs uppercase">
              <tr className="bg-[#DDE1E6]">
                <th className="p-3  text-left align-top">Order Id</th>
                <th className="p-3  text-left align-top">Receive Date</th>
                <th className="p-3 text-left align-top">Customer</th>
                <th className="p-3  text-left align-top">Order Status</th>
                <th className="p-3 text-left align-top">Total</th>
                <th className="p-3  text-left align-top">Order Method</th>
                <th className="p-3  text-left align-top">Dropoff Address</th>
                <th className="p-3  text-left align-top">
                  Dropoff Phone Number
                </th>
                <th className="p-3  text-left align-top">Refund</th>
                <th className="p-3  text-left align-top">Tips</th>
                <th className="p-3  text-left align-top">Payment Method</th>
                <th className="p-3  text-left align-top">Payment Status</th>
                <th className="p-3  text-left align-top">Tracking URL</th>
                <th className="p-3  text-left align-top">More info</th>
              </tr>
            </thead>
            <tbody>
              {merchantOrder?.results?.map((order, index) => (
                <OrderHistoryTableRow
                  key={index}
                  order={order}
                  setSeeOrderedProduct={setSeeOrderedProduct}
                  setSelectedOrderVoucher={setSelectedOrderVoucher}
                />
              ))}
            </tbody>
          </table>

          {/* <OrderHistoryPagination /> */}
          {/* pagination  */}
          <div className="w-10/12 mt-10">
            {pageArr && (
              <div className="join flex-wrap">
                {pageArr.map((getPage) => (
                  <button
                    onClick={() => {
                      setPage(getPage);
                    }}
                    key={getPage}
                    className={`join-item my-1 btn btn-sm ${
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
      </>
    ) : (
      <h1 className="text-xl">
        Please Select Restaurant and Location for Checking the Order
      </h1>
    );

  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold">Order History</h1>
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

          <Datepicker
            inputClassName="px-2 py-2 bg-white rounded-md "
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

        <OrderHistorySearch />
      </div>
      {displayableContent}
    </div>
  );
};

export default OrderHistory;
