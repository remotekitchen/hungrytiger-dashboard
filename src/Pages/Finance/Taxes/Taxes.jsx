import React, { useState } from 'react'
import { HiReceiptTax } from 'react-icons/hi'

const Taxes = () => {
    const [legalName, setLegalName] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [province, setProvince] = useState('')
    const [country, setCountry] = useState('')

    return (
        <div className="p-5">
            <h1 className="text-4xl font-bold mb-7">Taxes</h1>
            <h2 className="text-2xl font-bold">Invoice Settings</h2>
            <p>Select default payment methods</p>
            <div className='mt-4 w-1/2 py-4'>
                <div>
                    <label className="block text-lg font-medium text-gray-700">Legal Name or Registered Business Name</label>
                    <input
                        type="text"
                        placeholder='Name of Business'
                        className="border border-gray-300 rounded-md p-2 w-full"
                        value={legalName}
                        onChange={(e) => setLegalName(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-700">Street address</label>
                    <input
                        type="text"
                        placeholder='Street address of your business'
                        className="border border-gray-300 rounded-md p-2 w-full"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-700">City</label>
                    <input
                        type="text"
                        placeholder='City of your business'
                        className="border border-gray-300 rounded-md p-2 w-full"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-700">Postal Code</label>
                    <input
                        type="text"
                        placeholder='Postal Code '
                        className="border border-gray-300 rounded-md p-2 w-full"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-700">Province</label>
                    <select className="border border-gray-300 rounded-md p-2 w-full">
                        <option disabled defaultValue="">
                            Select
                        </option>
                        <option value="menu">Province Name</option>
                        {/* <option value="item">Item</option> */}
                    </select>
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-700">Country</label>
                    <input
                        type="text"
                        placeholder='Country Name'
                        className="border border-gray-300 rounded-md p-2 w-full"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>
                <div className='flex gap-4'>
                    <button
                        className="mt-4 bg-[#42C2FF] text-white font-bold py-2 px-4 rounded"
                        onClick={""}
                    >
                        Save Changes
                    </button>
                    <button
                        className="mt-4 text-[#42C2FF]  font-bold py-2 px-4 rounded flex gap-2 items-center"
                        onClick={""}
                    >
                        <HiReceiptTax className="h-5 w-5 mr-2" />
                        Tax Status and Settings
                    </button>
                </div>
            </div>
        </div >
    )
}

export default Taxes