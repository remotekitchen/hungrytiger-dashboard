import React, { useState } from "react";
import { useGetOrdersQuery } from "../../../../redux/features/orders/ordersApi";
import Loading from "../../../../Components/Loading";
import OrderTableRow from "./OrderTableRow";
import OrderDetailsModal from "./OrderDetailsModal";

const Orders = () => {
  const [orderStatus, setOrderStatus] = useState("");
  const [search, setSearch] = useState("");
  const {
    data: allOrders,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetOrdersQuery({ orderStatus, search });

  let displayableContent;
  if (isLoading) displayableContent = <Loading />;
  else if (isError)
    displayableContent = (
      <option>Something went wrong loading the orders</option>
    );
  else if (allOrders.length === 0)
    displayableContent = <option>No orders available right now</option>;
  else
    displayableContent = (
      <>
        {allOrders.results.map((order) => (
          <OrderTableRow order={order} key={order.id} />
        ))}
      </>
    );
  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold">Orders</h1>
      {/* filtering */}
      <div className="my-6">
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearch(e.target.value);
            }
          }}
          defaultValue={search}
          type="text"
          placeholder="Search"
          className="input input-bordered w-full max-w-xs mx-2"
        />

        <select
          onChange={(e) => setOrderStatus(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option disabled selected>
            Order Status
          </option>
          <option value={"pending"}>Pending</option>
          <option value={"completed"}>Completed</option>
          <option value={"cancelled"}>Cancelled</option>
        </select>
      </div>
      <div className="overflow-x-auto " style={{ maxWidth: "100%" }}>
        <table className="table w-full">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Name/Address</th>
              <th>Phone Number</th>
              <th>Subtotal</th>
              <th>Support Reference</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>{displayableContent}</tbody>
        </table>
      </div>
      <OrderDetailsModal />
    </div>
  );
};

export default Orders;
