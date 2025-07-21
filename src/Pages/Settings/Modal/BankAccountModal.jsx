import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useSelector } from "react-redux";
import { useCreatePaymentDetailsMutation } from "../../../redux/features/payment/paymentApi";

function BankAccountModal({
  bankAccountModal,
  setBankAccountModal,
  setAddMethod,
  handleClosed,
}) {
  const bankAccountRef = useRef();
  const auth = useSelector((state) => state.auth);

  const [createaccount, { isLoading, isSuccess, isError }] =
    useCreatePaymentDetailsMutation();

  const [bankAccount, setBankAccount] = useState({
    account_holder_name: "",
    account_number: "",
    country: "canada",
  });

  // // console.log("bA", bankAccount)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBankAccount({
      ...bankAccount,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append("account_holder_name", bankAccount.account_holder_name);
    formData.append("account_number", bankAccount.account_number);
    formData.append("country", bankAccount.country);

    createaccount(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Bank Account Added Successfully");
      setBankAccount({
        account_holder_name: "",
        account_number: "",
        country: "canada",
      });
      setBankAccountModal(false);
    }
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        bankAccountModal &&
        bankAccountRef.current &&
        !bankAccountRef.current.contains(e.target)
      ) {
        setBankAccountModal(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [bankAccountModal, setBankAccountModal]);
  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  ${
        bankAccountModal
          ? "w-full justify-center items-center flex backdrop-blur bg-black/20 h-screen z-10"
          : "z-[-10]"
      }`}
    >
      <div
        ref={bankAccountRef}
        className={` transition-all duration-300 ${
          bankAccountModal ? "scale-100" : "scale-0"
        }`}
      >
        <div className="p-4  bg-white shadow-md rounded-lg w-[60vh]">
          <div className="flex gap-3">
            <button
              className="flex gap-2 mt-1"
              onClick={() => {
                setBankAccountModal(false);
                setAddMethod(true);
              }}
            >
              <MdKeyboardArrowLeft className=" text-2xl bg-[#1363DF] border rounded-full text-white" />
            </button>
            <h2 className="text-xl font-bold mb-2">
              Enter your bank account details
            </h2>
          </div>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="accountHolderName">Account Holder Name</label>
              <input
                type="text"
                value={bankAccount.account_holder_name}
                onChange={handleChange}
                name="account_holder_name"
                id="account_holder_name"
                placeholder="Account holder name"
                className="border border-black rounded-lg p-1"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="accountHolderName">Account Number</label>
              <input
                type="text"
                value={bankAccount.account_number}
                onChange={handleChange}
                name="account_number"
                id="account_number"
                placeholder="Account Number"
                className="border border-black rounded-lg p-1"
              />
            </div>
            {/* <div className='flex flex-col gap-1'>
                            <label htmlFor="accountNumber">Account Holder Billing Address</label>
                            <input type="text" name="accountNumber" id="accountNumber" placeholder='Address Line 2' className='border border-black rounded-lg p-1'/>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="routingNumber">City</label>
                            <input type="text" name="routingNumber" id="routingNumber" placeholder='city' className='border border-black rounded-lg p-1'/>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="routingNumber">Postal Code</label>
                            <input type="text" name="routingNumber" id="routingNumber" placeholder='Postal code' className='border border-black rounded-lg p-1'/>
                        </div> */}
            <div className="flex flex-col gap-1">
              <select
                name="country"
                id="country"
                value={bankAccount.country}
                onChange={handleChange}
                className="border border-black rounded-lg p-1"
              >
                <option value="canada">Canada</option>
                <option value="usa">USA</option>
              </select>
            </div>
            <button
              type="submit"
              className="border rounded-lg p-1 bg-[#1363DF] text-white"
            >
              Add Bank Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BankAccountModal;
