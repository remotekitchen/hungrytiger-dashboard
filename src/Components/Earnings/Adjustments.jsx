// components/GrossRevenue.js
import React from 'react';
import { BsExclamationCircle } from 'react-icons/bs';
import DownloadButtons from './DownloadButtons';
import PrintButton from './PrintButtons';

const Adjustments = ({ netRevenue }) => {
	return (
		<div className='p-4 bg-white shadow rounded-lg mt-4'>
			<h3 className='text-lg font-semibold mb-2'>Adjustments</h3>

			<div className='mt-2 border p-4 space-y-4'>
				<div className='flex items-center justify-between '>
					<p className='text-md font-semibold'>Notes</p>
				</div>
				<p>Some notes....</p>
			</div>
		</div>
	);
};

export default Adjustments;
