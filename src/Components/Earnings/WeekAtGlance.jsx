// components/WeekAtGlance.js
import React from 'react';
import { BsExclamationCircle } from 'react-icons/bs';
import { FaMoneyBill, FaReceipt } from 'react-icons/fa';

const WeekAtGlance = ({ directDeposit, orders }) => {
	return (
		<div className='p-4 shadow rounded-lg mt-4 bg-white space-y-2'>
			<div className='flex items-center gap-2'>
				<h3 className='text-lg font-semibold'>Week at a Glance</h3>
				<div
					className='tooltip'
					data-tip='Your statement is ready on a weekly basis automatically and send to your account.'
				>
					<BsExclamationCircle />
				</div>
			</div>
			<div className='border border-gray-200'>
				<div className=' hover:bg-gray-300 p-3 flex items-center justify-between'>
					<div>
						{directDeposit}
						<p className='text-sm'>Your direct deposit amount</p>
					</div>
					<FaMoneyBill className='text-gray-800' size={26} />
				</div>
				<hr />
				<div className='hover:bg-gray-300 p-3 flex items-center justify-between'>
					<div>
						{orders}
						<p className='text-sm'>Our orders together</p>
					</div>
					<FaReceipt className='text-gray-800' size={26} />
				</div>
			</div>
		</div>
	);
};

export default WeekAtGlance;
