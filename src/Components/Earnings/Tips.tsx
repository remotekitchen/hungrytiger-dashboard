// components/GrossRevenue.js
import React from 'react';
import { BsExclamationCircle } from 'react-icons/bs';

const Tips = ({ tips }) => {
	return (
		<div className='p-4 bg-white shadow rounded-lg mt-4 space-y-2'>
			<div className='flex items-center gap-2'>
				<h3 className='text-lg font-semibold'>Tips</h3>
				<div
					className='tooltip'
					data-tip='Tips are the extra amount paid by the customer to the delivery person.'
				>
					<BsExclamationCircle />
				</div>
			</div>
			<hr />
			<div className='flex items-center justify-between mt-2'>
				<p>Tips</p>
				<p>{tips}</p>
			</div>
		</div>
	);
};

export default Tips;
