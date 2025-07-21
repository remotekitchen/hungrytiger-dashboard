import React from "react";
import { useManageOrderMutation } from "../../../../../redux/features/orders/ordersApi";

const PickupAndDeliveryRow = ({ order }) => {
  const {
    id,
    orderitem_set,
    created_date,
    modified_date,
    customer,
    order_id,
    status,
    quantity,
    subtotal,
    delivery_fee,
    support_reference,
    receive_date,
    pickup_time,
    delivery_time,
    pickup_address,
    dropoff_address,
    dropoff_location,
    dropoff_phone_number,
    cancellation_reason,
    extra,
    user,
    company,
    restaurant,
    location,
  } = order || {};
  const [manageOrder, { isLoading, isError, isSuccess, error, data }] =
    useManageOrderMutation();

  const handleManageOrders = (orderState) => {
    manageOrder({ order_id: id, orderStatus: orderState });
  };
  return (
    <tr>
      {/* <td>{order_id}</td> */}
      <td>{id}</td>
      <td>
        {customer ? customer : "John doe"}
        <br />
        <span className="badge badge-ghost badge-sm">
          {dropoff_address ? dropoff_address : "address"}
        </span>
      </td>
      <td>{dropoff_phone_number ? dropoff_phone_number : "Phone"}</td>
      <td>{subtotal}</td>
      <td>
        <div
          className={`badge ${status === "pending"
              ? "badge-warning"
              : status === "cancelled"
                ? "badge-error"
                : "badge-success"
            }`}
        >
          {status}
        </div>
      </td>
      <td>
        <div className="flex items-center justify-between">
          {status === "pending" && (
            <>
              <button
                onClick={() => handleManageOrders("accepted")}
                className={`btn btn-sm btn-success`}
              >
                Accept
              </button>
              <button
                onClick={() => handleManageOrders("cancelled")}
                className={`btn btn-sm btn-error ms-2`}
              >
                Reject
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default PickupAndDeliveryRow;
