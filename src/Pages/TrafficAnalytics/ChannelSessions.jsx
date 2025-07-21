import React from 'react';

const ChannelSessions = () => {
	const sessionData = [
		{ channel: 'ORGANIC SEARCH', value: 20 },
		{ channel: 'SOCIAL', value: 60 },
		{ channel: 'REFERRAL', value: 50 },
		{ channel: 'PAID SEARCH', value: 30 },
		{ channel: 'DIRECT', value: 20 },
	];

	return (
		<div className='w-full p-4'>
			<h3 className='text-lg font-semibold mb-2'>Channel Sessions</h3>
			{sessionData.map((item, index) => (
				<div key={index} className='my-3 relative'>
					{/* <div className='bg-gradient-to-r from-yellow-200 to-yellow-400 h-10 rounded relative'> */}
					<div
						className='bg-gradient-to-r to-[#fff6e5] from-[#ffce75] h-10 rounded'
						style={{ width: `${item.value}%` }}
					/>
					<div className='text-sm font-bold text-gray-800 absolute top-[28%] left-2'>
						{item.channel}
					</div>
				</div>
				// </div>
			))}
		</div>
	);
};

export default ChannelSessions;
