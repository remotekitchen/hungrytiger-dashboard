import React from 'react';
import { AiOutlineEye } from 'react-icons/ai';

const Card = ({ title, imageUrl, buttonText, view }) => {
    const cardBackgroundColor = buttonText === 'Use This Template' ? 'bg-[#42C2FF]' : 'bg-gray-400';
    return (
        <div className="mt-3">
            <div className="bg-white shadow-lg rounded-lg p-2">
                <h1 className="text-sm  mb-2">{title}</h1>
                <h2 className="text-xl mb-2">{title}</h2>
                <img src={imageUrl} alt={title} className="w-full h-40 object-cover" />
                <div className="mt-2">
                    <div className="flex justify-between items-center">
                        <button className={`px-4 py-2 ${buttonText === 'Use This Template' ? 'bg-[#42C2FF] text-white' : 'bg-gray-400 text-white'} rounded-lg`}>
                            {buttonText}
                        </button>
                        <p className="text-[#42C2FF] flex items-center gap-3"><AiOutlineEye className='text-xl' />{view}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
