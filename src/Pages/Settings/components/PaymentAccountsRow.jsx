import React from "react";

const PaymentAccountsRow = ({
  account,
  setDefaultAccount,
  isLoading,
  isError,
  data,
  isSuccess,
  isDefaultPayoutAccount,
}) => {
  const handleSetDefaultPaymentAccount = () => {
    setDefaultAccount({ payout_account_id: account?.id });
  };
  return (
    <tr>
      <th>{account?.bank_name || "Card"}</th>
      <td>{account?.last4}</td>
      <td>{account?.country}</td>
      <td>
        <button
          disabled={isLoading || isDefaultPayoutAccount?.id === account?.id}
          onClick={handleSetDefaultPaymentAccount}
          className={`btn btn-primary btn-sm text-white`}
        >
          {isDefaultPayoutAccount?.id === account?.id
            ? "Default"
            : "Set as default"}
        </button>
      </td>
    </tr>
  );
};

export default PaymentAccountsRow;
