import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../../../Components/Loading";
import {
  useConnectToStripeQuery,
  useConnectedStripeAccountsQuery,
  useGetDefaultAccountQuery,
  useSetDefaultAccountMutation,
} from "../../../redux/features/payment/paymentApi";
import ConnectedAccountList from "./ConnectedAccountList";

const BankSetup = () => {
  const [doesHaveRedirectUrl, setDoesHaveRedirectUrl] = useState(false);

  const handleConnectStripe = () => {
    setDoesHaveRedirectUrl(true);
  };

  // console.log(doesHaveRedirectUrl, 'doesHaveRedirectUrl');

  // everyting about payments here
  // it will get the default bank account details (the object)
  const { data: getDefaultAccountData } = useGetDefaultAccountQuery();
  const { isLoading, isError, error, data } = useConnectToStripeQuery(
    undefined,
    {
      skip: !doesHaveRedirectUrl,
    }
  );

  console.log(data, "data");
  // it will get the list of all connected stripe accounts.
  const {
    isLoading: isConnectedStripeLoading,
    isError: isConnectStripeError,
    data: isConnectedStripeData,
  } = useConnectedStripeAccountsQuery();

  // it will get the default bank account details (the object)
  const [
    setDefaultAccount,
    {
      isLoading: setDefaultAccountLoading,
      isError: setDefaultAccuntError,
      isSuccess: setDefaultAccountSuccess,
    },
  ] = useSetDefaultAccountMutation();

  if (!isLoading && !isError && data) {
    window.location.replace(data.url);
  }
  const isDefaultPayoutAccount =
    isConnectedStripeData?.account_details?.external_accounts?.data.find(
      (account) => account?.id === getDefaultAccountData?.payout_account_id
    );

  useEffect(() => {
    if (
      isConnectedStripeData?.account_details?.external_accounts?.data.length ===
      1
    ) {
      setDefaultAccount({
        payout_account_id:
          isConnectedStripeData?.account_details?.external_accounts?.data[0]
            ?.id,
      });
    }
  }, []);

  // for toaster
  useEffect(() => {
    if (setDefaultAccountSuccess) {
      toast.success("Payout method has been selected.");
    }
    if (setDefaultAccuntError) {
      toast.error(
        "Couldn't set your default payout method. Please refresh the page and try again!"
      );
    }
  }, [setDefaultAccountSuccess, setDefaultAccuntError]);

  let displayConnectedStripeData;
  if (isConnectedStripeLoading && !isConnectedStripeData) {
    displayConnectedStripeData = <Loading />;
  } else if (
    !isConnectedStripeLoading &&
    !isConnectedStripeData &&
    isConnectStripeError
  ) {
    displayConnectedStripeData = (
      <p>Something went wrong showing stripe data.</p>
    );
  } else if (
    isConnectedStripeData?.account_details?.external_accounts?.data.length === 0
  ) {
    displayConnectedStripeData = (
      <p>Please connect at least one account for payout.</p>
    );
  } else if (
    isConnectedStripeData?.account_details?.external_accounts?.data.length > 0
  ) {
    displayConnectedStripeData = (
      <div className="w-2/5 p-5 border">
        {isConnectedStripeData?.account_details?.external_accounts?.data.map(
          (account) => (
            <ConnectedAccountList
              isDefaultPayoutAccount={isDefaultPayoutAccount}
              account={account}
              key={account.id}
              setDefaultAccount={setDefaultAccount}
              setDefaultAccuntError={setDefaultAccuntError}
              setDefaultAccountLoading={setDefaultAccountLoading}
            />
          )
        )}
      </div>
    );
  }
  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold mb-7">Bank Set Up</h1>
      <h2 className="text-2xl font-bold">Payment Methods</h2>
      {!isDefaultPayoutAccount && <p>Select default payment methods</p>}
      {/* to show the connected stripe accounts */}
      {displayConnectedStripeData}

      <div className="mt-4">
        <div className="flex flex-col w-[268px]">
          <button
            onClick={handleConnectStripe}
            className={`bg-[#42C2FF] text-white font-bold py-2 px-4 rounded `}
          >
            + Add New Payment Method
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankSetup;
