// components/GrossRevenue.js
import React from 'react';
import { BsExclamationCircle } from 'react-icons/bs';

const BagPrice = ({ bagPrice }) => {
	return (
		<div className='p-4 bg-white shadow rounded-lg mt-4 space-y-2'>
			<div className='flex items-center gap-2'>
				<h3 className='text-lg font-semibold'>Bag Fees</h3>
				<div
					className='tooltip'
					data-tip='The payment your client made for the bag or utensil.'
				>
					<BsExclamationCircle />
				</div>
			</div>
			<hr />
			<div className='flex items-center justify-between mt-2'>
				<p>Bag Fees</p>
				<p>{bagPrice}</p>
			</div>
		</div>
	);
};

export default BagPrice;
