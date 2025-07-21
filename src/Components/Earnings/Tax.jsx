// components/GrossRevenue.js
import React from 'react';
import { BsExclamationCircle } from 'react-icons/bs';

const Tax = ({
	customer_HST,
	customer_PST,
	restaurant_GST_HST,
	restaurant_PST,
	restaurant,
}) => {
	return (
		<div className='p-4 bg-white shadow rounded-lg mt-4'>
			<h3 className='text-lg font-semibold mb-2'>Tax</h3>

			<div className='mt-2 border p-4 space-y-4'>
				<div className='flex items-center justify-between '>
					<p className='text-md font-semibold'>
						Tax paid by customers
					</p>
					<div
						className='tooltip tooltip-left'
						data-tip='Customers pay sales or VAT tax as part of their meal cost, collected by the restaurant.'
					>
						<BsExclamationCircle />
					</div>
				</div>
				<hr />
				<div className='flex items-center justify-between '>
					<p className='text-md'>(PST)</p>
					<p>{customer_PST}</p>
				</div>
				<hr />
				<div className='flex items-center justify-between '>
					<p className='text-md'>GST/HST</p>
					<p>{customer_HST}</p>
				</div>
			</div>
			<div className='mt-2 border p-4 space-y-4'>
				<div className='flex items-center justify-between '>
					<p className='text-md font-semibold'>
						Tax paid by {restaurant}
					</p>
					<div
						className='tooltip tooltip-left'
						data-tip='  Restaurants pay business-related taxes like corporate income tax, payroll tax, and property tax directly to tax authorities.'
					>
						<BsExclamationCircle />
					</div>
				</div>
				<hr />
				<div className='flex items-center justify-between '>
					<p className='text-md'>(PST)</p>
					<p>{restaurant_PST}</p>
				</div>
				<hr />
				<div className='flex items-center justify-between '>
					<p className='text-md'>GST/HST</p>
					<p>{restaurant_GST_HST}</p>
				</div>
			</div>
		</div>
	);
};

export default Tax;
