import React from 'react';
import BarChart from './BarChart';
import MyGaugeChart from './MyGuageChart';
import NewCustomerBySource from './NewCustomerBySource';

const SourceAndBounceRate = ({ sourceCustomer }) => {
	return (
		<div className='w-full'>
			{/* <h3 className='text-2xl font-bold'>Bounce Rate 7 day</h3> */}
			{/* <div className='w-full'> */}
			{/* <GaugeChart /> */}
			{/* <MyGaugeChart /> */}
			{/* </div> */}
			<NewCustomerBySource sourceCustomer={sourceCustomer} />
		</div>
	);
};

export default SourceAndBounceRate;
