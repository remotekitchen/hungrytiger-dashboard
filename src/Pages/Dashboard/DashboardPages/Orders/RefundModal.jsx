import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useUpdateRefundMutation } from "../../../../redux/features/orders/ordersApi";

const RefundModal = ({ onClose, order_id }) => {
  const [refundType, setRefundType] = useState(null);
  const [refundReason, setRefundReason] = useState("");
  const [refundAmount, setRefundAmount] = useState("");
  const [activeButton, setActiveButton] = useState("refund");
  const [password, setPassword] = useState("");
  const [updateRefund, { isLoading, isError }] = useUpdateRefundMutation();
  const dialogRef = useRef(null);

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
    return () => {
      if (dialogRef.current) {
        dialogRef.current.close();
      }
    };
  }, []);

  const handleRefundSubmit = async () => {
    const envPassword = import.meta.env.VITE_REFUND_PASSWORD;
    if (password !== envPassword) {
      toast.error("Incorrect password");
      return;
    }

    if (refundType === "partial" && !refundReason) {
      alert("Enter Refund Reason");
      return;
    }

    try {
      const requestData = {
        order_id,
        refundReason,
        ...(refundType !== "partial" && { status: "rejected" }),
        ...(refundType === "partial" && { refundAmount }),
      };

      console.log(requestData, "requestData");
      await updateRefund(requestData).unwrap();
      toast.success("Refund successfully processed");
      onClose();
    } catch (error) {
      console.error("Failed to process refund:", error);
      toast.error("Failed to process refund");
    }
  };

  const handleButtonClick = (type) => {
    setRefundType(type);
    setActiveButton(type);
  };

  console.log(refundType, "refundType");

  return (
    <div className="modal-overlay">
      <dialog ref={dialogRef} className="modal open">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Refund Options</h3>
          <p className="py-4">
            Enter your password and select a refund type to proceed.
          </p>
          <div className="my-4">
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full mb-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="modal-action flex justify-between">
            <button
              className={`btn ${activeButton === "refund" ? "btn-active" : ""}`}
              onClick={() => handleButtonClick("refund")}
            >
              Refund
            </button>
            <button
              className={`btn ${
                activeButton === "partial" ? "btn-active" : ""
              }`}
              onClick={() => handleButtonClick("partial")}
            >
              Partial Refund
            </button>
          </div>

          {refundType && (
            <div className="my-4">
              {refundType === "partial" && (
                <input
                  type="number"
                  placeholder="Refund Amount"
                  className="input input-bordered w-full mb-2"
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                />
              )}
              <input
                type="text"
                placeholder="Refund Reason"
                className="input input-bordered w-full"
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
              />
            </div>
          )}

          <div className="modal-action">
            <button className="btn" onClick={onClose}>
              Close
            </button>
            <button
              className="btn btn-primary"
              onClick={handleRefundSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Confirm Refund"}
            </button>
          </div>

          {isError && (
            <p className="text-red-500">
              Failed to process refund. Please try again.
            </p>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default RefundModal;
