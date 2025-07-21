import React from 'react'
import { cardData } from '../../../data/data'
import Card from './Card'
import { FiDownload } from 'react-icons/fi'



const QRCode = () => {
    return (
        <div className="p-5">
            <h1 className="text-4xl font-bold mb-7">QR Code</h1>
            <h2 className="text-xl font-bold">Select Restaurant Digital Menu Template</h2>
            <div className="grid grid-cols-3 gap-2">
                {cardData.map((card, index) => (
                    <Card
                        key={index}
                        title={card.title}
                        imageUrl={card.imageUrl}
                        buttonText={card.buttonText}
                        view={card.view}
                    />
                ))}
            </div>
            <button className="mt-4 bg-[#42C2FF] text-white font-bold py-2 px-4 rounded-lg flex items-center gap-3">
                <FiDownload className='text-xl' />
                Download QR Design PDF</button>
        </div>
    )
}

export default QRCode

