import { useState } from 'react';
import { IoChevronDownCircleOutline } from 'react-icons/io5';

export default function GroupOrdering() {
	const [setups, setSetups] = useState([
		{
			totalSpending: 1000,
			discount: '30% off',
			discountCap: '30% off',
			restaurant: "Lee's House Restaurant",
			location: 'Victoria British Columbia V8N 3E2',
			address: '3994 Shelbourne St Canada',
		},
		{
			totalSpending: 2000,
			discount: '30% off',
			discountCap: '30% off',
			restaurant: "Lee's House Restaurant",
			location: 'Victoria British Columbia V8N 3E2',
			address: '3994 Shelbourne St Canada',
		},
	]);

	return (
		<div className='p-8 max-w-6xl mx-auto'>
			<h1 className='text-[28px] font-bold text-gray-800 mb-8'>
				Group Ordering Setup
			</h1>

			<div className='space-y-4 mb-12'>
				<div className='relative w-[240px]'>
					<select className='w-full px-4 py-3 bg-[#F8F9FA] rounded-lg appearance-none text-gray-500 focus:outline-none shadow-sm'>
						<option value='' disabled selected>
							Restaurant Name
						</option>
						<option>Lee's House Restaurant</option>
					</select>
					<IoChevronDownCircleOutline className='w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none' />
				</div>

				<div className='relative w-[240px]'>
					<select className='w-full px-4 py-3 bg-[#F8F9FA] rounded-lg appearance-none text-gray-500 focus:outline-none shadow-sm'>
						<option value='' disabled selected>
							Location Name
						</option>
						<option>Victoria</option>
					</select>
					<IoChevronDownCircleOutline className='w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none' />
				</div>
			</div>

			<div className='mb-6'>
				<h2 className='text-lg font-medium text-gray-800 mb-4'>
					Group Ordering Setup
				</h2>

				<div className='bg-white rounded-lg overflow-hidden'>
					<table className='w-full'>
						<thead>
							<tr className='border-b border-gray-100'>
								<th className='text-left px-6 py-4 text-sm font-medium text-gray-500'>
									Total Spending Amount
								</th>
								<th className='text-left px-6 py-4 text-sm font-medium text-gray-500'>
									Discount
								</th>
								<th className='text-left px-6 py-4 text-sm font-medium text-gray-500'>
									Discount Cap
								</th>
								<th className='text-left px-6 py-4 text-sm font-medium text-gray-500'>
									Restaurant
								</th>
								<th className='text-left px-6 py-4 text-sm font-medium text-gray-500'>
									Location
								</th>
							</tr>
						</thead>
						<tbody>
							{setups.map((setup, index) => (
								<tr
									key={index}
									className='border-b border-gray-50'
								>
									<td className='px-6 py-4'>
										<div className='bg-[#F8F9FA] rounded-lg px-4 py-2 inline-block'>
											$ {setup.totalSpending}
										</div>
									</td>
									<td className='px-6 py-4'>
										<div className='bg-[#F8F9FA] rounded-lg px-4 py-2 inline-block'>
											{setup.discount}
										</div>
									</td>
									<td className='px-6 py-4'>
										<div className='bg-[#F8F9FA] rounded-lg px-4 py-2 inline-block'>
											{setup.discountCap}
										</div>
									</td>
									<td className='px-6 py-4'>
										<div className=' rounded-lg px-4 py-2'>
											{setup.restaurant}
										</div>
									</td>
									<td className='px-6 py-4'>
										<div className='rounded-lg px-4 py-2'>
											{setup.address}
											<br />
											<span className='text-gray-600'>
												{setup.location}
											</span>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<button className='flex items-center gap-2 px-6 py-2.5 bg-[#40BFFF] hover:bg-[#40BFFF]/90 text-white rounded-lg transition-colors'>
				<span className='text-xl'>+</span>
				<span className='text-sm font-medium'>Add New Setup</span>
			</button>
		</div>
	);
}
