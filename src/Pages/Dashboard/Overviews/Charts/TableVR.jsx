import React from 'react';
import { FaGlobe, FaTwitter, FaGithub, FaVimeo, FaFacebook } from 'react-icons/fa';

const TableVR = () => {
    const channelData = [
        { name: 'Burger King', visitors: '3.5K', revenues: '$5,768', sales: '590', conversion: '4.8%', icon: <FaGlobe /> },
        { name: 'Pizza Hut', visitors: '2.2K', revenues: '$4,635', sales: '467', conversion: '4.3%', icon: <FaTwitter /> },
        { name: 'Taco Bell', visitors: '2.1K', revenues: '$4,290', sales: '420', conversion: '3.7%', icon: <FaGithub /> },
        { name: 'McDonald\'s', visitors: '1.5K', revenues: '$3,580', sales: '389', conversion: '2.5%', icon: <FaVimeo /> },
        { name: 'Subway', visitors: '1.2K', revenues: '$2,740', sales: '230', conversion: '1.9%', icon: <FaFacebook /> },
    ];

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 m-4 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black">
                Top Restaurant Channels
            </h4>

            <div className="flex flex-col">
                <div className="grid grid-cols-3 rounded-sm bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-500 text-white sm:grid-cols-5">
                    <div className="p-3 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Source
                        </h5>
                    </div>
                    <div className="p-3 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Visitors
                        </h5>
                    </div>
                    <div className="p-3 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Revenues
                        </h5>
                    </div>
                    <div className="hidden p-3 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Sales
                        </h5>
                    </div>
                    <div className="hidden p-3 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Conversion
                        </h5>
                    </div>
                </div>

                {channelData.map((channel, index) => (
                    <div key={index} className="grid grid-cols-3 border-b border-stroke sm:grid-cols-5 hover:bg-gray-100">
                        <div className="flex items-center gap-3 p-3 xl:p-5">
                            <div className="flex-shrink-0">
                                <span className="text-2xl text-blue-600">{channel.icon}</span>
                            </div>
                            <p className="text-black">{channel.name}</p>
                        </div>

                        <div className="flex items-center justify-center p-3 xl:p-5">
                            <p className="text-black">{channel.visitors}</p>
                        </div>

                        <div className="flex items-center justify-center p-3 xl:p-5">
                            <p className="text-meta-3">{channel.revenues}</p>
                        </div>

                        <div className="hidden items-center justify-center p-3 sm:flex xl:p-5">
                            <p className="text-black">{channel.sales}</p>
                        </div>

                        <div className="hidden items-center justify-center p-3 sm:flex xl:p-5">
                            <p className="text-meta-5">{channel.conversion}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TableVR;
