// components/GrossRevenue.js
import React from 'react';
import { BsExclamationCircle } from 'react-icons/bs';

const OriginalDeliveryFees = ({ originalDeliveryFees }) => {
	return (
		<div className='p-4 bg-white shadow rounded-lg mt-4 space-y-2'>
			<div className='flex items-center gap-2'>
				<h3 className='text-lg font-semibold'>
					Original Delivery Fees
				</h3>
				<div
					className='tooltip'
					data-tip='Original delivery fees are the fees that UberEats charges to the customer for delivery of the order.'
				>
					<BsExclamationCircle />
				</div>
			</div>
			<hr />
			<div className='flex items-center justify-between mt-2'>
				<p>Original Delivery Fees</p>
				<p>{originalDeliveryFees}</p>
			</div>
		</div>
	);
};

export default OriginalDeliveryFees;
