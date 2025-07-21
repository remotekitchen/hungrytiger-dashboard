import { useSelector } from "react-redux";

const OrderDetailsModal = () => {
  const { selectedOrder } = useSelector((state) => state.orders);
  return (
    <dialog id="orderDetails" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Press ESC key or click outside to close</p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default OrderDetailsModal;
