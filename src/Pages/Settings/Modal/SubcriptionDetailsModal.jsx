import React, { useEffect, useRef } from 'react'

const SubcriptionDetailsModal = ({
    subscriptionDetailsModal,
    setSubscriptionDetailsModal
}) => {
    const detailsRef = useRef();

    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if (
                subscriptionDetailsModal &&
                detailsRef.current &&
                !detailsRef.current.contains(e.target)
            ) {
                setSubscriptionDetailsModal(false);
            }
        };

        document.addEventListener("mousedown", checkIfClickedOutside);

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [subscriptionDetailsModal, setSubscriptionDetailsModal]);
    return (
        <div
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  ${subscriptionDetailsModal
                ? "w-full justify-center items-center flex backdrop-blur bg-black/20 h-screen z-10"
                : "z-[-10]"
                }`}>
            <div
                ref={detailsRef}
                className={` transition-all duration-300 ${subscriptionDetailsModal ? "scale-100" : "scale-0"
                    }`}>
                <div className='p-4 bg-white shadow-md rounded-lg w-[80vh]'>
                   
                            {/* 1st Part */}
                            <div className="border border-black rounded-lg mb-4 p-4">
                                <div className='flex gap-3 items-center'>
                                    <h2 className="text-xl font-semibold">Subscription 4cc2d</h2>
                                    <p className='bg-[#C8FFE7] text-green-500 px-4 py-1 border rounded'>Active</p>
                                </div>
                                <p>1 plan, 3 products, 1 location</p>
                            </div>

                            {/* 2nd Part */}
                            <div className="border border-black rounded-lg mb-4 p-4">
                                <h2 className="text-xl font-semibold">Plans</h2>
                                <hr className="my-2 border border-gray-400" />
                                <div className='flex justify-between'>
                                    <p>Bundle - Core</p>
                                    <p>CA$69.00/mo</p>
                                </div>
                                <p className='font-bold'>CA$69.00/mo x 1 location</p>
                                <div className="">
                                    <p className="font-semibold">Locations</p>
                                    <p>Famous Wok - Vancouver</p>
                                    <p>200 Burrard St, Vancouver, BC H3B 2B2, Canada</p>
                                </div>
                            </div>

                            {/* 3rd Part */}
                            <div className="border border-black rounded-lg mb-4 p-4">
                                <div className="flex justify-between">
                                    <h2 className="text-xl font-semibold">Payment Settings</h2>
                                    <button className="border border-black rounded-lg px-2">Edit</button>
                                </div>
                                <hr className="my-2 border border-gray-400" />
                                <div className='flex justify-between'>
                                    <div>
                                        <p className="font-semibold">Preferred Payment Method</p>
                                        <p>ROYAL BANK OF CANADA ******1234</p>

                                    </div>
                                    <div>
                                        <p>Autopay</p>
                                        <p>Disabled</p>
                                    </div>
                                </div>
                            </div>
                        </div>
              
            </div>
        </div>
    )
}

export default SubcriptionDetailsModal