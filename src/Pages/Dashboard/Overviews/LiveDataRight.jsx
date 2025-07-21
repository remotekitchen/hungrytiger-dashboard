import React from 'react';
import { RiReactjsFill } from 'react-icons/ri';
import {FcMoneyTransfer} from 'react-icons/fc'
const LiveDataRight = () => {
    return (
        <div className="flex justify-center items-center mt-5">
            <div className="card w-96 bg-white shadow-xl mx-4">
                {/* <div className='flex items-center justify-content:space-evenly'>
                    <FcMoneyTransfer size={50} color='' />
                </div> */}
                <div className="card-body justify-between flex-row">
                    <div className="text-center">
                        <h3 className="text-4xl text-gray-600 font-bold">0</h3>
                        <p className="text-sm text-gray-500">Amount Paid</p>
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
                        <p className="text-sm text-gray-500">Accumative Visit</p>
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

export default LiveDataRight;