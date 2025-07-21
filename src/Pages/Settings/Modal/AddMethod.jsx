import React, { useEffect, useRef } from 'react'
import { BsBank, BsFillCreditCard2FrontFill } from 'react-icons/bs';

function AddMethod({
  addMethod,
  setAddMethod,
  handleClosed
}) {
  const addMethodRef = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        addMethod &&
        addMethodRef.current &&
        !addMethodRef.current.contains(e.target)
      ) {
        setAddMethod(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [addMethod, setAddMethod]);
  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  ${addMethod
        ? "w-full justify-center items-center flex backdrop-blur bg-black/20 h-screen z-10"
        : "z-[-10]"
        }`}>
      <div
        ref={addMethodRef}
        className={` transition-all duration-300 ${addMethod ? "scale-100" : "scale-0"
          }`}>
        <div className='p-4  bg-white shadow-md rounded-lg w-[60vh]'>
          <h2 className='text-xl font-bold mb-2'>How would you like to pay?</h2>
          <p>You may save this payment method for future invoices.</p>

          <button onClick={() => handleClosed("bankAccount")} className="flex items-center justify-center h-16 w-full border-black border rounded-lg mt-2">
            <div className="flex items-center justify-center">
              <BsBank className="text-4xl mr-4 text-[#42C2FF]" />
              <div>
                <div className="text-center font-bold">Bank Account</div>
                <p className='text-sm'>No processing fee</p>
              </div>
            </div>
          </button>
          <button onClick={() => handleClosed("card")} className="flex items-center justify-center h-16 w-full border-black border rounded-lg mt-2">
            <div className="flex items-center justify-center">
              <BsFillCreditCard2FrontFill className="text-4xl mr-4 text-[#42C2FF]" />
              <div>
                <div className="text-center font-bold">Credit/Debit Card</div>
                <p className='text-sm'>3% processing fee</p>
              </div>
            </div>
          </button>

        </div>

      </div>
    </div>
  )
}

export default AddMethod