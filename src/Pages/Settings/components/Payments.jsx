import React, { useState } from "react";
import PaymentAccount from "./PaymentAccount";
import AddMethod from "../Modal/AddMethod";
import BankAccountModal from "../Modal/BankAccountModal";
import CardModal from "../Modal/CardModal";
import EditMethod from "../Modal/EditMethod";

const Payments = () => {
  const [addMethod, setAddMethod] = useState(false);
  const [bankAccountModal, setBankAccountModal] = useState(false);
  const [cardModal, setCardModal] = useState(false);
  const [editMethod, setEditMethod] = useState(false);
  const handleClosed = (data) => {
    setAddMethod(false);

    switch (data) {
      case "bankAccount":
        setBankAccountModal(true);
        break;
      case "card":
        setCardModal(true);
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl">Payment Methods</h1>
        <button className="btn btn-primary btn-sm text-white">
          Connect Stripe
        </button>
      </div>
      <div className="rounded-lg p-4 border-2 border-black mt-4 z-10">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold mr-2">ChatChef</h2>
            <p>1 method on file</p>
          </div>
          <div>
            <button
              onClick={() => setAddMethod(true)}
              className="border border-black px-3 py-1 rounded-md mr-2"
            >
              Add Method
            </button>
            <button
              onClick={() => setEditMethod(true)}
              className="border border-black  px-3 py-1 rounded-md"
            >
              Edit
            </button>
          </div>
        </div>
        <hr className="mb-4 border border-black" />
        {/* {displayableItem} */}
      </div>
      <PaymentAccount />
      <AddMethod
        handleClosed={handleClosed}
        addMethod={addMethod}
        setAddMethod={setAddMethod}
      />
      <BankAccountModal
        handleClosed={handleClosed}
        bankAccountModal={bankAccountModal}
        setBankAccountModal={setBankAccountModal}
        setAddMethod={setAddMethod}
      />
      <CardModal
        handleClosed={handleClosed}
        cardModal={cardModal}
        setCardModal={setCardModal}
        setAddMethod={setAddMethod}
      />
      <EditMethod
        editMethod={editMethod}
        setEditMethod={setEditMethod}
        setAddMethod={setAddMethod}
      />
    </div>
  );
};

export default Payments;
