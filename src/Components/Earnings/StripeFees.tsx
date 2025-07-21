// components/GrossRevenue.js
import React from 'react';
import { BsExclamationCircle } from 'react-icons/bs';

const StripeFees = ({ stripeFees }) => {
	return (
		<div className='p-4 bg-white shadow rounded-lg mt-4 space-y-2'>
			<div className='flex items-center gap-2'>
				<h3 className='text-lg font-semibold'>Stripe Fees</h3>
				<div
					className='tooltip'
					data-tip='Stripe fees are the fees charged by the company to the customer for the service provided.'
				>
					<BsExclamationCircle />
				</div>
			</div>
			<hr />
			<div className='flex items-center justify-between mt-2'>
				<p>Stripe Fees</p>
				<p>{stripeFees}</p>
			</div>
		</div>
	);
};

export default StripeFees;
