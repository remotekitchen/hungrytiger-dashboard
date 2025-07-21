import React, { useEffect, useRef } from 'react'
import { AiFillExclamationCircle } from 'react-icons/ai';

const EditMethod = ({
    editMethod,
    setEditMethod,
    setAddMethod
}) => {
    const editRef = useRef();

    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if (
                editMethod &&
                editRef.current &&
                !editRef.current.contains(e.target)
            ) {
                setEditMethod(false);
            }
        };

        document.addEventListener("mousedown", checkIfClickedOutside);

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [editMethod, setEditMethod]);
    return (
        <div
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  ${editMethod
                ? "w-full justify-center items-center flex backdrop-blur bg-black/20 h-screen z-10"
                : "z-[-10]"
                }`}>
            <div
                ref={editRef}
                className={` transition-all duration-300 ${editMethod ? "scale-100" : "scale-0"
                    }`}>
                    <div className='p-4  bg-white shadow-md rounded-lg w-[80vh]'>
                        <h1 className='text-3xl font-bold'>ChatChef</h1>
                        <h2 className='text-xl'>Payment Settings</h2>
                        <h1 className='text-xl font-bold py-1'>Preferred Payment Method</h1>
                        {/* redio button and bank name */}
                        <div className='flex gap-2 py-1'>
                            <input type="radio" name="paymentMethod" id="paymentMethod" />
                            <label htmlFor="paymentMethod">ROYAL BANK OF CANADA **** 0955</label>
                        </div>
                        <div className='flex gap-2 py-1'>
                            <AiFillExclamationCircle className='text-gray-700 text-2xl' />
                            <p className='text-sm'>To remove your current payment method, please add a new one first. A delete option will appear once a new method is added.</p>
                        </div>
                        <button onClick={()=> {
                            setEditMethod(false)
                            setAddMethod(true)
                        }} className="border border-black px-3 py-1 rounded-md mr-2">Add Method</button>
                        <h1 className='text-lg font-bold py-1'>Autopay</h1>
                        {/* check box */}
                        <div className='flex gap-2 py-1'>
                            <input type='checkbox' />
                            <p>Enable autopay</p>
                        </div>
                        <div className='flex justify-center'>
                            <button className='border w-full rounded-lg p-1 py-2 bg-[#1363DF] text-white'>Save the change</button>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default EditMethod