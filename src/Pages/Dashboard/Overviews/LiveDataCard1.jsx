import React from 'react';
import { BiUpArrowAlt } from "react-icons/bi"

const LiveDataCard1 = ({
    order,
    yesterdayOrder
}) => {
    return (
        <div>
            <div className="card  w-60  bg-white mx-4">
                {/* <div className='flex items-center jus'>
          <FaMoneyBillWave size={50} color='' />
        </div> */}
                <div className="card-body">
                    <div className="text-center">
                        <h4 className=" text-gray-600">Number of Paid Order</h4>
                        <div className='flex justify-center items-center'>
                            <h3 className="text-3xl text-gray-600 font-bold">{order}</h3>
                            <div className="text-3xl text-gray-600 font-bold"><BiUpArrowAlt /></div>
                        </div>
                        <p className="text-sm text-gray-500">Yesterday: {yesterdayOrder}</p>
                    </div>
                    {/* <div className="text-center">
                    <h3 className="text-4xl text-gray-600 font-bold">0</h3>
                    <p className="text-sm text-gray-500">Yesterday</p>
                </div> */}
                </div>
            </div>
        </div>

    );
};

export default LiveDataCard1;