import { useState } from 'react';
import {
	useGetOrderQuery,
	useGetOrdersQuery,
} from '../../../../../redux/features/orders/ordersApi';
import Loading from '../../../../../Components/Loading';
import PickupAndDeliveryRow from './PickupAndDeliveryRow';
import {
	useGetLocationsQuery,
	useGetRestaurentsQuery,
} from '../../../../../redux/features/menuCreation/menuCreationApi';

const PickupAndDelivery = () => {
	const [orderStatus, setOrderStatus] = useState('');
	const [search, setSearch] = useState('');

	const [selectedRestaurant, setSelectedRestaurant] = useState('');
	const [selectedLocation, setSelectedLocation] = useState('');

	/* Added by adnan filtering */

	const {
		data: restaurentList,
		isLoading: restaurantListLoading,
		isError: isRestaurantListError,
		error: restaurantListError,
	} = useGetRestaurentsQuery();

	let optionContent;
	if (restaurantListLoading) optionContent = <option>Loading...</option>;
	else if (isRestaurantListError)
		optionContent = (
			<option>Something went wrong loading the restaurent</option>
		);
	else if (restaurentList.results.length === 0)
		optionContent = <option>No restaurent available right now</option>;
	else
		optionContent = restaurentList.results.map((item) => (
			<option value={item.id} key={item.id}>
				{item?.name}
			</option>
		));
	// to get the locations for that restaurant
	const {
		data: locationList,
		isLoading: isLocationLoading,
		isError: isLocationError,
		error: locationError,
	} = useGetLocationsQuery(selectedRestaurant);
	let optionLocationContent;
	if (isLocationLoading) optionLocationContent = <option>Loading...</option>;
	else if (isLocationError)
		optionLocationContent = (
			<option>Something went wrong loading the locations</option>
		);
	else if (locationList.results.length === 0)
		optionLocationContent = (
			<option>No location available right now</option>
		);
	else {
		optionLocationContent = locationList.results.map((item) => (
			<>
				<option value={item.id}>{item.name}</option>
			</>
		));
	}

	const restaurantId = selectedRestaurant;
	const locationId = selectedLocation;

	const {
		data: singleOrder,
		isLoading,
		isError,
	} = useGetOrderQuery({ restaurantId, locationId });

	/* end */

	let displayableContent;
	if (isLoading) displayableContent = <Loading />;
	else if (isError)
		displayableContent = (
			<option>Something went wrong loading the orders</option>
		);
	else if (singleOrder?.result?.length === 0)
		displayableContent = <option>No orders available right now</option>;
	else
		displayableContent = (
			<>
				{singleOrder?.results?.map((order) => (
					<PickupAndDeliveryRow order={order} key={order.id} />
				))}
			</>
		);
	return (
		<div className='p-5'>
			<h1 className='text-4xl font-bold text-gray-600 mb-7'>
				Pickup And Delivery
			</h1>
			<div className='my-4 flex flex-row justify-between items-center'>
				<div>
					<select
						onChange={(e) => setSelectedRestaurant(e.target.value)}
						className='select select-bordered w-48 max-w-xs'
					>
						<option disabled selected>
							Select restaurant
						</option>
						{optionContent}
					</select>

					<select
						onChange={(e) => setSelectedLocation(e.target.value)}
						className='select select-bordered w-48 max-w-xs ms-2'
						disabled={!selectedRestaurant}
					>
						<option>Select Location</option>
						{optionLocationContent}
					</select>
				</div>
			</div>

			{locationId ? (
				<div className='overflow-x-auto' style={{ maxWidth: '100%' }}>
					{singleOrder?.results?.length > 0 ? (
						<table className='table w-full'>
							<thead>
								<tr>
									<th>Order ID</th>
									<th>Name/Address</th>
									<th>Phone Number</th>
									<th>Subtotal</th>
									<th>Order Status</th>
									<th>Order Action</th>
								</tr>
							</thead>
							<tbody>{displayableContent}</tbody>
						</table>
					) : (
						<p>No orders found.</p>
					)}
				</div>
			) : (
				<h1 className='text-xl'>
					Please Select Restaurant and Location for Checking the Order
				</h1>
			)}
		</div>
	);
};

export default PickupAndDelivery;
