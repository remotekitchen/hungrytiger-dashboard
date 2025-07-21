import MoreInfoModal from "./MoreInfoModal";

const ConnectedAccountList = ({
  account,
  setDefaultAccount,
  isDefaultPayoutAccount,
  setDefaultAccountLoading,
}) => {
  const handleSetDefaultAccount = () => {
    setDefaultAccount({
      payout_account_id: account?.id,
    });
  };
  return (
    <div className="flex justify-between items-center">
      <p>
        {account?.bank_name ? account?.bank_name : account?.brand + " Card"}
      </p>
      <label htmlFor={`more_info_${account?.id}`} className="btn btn-link">
        more info
      </label>
      <button
        onClick={handleSetDefaultAccount}
        disabled={
          isDefaultPayoutAccount?.id === account?.id || setDefaultAccountLoading
        }
        className={`btn btn-sm ${
          isDefaultPayoutAccount?.id === account?.id && "cursor-not-allowed"
        }`}
      >
        {isDefaultPayoutAccount?.id === account?.id ? "default" : "Set Default"}
      </button>
      <MoreInfoModal accountDetails={account} />
    </div>
  );
};

export default ConnectedAccountList;
