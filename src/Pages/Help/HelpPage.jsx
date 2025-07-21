import React, { useState } from 'react'
import CustomerSupport from './components/CustomerSupport';
import FAQ from './components/FAQ';
import HelpSidebar from './HelpSidebar';
import { MdHeadsetMic } from 'react-icons/md';

const HelpPage = () => {
    const [selected, setSelected] = useState("Customer Support");

    const components = {
        "Customer Support": <CustomerSupport />,
        "FAQ": <FAQ />,
    }

    return (
        <div className="flex overflow-auto">
            {/* Sidebar */}
            <div className="p-4">
                {/* Category content */}
                <div className="mb-4 flex gap-2">
                   <MdHeadsetMic className="text-[#42C2FF] text-2xl" />
                    <h2 className=" text-xl capitalize">Help</h2>
                </div>
                <HelpSidebar
                    value={selected}
                    onClick={setSelected}
                />
            </div>

            <div className="flex flex-col flex-1  border-l-2 border-[#D3E7F0]">
                <div className="h-[80vh] overflow-auto p-4">
                    {components[selected]}
                </div>
            </div>
        </div>
    )
}

export default HelpPage