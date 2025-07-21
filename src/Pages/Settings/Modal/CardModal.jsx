import React, { useEffect, useRef } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md';

const CardModal = ({
    cardModal,
    setCardModal,
    setAddMethod,
    handleClosed
}) => {
    const cardRef = useRef();

    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if (
                cardModal &&
                cardRef.current &&
                !cardRef.current.contains(e.target)
            ) {
                setCardModal(false);
            }
        };

        document.addEventListener("mousedown", checkIfClickedOutside);

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [cardModal, setCardModal]);
    return (
        <div
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  ${cardModal
                ? "w-full justify-center items-center flex backdrop-blur bg-black/20 h-screen z-10"
                : "z-[-10]"
                }`}>
            <div
                ref={cardRef}
                className={` transition-all duration-300 ${cardModal ? "scale-100" : "scale-0"
                    }`}>
                <div className='p-4 bg-white shadow-md rounded-lg w-[60vh]'>
                    <div className='flex gap-3'>
                        <button className='flex gap-2 mt-1' onClick={() => {
                            setCardModal(false)
                            setAddMethod(true)
                        }}>
                            <MdKeyboardArrowLeft className='text-white text-2xl bg-[#1363DF] border rounded-full ' />
                        </button>
                        <h2 className='text-xl font-bold mb-2'>Card Add</h2>
                    </div>
                    <form className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="accountHolderName">Card number</label>
                            <input type="text" name="accountHolderName" id="accountHolderName" placeholder='Card number' className='border border-black rounded-lg p-1' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="accountNumber">Expiration Date</label>
                            <input type="text" name="accountNumber" id="accountNumber" placeholder='MM/YY' className='border border-black rounded-lg p-1' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="routingNumber">Security code</label>
                            <input type="text" name="routingNumber" id="routingNumber" placeholder='CVV' className='border border-black rounded-lg p-1' />
                        </div>
                        <button className='border rounded-lg p-1 bg-[#1363DF] text-white'>Add Card</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default CardModal