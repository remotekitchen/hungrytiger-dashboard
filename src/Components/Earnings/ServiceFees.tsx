// components/GrossRevenue.js
import React from 'react';
import { BsExclamationCircle } from 'react-icons/bs';

const ServiceFees = ({ serviceFees }) => {
	return (
		<div className='p-4 bg-white shadow rounded-lg mt-4 space-y-2'>
			<div className='flex items-center gap-2'>
				<h3 className='text-lg font-semibold'>
					Service Fees paid to ChatChefs
				</h3>
				<div
					className='tooltip'
					data-tip='Service fees are the fees charged by the company to the customer for the service provided.'
				>
					<BsExclamationCircle />
				</div>
			</div>
			<hr />
			<div className='flex items-center justify-between mt-2'>
				<p>Service Fees Paid To ChatChefs</p>
				<p>{serviceFees}</p>
			</div>
		</div>
	);
};

export default ServiceFees;
