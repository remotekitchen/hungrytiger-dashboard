// components/GrossRevenue.js
import React from 'react';
import { BsExclamationCircle } from 'react-icons/bs';

const GrossRevenue = ({ revenue }) => {
	return (
		<div className='p-4 bg-white shadow rounded-lg mt-4 space-y-2'>
			<div className='flex items-center gap-2'>
				<h3 className='text-lg font-semibold'>Gross Revenue</h3>
				<div
					className='tooltip'
					data-tip='Gross Revenue is Net Revenue + Discount amount'
				>
					<BsExclamationCircle />
				</div>
			</div>
			<hr />
			<div className='flex items-center justify-between mt-2'>
				<p>Gross Revenue</p>
				<p>{revenue}</p>
			</div>
		</div>
	);
};

export default GrossRevenue;
