// components/GrossRevenue.js
import React from 'react';
import { BsExclamationCircle } from 'react-icons/bs';

const PromotionalDiscount = ({ promotionalDiscounts }) => {
	return (
		<div className='p-4 bg-white shadow rounded-lg mt-4 space-y-2'>
			<div className='flex items-center gap-2'>
				<h3 className='text-lg font-semibold'>Promotional Expenses</h3>
				<div
					className='tooltip'
					data-tip='Promotional discount is the discount offered by the company to the customer. Such as BOGO offers, discount coupons, First order etc.'
				>
					<BsExclamationCircle />
				</div>
			</div>
			<hr />
			<div className='flex items-center justify-between mt-2'>
				<p>Promotional Expenses</p>
				<p>{promotionalDiscounts}</p>
			</div>
		</div>
	);
};

export default PromotionalDiscount;
