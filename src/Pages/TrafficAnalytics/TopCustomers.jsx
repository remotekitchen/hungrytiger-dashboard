import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const TopCustomers = ({ topCustomers }) => {
	const customerData = [
		{
			name: 'Chris Friedkly',
			orderCount: '15th times',
			avatarUrl:
				'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
			bgColor: '#FFF7E8', // Optionally use different background colors for the top customer
		},
		{
			name: 'John Doe',
			orderCount: '12th times',
			avatarUrl:
				'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
		},
		{
			name: 'Jane Smith',
			orderCount: '10th times',
			avatarUrl:
				'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
		},
	];

	const topCustomerList = topCustomers?.map((customer) => {
		return {
			name:
				customer?.user?.user?.first_name +
				' ' +
				customer?.user?.user?.last_name,
			orderCount: customer?.order_count + ' times',
			avatarUrl: 'https://avatar.iran.liara.run/public',
		};
	});

	console.log(topCustomers, 'toprCustomerList');

	const navigate = useNavigate();

	return (
		<div className='w-full p-5 shadow-lg border border-gray-300 rounded-xl mt-5'>
			<div className='flex items-center justify-between'>
				<p className='font-medium text-2xl mb-2'>Top Customers</p>
				<IoIosArrowForward
					onClick={() => navigate('/dashboard/customerProfile')}
					size={28}
					className='cursor-pointer font-bold'
				/>
			</div>
			{topCustomerList?.map((customer, index) => (
				<div
					key={index}
					className={`rounded-2xl flex items-center gap-5 p-5 mb-3 ${
						customer.bgColor ? `bg-[${customer.bgColor}]` : ''
					}`}
				>
					<div>
						<div className='avatar'>
							<div className='w-14 rounded-full'>
								<img
									src={customer.avatarUrl}
									alt={customer?.name}
								/>
							</div>
						</div>
					</div>
					<div>
						<h2 className='font-bold text-xl'>{customer.name}</h2>
						<span className='font-medium'>
							Ordered {customer.orderCount}
						</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default TopCustomers;
