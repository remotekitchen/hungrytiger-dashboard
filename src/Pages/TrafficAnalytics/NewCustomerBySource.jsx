import React from 'react';
import BarChart from './BarChart';

const NewCustomerBySource = ({ sourceCustomer }) => {
	console.log(sourceCustomer, 'sourceCustomer');

	const totalQRSource =
		sourceCustomer?.banner +
		sourceCustomer?.business_card +
		sourceCustomer?.flyer +
		sourceCustomer?.poster +
		sourceCustomer?.table;

	const data = [
		{
			label: 'Facebook',
			value: sourceCustomer?.facebook,
			color: '#b77ef3',
		},
		{
			label: 'Google Search',
			value: sourceCustomer?.google,
			color: '#235fe3',
		},
		{ label: 'QR Code', value: totalQRSource, color: '#ef8c3a' },
		{
			label: 'Instagram',
			value: sourceCustomer?.instagram,
			color: '#20bc53',
		},
	];

	// Calculate total count
	const total = data.reduce((acc, item) => acc + item.value, 0);
	return (
		<div className='w-full border border-gray-300 rounded-xl p-5'>
			<h5 className='font-bold text-lg'>New Customer By Source</h5>
			<span className='font-bold text-4xl'>650</span>
			<span className='text-[#6DCE80]'>+15%</span>
			<p className='font-bold my-2'>19,540 Customers Total</p>
			{/* bar chart  */}
			<div className='w-full'>
				{/* need to implement bar chart here  */}
				<BarChart sourceCustomer={sourceCustomer} />
				<div>
					{data.map((item, index) => {
						const percentage =
							total > 0
								? ((item.value / total) * 100).toFixed(2)
								: 0;

						return (
							<div
								key={index}
								className='flex items-center justify-between my-3'
							>
								<div>
									<p className='flex items-center gap-5'>
										<span
											className='inline-block w-6 h-6 rounded-full'
											style={{
												backgroundColor: item.color,
											}}
										></span>
										<span className='font-medium text-xl'>
											{item.label}
										</span>
									</p>
								</div>
								<div>
									<span className='font-bold text-xl'>
										{percentage}%
									</span>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default NewCustomerBySource;
