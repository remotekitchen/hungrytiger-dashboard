import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  useDeletePaymentDetailsMutation,
  useGetPaymentDetailsQuery,
  useSetDefaultAccountMutation,
} from "../../../redux/features/payment/paymentApi";
import PaymentAccountEditModal from "../Modal/PaymentAccountEditModal";
import PaymentAccountsRow from "./PaymentAccountsRow";

const PaymentAccount = ({
  getDefaultAccountData,
  isConnectedToStripeData,
  isConnectedStripeLoading,
  isDefaultPayoutAccount,
}) => {
  // !filtering out the selected payout account

  /* // console.log(
    isConnectedToStripeData?.account_details?.external_accounts?.data,
    getDefaultAccountData?.payout_account_id
  ); */
  // Sample data for the table
  const auth = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const { data: paymentData } = useGetPaymentDetailsQuery();

  // // console.log("paymentData", paymentData?.results)
  const [deleteAccount, { isLoading, isError }] =
    useDeletePaymentDetailsMutation();

  // Define a state variable for sorting (initially not sorted)
  const [sortOrder, setSortOrder] = useState(null);

  // Function to toggle sorting order
  const toggleSortOrder = () => {
    if (sortOrder === null) {
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder(null);
    }
  };

  // Function to sort the data based on the selected column
  const sortData = (column) => {
    const sortedArray = paymentData?.results.slice();
    if (sortOrder === "asc") {
      return sortedArray.sort((a, b) => (a[column] > b[column] ? 1 : -1));
    } else if (sortOrder === "desc") {
      return sortedArray.sort((a, b) => (a[column] < b[column] ? 1 : -1));
    }
    return sortedArray;
  };

  // Render the sorted data
  const sortedData = sortData("account_holder_name");

  const handleEdit = (item) => {
    setEditItem(item);
    setVisible(true);
  };

  useEffect(() => {
    if (isLoading) {
      toast.success("Bank Account Deleted Successfully");
    }
  }, [isLoading]);
  // setting payment method api's

  // set default account
  const [
    setDefaultAccount,
    {
      isLoading: defaultAccountLoading,
      isError: defaultAccuntError,
      data: defaultAccountData,
      isSuccess: defaultAccountSuccess,
    },
  ] = useSetDefaultAccountMutation();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Account Holder Information</h1>
      <table className="table min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th
              className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              onClick={() => {
                toggleSortOrder();
              }}
            >
              Payment Type
              {sortOrder === "asc" && <span className="ml-2">&#8593;</span>}
              {sortOrder === "desc" && <span className="ml-2">&#8595;</span>}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Account Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Country
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {isConnectedToStripeData ? (
            isConnectedToStripeData?.account_details?.external_accounts?.data.map(
              (account) => (
                <PaymentAccountsRow
                  isDefaultPayoutAccount={isDefaultPayoutAccount}
                  setDefaultAccount={setDefaultAccount}
                  isLoading={defaultAccountLoading}
                  isError={defaultAccuntError}
                  data={defaultAccountData}
                  isSuccess={defaultAccountSuccess}
                  key={account.id}
                  account={account}
                />
              )
            )
          ) : (
            <p>Something went wrong. Please try again.</p>
          )}
        </tbody>
      </table>
      <PaymentAccountEditModal
        visible={visible}
        setVisible={setVisible}
        editItem={editItem}
      />
    </div>
  );
};

export default PaymentAccount;
