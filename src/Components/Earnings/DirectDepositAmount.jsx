// components/GrossRevenue.js
import React from "react";
import { BsExclamationCircle } from "react-icons/bs";
import DownloadButtons from "./DownloadButtons";
import PrintButton from "./PrintButtons";

const DirectDepositAmount = ({ netRevenue, invoice, orderDetails }) => {
  // console.log(invoice, 'invoices');
  return (
    <div className="p-4 bg-white shadow rounded-lg mt-4 space-y-2">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">Direct deposit amount</h3>
        <div
          className="tooltip"
          data-tip="The direct deposit reflects the amount you receive in your bank, excluding revenue from pay-in-person orders, as Chatchef deducts that amount upfront."
        >
          <BsExclamationCircle />
        </div>
      </div>

      <div className="mt-2 border p-4 space-y-4">
        <div className="flex items-center justify-between ">
          <p className="text-md font-semibold">Direct deposit amount</p>
          <p>{netRevenue}</p>
        </div>
        <hr />
        <div className="flex items-center justify-between ">
          <DownloadButtons invoice={invoice} orderDetails={orderDetails} />
          <PrintButton orderDetails={orderDetails} />
        </div>
      </div>
    </div>
  );
};

export default DirectDepositAmount;
