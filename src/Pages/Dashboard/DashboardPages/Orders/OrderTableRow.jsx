import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedOrder } from "../../../../redux/features/orders/ordersSlice";

const OrderTableRow = ({ order }) => {
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
  // const { selectedOrder } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const handleShowOrderDetails = () => {
    dispatch(selectedOrder(order));
    document.getElementById("orderDetails").showModal();
  };
  return (
    <tr
      onClick={handleShowOrderDetails}
      className="hover:shadow-xl cursor-pointer hover:scale-100 transition-all"
    >
      <td>{order_id}</td>
      <td>
        {customer ? customer : "John doe"}
        <br />
        <span className="badge badge-ghost badge-sm">
          {dropoff_address ? dropoff_address : "address"}
        </span>
      </td>
      <td>{dropoff_phone_number ? dropoff_phone_number : "Phone"}</td>
      <td>{subtotal}</td>
      <td>{support_reference}</td>
      <td>
        <div
          className={`badge ${
            status === "pending"
              ? "badge-warning"
              : status === "cancelled"
              ? "badge-error"
              : "badge-success"
          }`}
        >
          {status}
        </div>
      </td>
    </tr>
  );
};

export default OrderTableRow;
