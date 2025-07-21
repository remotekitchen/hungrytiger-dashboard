import React from 'react';

const FinanceMid = () => {
    return (
        <div className="flex">
            <div className="card h-24 bg-base-100 shadow-xl m-2 border" style={{ width: '350px' }}>
                <div className="card-body p-4 flex flex-col items-center">
                    <h2 className="card-title text-sm text-gray-500">Received Orders</h2>
                    <p className="text-2xl font-bold">200</p>
                </div>
            </div>

            <div className="card h-24 bg-base-100 shadow-xl m-2 border" style={{ width: '350px' }}>
                <div className="card-body p-4 flex flex-col items-center">
                    <h2 className="card-title text-sm text-gray-500">Delivered Orders</h2>
                    <p className="text-2xl font-bold">223</p>
                </div>
            </div>

            <div className="card h-24 bg-base-100 shadow-xl m-2 border" style={{ width: '350px' }}>
                <div className="card-body p-4 flex flex-col items-center">
                    <h4 className="card-title text-sm text-gray-500">Cancelled Orders</h4>
                    <p className="text-2xl font-bold">32</p>
                </div>
            </div>

            <div className="card h-24 bg-base-100 shadow-xl m-2 border" style={{ width: '350px' }}>
                <div className="card-body p-4 flex flex-col items-center">
                    <h2 className="card-title text-sm text-gray-500">Missed Orders</h2>
                    <p className="text-2xl font-bold">4</p>
                </div>
            </div>
        </div>
    );
};

export default FinanceMid;
