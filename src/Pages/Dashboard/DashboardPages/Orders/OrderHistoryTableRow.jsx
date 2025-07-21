import React, { useState } from "react";
import RefundModal from "./RefundModal";

const OrderHistoryTableRow = ({
  order,
  setSeeOrderedProduct,
  setSelectedOrderVoucher,
}) => {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);

  const openRefundModal = (orderId) => {
    setSelectedOrderId(orderId);
    setIsRefundModalOpen(true);
    console.log("clicked");
  };

  const closeRefundModal = () => {
    setSelectedOrderId(null);
    setIsRefundModalOpen(false);
  };

  const openModal = () => {
    setSeeOrderedProduct([]);
    const modal = document.getElementById("my_modal_4");
    if (modal) {
      modal.showModal();
      setSeeOrderedProduct(order?.orderitem_set);
      setSelectedOrderVoucher(order?.voucher);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  return (
    <>
      <tr key={order.id}>
        <td className="p-3 text-left align-middle">{order?.order_id}</td>
        <td className="p-3 text-left align-middle">
          {formatDate(order.receive_date)}
        </td>
        <td className="p-3 text-left align-middle">
          {order.dropoff_contact_first_name} {order.dropoff_contact_last_name}
        </td>
        <td className={`p-3 text-left align-middle  `}>
          <p
            className={`text-center p-1 rounded ${
              order?.status === "completed"
                ? "text-green-600 bg-green-600/20"
                : order?.status === "rejected"
                ? "text-red-600 bg-red-600/20"
                : order?.status === "cancelled"
                ? "text-red-600 bg-red-600/20"
                : order?.status === "accepted"
                ? "text-blue-600 bg-blue-600/20"
                : "text-yellow-600 bg-yellow-600/20"
            }`}
          >
            {order?.status}
          </p>
        </td>
        <td className="p-3 text-left align-middle">{order?.total}</td>
        <td className="p-3 text-left align-middle">{order?.order_method}</td>
        <td className="p-3 text-left align-middle">
          {order?.dropoff_address || "N/A"}
        </td>
        <td className="p-3 text-left align-middle">
          {order?.dropoff_phone_number || "N/A"}
        </td>
        <td className="p-3 text-left align-middle relative group">
          {order?.refund_amount === 0 ? (
            <button className="btn" onClick={() => openRefundModal(order.id)}>
              Refund
            </button>
          ) : order?.refund_amount === order?.total ? (
            <p className="cursor-pointer bg-red-600/20 text-red-600 text-center rounded p-1 font-bold">
              Fully Refunded
              {/* Tooltip for fully refunded */}
              <div className="absolute left-0 mb-2 w-48 p-2 bg-gray-700 text-white text-sm rounded-md opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-[100]">
                Refunded Amount: {order.refund_amount}
                {order.refund_reason && (
                  <p>Refund Reason: {order.refund_reason}</p>
                )}
              </div>
            </p>
          ) : (
            <p className="cursor-pointer bg-yellow-600/20 text-yellow-600 text-center rounded p-1 font-bold">
              Partially Refunded
              {/* Tooltip for partial refund with button */}
              <div className="absolute left-0 mb-2 w-48 p-2 bg-gray-700 text-white text-sm rounded-md opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-[100]">
                <p>Refunded Amount: {order.refund_amount}</p>
                {order.refund_reason && (
                  <p>Refund Reason: {order.refund_reason}</p>
                )}
                {/* <button
									className='btn mt-2'
									onClick={(e) => {
										e.stopPropagation();
										openRefundModal(order.id);
									}}
								>
									Refund again
								</button> */}
              </div>
            </p>
          )}
        </td>

        <td className="p-3 text-left align-middle">
          ${order?.tips ? order?.tips : 0}
        </td>
        <td className="p-3 text-left align-middle">
          {order?.payment_method ? order?.payment_method : "N/A"}
        </td>

        <td className="p-3 text-left align-middle">
          {order?.is_paid ? "Paid" : "Unpaid"}
        </td>
        <td className="p-3 text-left align-middle">
          {order?.tracking_url ? (
            <a
              className="text-blue-500 underline text-bold"
              href={order.tracking_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Link
            </a>
          ) : (
            "N/A"
          )}
        </td>
        <td className="p-3 text-left align-middle">
          <button className="btn whitespace-nowrap px-2" onClick={openModal}>
            See more
          </button>
        </td>
      </tr>

      {isRefundModalOpen && (
        <RefundModal onClose={closeRefundModal} order_id={selectedOrderId} />
      )}
    </>
  );
};

export default OrderHistoryTableRow;
