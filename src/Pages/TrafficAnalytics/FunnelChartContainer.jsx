import React from 'react';
import FunnelChart from './FunnelChart';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FunnelChartContainer = ({
	setSelectedLocation,
	setSelectedRestaurant,
	setSelectedDateRange,
	setCustomDateRange,
	selectedLocation,
	selectedRestaurant,
	selectedDateRange,
	customDateRange,
	restaurantList,
	locationList,
	traffic,
	viewRate,
}) => {
	console.log(customDateRange, 'customDateRange');
	return (
		<div className='w-full border-2 border-gray-300 rounded-xl'>
			{/* Select field */}
			<div className='flex justify-end items-center p-3'>
				<div className='flex items-center gap-3'>
					<select
						value={selectedLocation}
						onChange={(e) => setSelectedLocation(e.target.value)}
						className='select select-bordered w-full max-w-xs'
					>
						<option disabled selected>
							Select Locations
						</option>
						{locationList?.results?.map((location) => (
							<option key={location.id} value={location.id}>
								{location.details}
							</option>
						))}
					</select>
					<select
						value={selectedRestaurant}
						onChange={(e) => setSelectedRestaurant(e.target.value)}
						className='select select-bordered w-full max-w-xs'
					>
						<option disabled selected>
							Select Restaurant
						</option>
						{restaurantList?.results?.map((restaurant) => (
							<option key={restaurant.id} value={restaurant.id}>
								{restaurant.name}
							</option>
						))}
					</select>
					<select
						className='select select-bordered w-full max-w-xs'
						value={selectedDateRange}
						onChange={(e) => setSelectedDateRange(e.target.value)}
					>
						<option value='Today'>Today</option>
						<option value='Last 7 days'>Last 7 days</option>
						<option value='Last one month'>Last one month</option>
						<option value='Custom'>Custom Date Range</option>
					</select>
				</div>
			</div>

			{/* Custom Date Range Picker */}
			{selectedDateRange === 'Custom' && (
				<div className='flex justify-end items-center p-3'>
					<DatePicker
						selectsRange
						startDate={customDateRange[0] || null}
						endDate={customDateRange[1] || null}
						onChange={(dates) => {
							const [start, end] = dates || [];
							if (start && end) {
								setCustomDateRange(dates);
							} else {
								setCustomDateRange([
									start || null,
									end || null,
								]);
							}
						}}
						isClearable
						className='border border-gray-300 rounded-lg p-2'
						placeholderText='Select custom date range'
					/>
				</div>
			)}

			{/* Chart */}
			<div className='w-full grid grid-cols-12 p-3'>
				<div className='col-span-8'>
					<FunnelChart traffic={traffic} />
				</div>
				<div className='col-span-4 pl-3'>
					<p className='flex gap-16 font-bold items-center my-10'>
						<span className='w-6 h-6 inline-block bg-[#AAD2E8] rounded-full'></span>
						View Rate: {viewRate?.toFixed(2)}%
					</p>
					<p className='flex gap-16 font-bold items-center my-10'>
						<span className='w-6 h-6 inline-block bg-[#6DB1E3] rounded-full'></span>
						Cart Addition Rate: {traffic?.cart_addition_rate}%
					</p>
					<p className='flex gap-16 font-bold items-center my-10'>
						<span className='w-6 h-6 inline-block bg-[#3380B9] rounded-full'></span>
						Order Confirmation Rate:{' '}
						{traffic?.order_confirmation_rate}%
					</p>
					<p className='flex gap-16 font-bold items-center my-10'>
						<span className='w-6 h-6 inline-block bg-[#315C84] rounded-full'></span>
						Payment Confirmation Rate:{' '}
						{traffic?.payment_confirmation_rate}%
					</p>
				</div>
			</div>
		</div>
	);
};

export default FunnelChartContainer;
