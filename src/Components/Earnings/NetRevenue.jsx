// components/GrossRevenue.js
import React from 'react';
import { BsExclamationCircle } from 'react-icons/bs';

const NetRevenue = ({ netRevenue }) => {
	return (
		<div className='p-4 bg-white shadow rounded-lg mt-4 space-y-2'>
			<div className='flex items-center gap-2'>
				<h3 className='text-lg font-semibold'>Net Revenue</h3>
				<div
					className='tooltip'
					data-tip='Net Revenue = Gross Revenue - Discount Amount'
				>
					<BsExclamationCircle />
				</div>
			</div>
			<hr />
			<div className='flex items-center justify-between mt-2'>
				<p>Net Revenue</p>
				<p>{netRevenue}</p>
			</div>
		</div>
	);
};

export default NetRevenue;
