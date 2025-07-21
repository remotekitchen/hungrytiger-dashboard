import React from 'react';
import { FaMoneyBillWave } from 'react-icons/fa';

const LiveDataLeft = () => {
    return (
        <div className="flex justify-center items-center mt-5">
            <div className="card w-96 bg-white shadow-xl mx-4">
                {/* <div className='flex items-center jus'>
          <FaMoneyBillWave size={50} color='' />
        </div> */}
                <div className="card-body justify-between flex-row">
                    <div className="text-center">
                        <h3 className="text-4xl text-gray-600 font-bold">0</h3>
                        <p className="text-sm text-gray-500">Number of Paid Order</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-4xl text-gray-600 font-bold">0</h3>
                        <p className="text-sm text-gray-500">Yesterday</p>
                    </div>
                </div>
            </div>
            <div className="card w-96 bg-white shadow-xl mx-4">
                {/* <div className='flex items-center jus'>
          <FaMoneyBillWave size={50} color='' />
        </div> */}
                <div className="card-body justify-between flex-row">
                    <div className="text-center">
                        <h3 className="text-4xl text-gray-600 font-bold">0</h3>
                        <p className="text-sm text-gray-500">Visit Count</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-4xl text-gray-600 font-bold">0</h3>
                        <p className="text-sm text-gray-500">Yesterday</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveDataLeft;
