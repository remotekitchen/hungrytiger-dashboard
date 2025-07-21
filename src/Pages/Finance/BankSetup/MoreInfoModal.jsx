import React from "react";
import useAuthCheck from "../../hooks/useAuthCheck";
import { useSelector } from "react-redux";

const MoreInfoModal = ({ accountDetails }) => {
  const auth = useAuthCheck();
  const { user_info } = useSelector((state) => state.auth);
  return (
    <>
      <input
        type="checkbox"
        id={`more_info_${accountDetails?.id}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-2xl">Account</h3>
          <h4 className="font-bold text-xl">
            Account ********{accountDetails?.last4}
          </h4>
          <div className="my-4">
            <p className="text-lg">Account holder&apos;s name</p>
            <h4 className="font-bold text-xl">
              {user_info.first_name + " " + user_info.last_name}
            </h4>
          </div>
          <div className="my-4">
            <p className="text-lg">Account Number</p>
            <h4 className="font-bold text-xl">{accountDetails?.account}</h4>
          </div>
          <div className="my-4">
            <p className="text-lg">Account Name</p>
            <h4 className="font-bold text-xl">
              {accountDetails?.bank_name
                ? accountDetails?.bank_name
                : accountDetails?.brand &&
                  `${accountDetails?.brand} Card******${accountDetails?.last4}`}
            </h4>
          </div>
          <div className="my-4">
            <p className="text-lg">Routing number</p>
            <h4 className="font-bold text-xl">
              {accountDetails?.routing_number
                ? accountDetails?.routing_number
                : "000-000"}
            </h4>
          </div>
          <div className="my-4">
            <p className="text-lg">Currency</p>
            <h4 className="font-bold text-xl capitalize">
              {accountDetails?.currency}{" "}
            </h4>
          </div>
          <div className="my-4">
            <p className="text-lg">Country</p>
            <h4 className="font-bold text-xl capitalize">
              {accountDetails?.country}{" "}
            </h4>
          </div>
        </div>
        <label
          className="modal-backdrop"
          htmlFor={`more_info_${accountDetails?.id}`}
        >
          Close
        </label>
      </div>
    </>
  );
};

export default MoreInfoModal;
