import React from 'react';
import MediumStats from './CustomerbyMedium';
import TopCustomers from './TopCustomers';

const CustomeOverview = ({ topCustomers }) => {
	console.log(topCustomers, 'topCustomers');
	return (
		<div className='w-full'>
			{/* <div className='w-full h-56 p-5 shadow-lg border border-gray-300 rounded-xl'>
				<span className='font-bold'>Current Active Users</span>
				<p className='font-bold text-4xl py-2'>34</p>
				<span>Number of users currently on the site.</span>
			</div> */}

			{/* top customer  */}
			<TopCustomers topCustomers={topCustomers} />
			{/* By Medium  */}
			{/* <MediumStats /> */}
		</div>
	);
};

export default CustomeOverview;
