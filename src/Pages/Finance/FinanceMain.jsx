import React from 'react';
import FinanceChart from './FinanceChart';
import FinanceTable from './FinanceTable';
import FinanceMid from './FinanceMid';
import RestaurantnList from '../Dashboard/Overviews/RestaurantnList';

const FinanceMain = () => {
    return (
        <div className="p-6">
            <div className="mb-4">
                <h1 className="text-3xl font-bold">Reconciliation</h1>
            </div>
            <div className='flex justify-end'>
                <div className="dropdown dropdown-end">
                    <label
                        tabIndex={0}
                        className="btn w-56 btn-sm bg-base-200 text-gray-600 border-none hover:bg-base-200 m-1"
                    >
                        All Brands & Stores
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-8 shadow bg-base-100 rounded-box w-[40rem] h-[30rem] "
                    >
                        <div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Search for a brand, store, or address"
                                    className="input input-bordered w-full rounded-full"
                                />
                            </div>

                            {/* ================ */}
                            <div className="flex justify-between items-center p-2 bg-green-100 my-5">
                                <div className="form-control">
                                    <label className="label cursor-pointer p-1">
                                        <span className="label-text me-4 text-green-700">
                                            Select All
                                        </span>
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-success"
                                        />
                                    </label>
                                </div>
                                <div className="border-2 px-2 py-1 border-green-700 rounded-md">
                                    <span className="text-green-700">40</span>
                                </div>
                            </div>

                            {/* ============ */}
                            <div className="flex flex-col w-full lg:flex-row px-2">
                                <div className="grid flex-grow h-72 card rounded-box overflow-auto">
                                    <RestaurantnList />
                                    <RestaurantnList />
                                    <RestaurantnList />
                                    <RestaurantnList />
                                    <RestaurantnList />
                                    <RestaurantnList />
                                    <RestaurantnList />
                                    <RestaurantnList />
                                    <RestaurantnList />
                                    <RestaurantnList />
                                    <RestaurantnList />
                                    <RestaurantnList />
                                </div>
                                {/* <div className="divider lg:divider-horizontal"></div> */}
                                <div className="grid flex-grow  h-72 card rounded-box">
                                    <RestaurantnList />
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>
                <div className="relative z-20">
                    <select
                        name=""
                        id=""
                        className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
                    >
                        <option value="">Dine-in</option>
                        <option value="">Take-out</option>
                        <option value="">Kiosks</option>
                    </select>
                    <span className="absolute top-1/2 right-3 z-10 -translate-y-1/2">
                        <svg
                            width="10"
                            height="6"
                            viewBox="0 0 10 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M0.47072 1.08816C0.47072 1.02932 0.500141 0.955772 0.54427 0.911642C0.647241 0.808672 0.809051 0.808672 0.912022 0.896932L4.85431 4.60386C4.92785 4.67741 5.06025 4.67741 5.14851 4.60386L9.09079 0.896932C9.19376 0.793962 9.35557 0.808672 9.45854 0.911642C9.56151 1.01461 9.5468 1.17642 9.44383 1.27939L5.50155 4.98632C5.22206 5.23639 4.78076 5.23639 4.51598 4.98632L0.558981 1.27939C0.50014 1.22055 0.47072 1.16171 0.47072 1.08816Z"
                                fill="#637381"
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M1.22659 0.546578L5.00141 4.09604L8.76422 0.557869C9.08459 0.244537 9.54201 0.329403 9.79139 0.578788C10.112 0.899434 10.0277 1.36122 9.77668 1.61224L9.76644 1.62248L5.81552 5.33722C5.36257 5.74249 4.6445 5.7544 4.19352 5.32924C4.19327 5.32901 4.19377 5.32948 4.19352 5.32924L0.225953 1.61241C0.102762 1.48922 -4.20186e-08 1.31674 -3.20269e-08 1.08816C-2.40601e-08 0.905899 0.0780105 0.712197 0.211421 0.578787C0.494701 0.295506 0.935574 0.297138 1.21836 0.539529L1.22659 0.546578ZM4.51598 4.98632C4.78076 5.23639 5.22206 5.23639 5.50155 4.98632L9.44383 1.27939C9.5468 1.17642 9.56151 1.01461 9.45854 0.911642C9.35557 0.808672 9.19376 0.793962 9.09079 0.896932L5.14851 4.60386C5.06025 4.67741 4.92785 4.67741 4.85431 4.60386L0.912022 0.896932C0.809051 0.808672 0.647241 0.808672 0.54427 0.911642C0.500141 0.955772 0.47072 1.02932 0.47072 1.08816C0.47072 1.16171 0.50014 1.22055 0.558981 1.27939L4.51598 4.98632Z"
                                fill="#637381"
                            />
                        </svg>
                    </span>
                </div>
            </div>
            <div className="grid grid-rows-3 grid-flow-col gap-4">

                <div className="row-span-2 border p-4 space-y-2">
                    <p className="text-lg font-bold">Payment Difference</p>
                    <p className="text-3xl font-bold"><span>$</span>0.00</p>
                    <p><span className="text-red-500">0.00% </span>of Calculated Payment</p>
                </div>

                <div className="row-span-3 col-span-2 border p-4">
                    <FinanceChart />
                </div>
            </div>
            <div className="m-10">
                <p className='text-lg text-gray-600 font-bold'>Order Summery</p>
                <FinanceMid />
            </div>
            <div>
                <FinanceTable />
            </div>
        </div>
    );
};

export default FinanceMain;
