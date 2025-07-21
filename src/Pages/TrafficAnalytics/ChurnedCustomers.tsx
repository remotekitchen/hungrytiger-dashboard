import React from 'react';
import { format } from 'date-fns';

const ChurnedUsersTableModal = ({ isModalOpen, onClose, churnedUsers }) => {
	console.log(churnedUsers, 'churnedUsers');
	const churnedUsersData = [
		{
			user__id: 20,
			user__first_name: 'ANIK',
			user__last_name: 'meow',
			user__email: 'anikdev2016@gmail.com',
			user__phone: '01521370824',
			last_order_date: '2024-09-22T11:31:40.704683Z',
		},
		{
			user__id: 3159,
			user__first_name: 'Erica',
			user__last_name: 'U',
			user__email: 'erica_um89@hotmail.com',
			user__phone: '',
			last_order_date: null,
		},
		{
			user__id: 4534,
			user__first_name: 'Karena',
			user__last_name: 'Cheung',
			user__email: 'ar_yan@hotmail.com',
			user__phone: '',
			last_order_date: null,
		},
		{
			user__id: 2091,
			user__first_name: 'Cat',
			user__last_name: 'Ng',
			user__email: 'adelinellnc@gmail.com',
			user__phone: '',
			last_order_date: '2024-10-05T21:45:06.578483Z',
		},
		{
			user__id: 226,
			user__first_name: 'Hiji',
			user__last_name: 'Biji',
			user__email: 'hijibiji6996@gmail.com',
			user__phone: '',
			last_order_date: null,
		},
		{
			user__id: 2381,
			user__first_name: 'Jacob',
			user__last_name: 'WANG',
			user__email: 'wangyijiwyj@gmail.com',
			user__phone: '',
			last_order_date: null,
		},
		{
			user__id: 521,
			user__first_name: 'Pearl Castle',
			user__last_name: 'Cafe',
			user__email: 'info@pearlcastle.com',
			user__phone: '',
			last_order_date: null,
		},
	];

	if (!isModalOpen) return null;

	return (
		<div className='modal modal-open'>
			<div className='modal-box w-full max-w-5xl'>
				<h3 className='font-bold text-lg n'>
					Churned Customers (
					{
						churnedUsers[0].churned_users?.filter(
							(user) => user.last_order_date !== null
						).length
					}
					)
				</h3>
				<div className='overflow-x-auto mt-4'>
					<table className='table table-zebra w-full'>
						<thead>
							<tr>
								<th>ID</th>
								<th>First Name</th>
								<th>Last Name</th>
								<th>Email</th>
								<th>Phone</th>
								<th>Last Order Date</th>
							</tr>
						</thead>
						<tbody>
							{churnedUsers[0].churned_users
								?.filter(
									(user) => user.last_order_date !== null
								)
								.map((user) => (
									<tr key={user.user__id}>
										<td>{user.user__id}</td>
										<td>{user.user__first_name}</td>
										<td>{user.user__last_name}</td>
										<td>{user.user__email}</td>
										<td>{user.user__phone || 'N/A'}</td>
										<td>
											{user.last_order_date
												? format(
														new Date(
															user.last_order_date
														),
														'dd-MM-yyyy HH:mm:ss'
													)
												: 'N/A'}
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
				<div className='modal-action'>
					<button className='btn btn-secondary' onClick={onClose}>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default ChurnedUsersTableModal;
