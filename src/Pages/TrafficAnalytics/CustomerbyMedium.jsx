import React from 'react';

const MediumStats = () => {
	const mediumData = [
		{ name: 'Organic', value: '17.3K' },
		{ name: '(none)', value: '6603' },
		{ name: 'CPC', value: '1333' },
		{ name: 'Referral', value: '1009' },
		{ name: 'P_Social', value: '87' },
	];

	return (
		<div className='w-full shadow-lg border border-gray-300 rounded-xl mt-10'>
			<p className='p-5 font-medium text-xl bg-[#e2e7ec] w-full h-full rounded-tr-xl rounded-tl-xl border-b-2 border-gray-300'>
				By Medium
			</p>
			{mediumData.map((item, index) => (
				<div
					key={index}
					className='p-5 font-medium text-xl w-full h-full rounded-tr-xl rounded-tl-xl border-b-2 border-gray-300 flex justify-between items-center'
				>
					<span>{item.name}</span>
					<span>{item.value}</span>
				</div>
			))}
		</div>
	);
};

export default MediumStats;
