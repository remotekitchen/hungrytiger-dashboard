import React, { useState } from 'react';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useAnalyticsQuery } from '../../redux/features/analytics/analyticsApi';
import {
	useGetLocationsQuery,
	useGetRestaurentsQuery,
} from '../../redux/features/menuCreation/menuCreationApi';
import CustomeOverview from './CustomeOverview';
import FunnelChartContainer from './FunnelChartContainer';
import KeyMetrics from './KeyMetrics';
import SourceAndBounceRate from './SourceAndBounceRate';
import TrafficAnalyticsHeader from './TrafficAnalyticsHeader';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TrafficAnalytics = () => {
	const {
		data: restaurantList,
		isLoading: restaurantListLoading,
		isError: isRestaurantListError,
	} = useGetRestaurentsQuery();

	const restaurantId = restaurantList?.results[0]?.id;

	const {
		data: locationList,
		isLoading: isLocationLoading,
		isError: isLocationError,
	} = useGetLocationsQuery(restaurantId, { skip: !restaurantId });

	const locationId = locationList?.results[0]?.id;
	// Get today's date
	const today = format(new Date(), 'yyyy-MM-dd');
	const yesterday = format(
		new Date(new Date().setDate(new Date().getDate() - 1)),
		'yyyy-MM-dd'
	);

	// State for selected restaurant, location, and date range
	const [selectedRestaurant, setSelectedRestaurant] = useState('');
	const [selectedLocation, setSelectedLocation] = useState('');
	const [selectedDateRange, setSelectedDateRange] = useState('Today');
	const [customDateRange, setCustomDateRange] = useState([yesterday, today]);

	// Calculate date ranges based on the selected filter
	const getDateRange = () => {
		switch (selectedDateRange) {
			case 'Today':
				return { start: yesterday, end: today };
			case 'Last 7 days':
				return {
					start: format(
						new Date(new Date().setDate(new Date().getDate() - 7)),
						'yyyy-MM-dd'
					),
					end: today,
				};
			case 'Last one month':
				return {
					start: format(
						new Date(
							new Date().setMonth(new Date().getMonth() - 1)
						),
						'yyyy-MM-dd'
					),
					end: today,
				};
			case 'Custom':
				if (customDateRange[0] && customDateRange[1]) {
					return {
						start: format(customDateRange[0], 'yyyy-MM-dd'),
						end: format(customDateRange[1], 'yyyy-MM-dd'),
					};
				} else {
					// Handle the case where customDateRange is invalid
					return { start: today, end: today };
				}
			default:
				return { start: today, end: today };
		}
	};

	const getComparisonDateRange = () => {
		const { start, end } = getDateRange();

		const startDate = new Date(start);
		const endDate = new Date(end);

		const diff = Math.abs(endDate - startDate); // Duration of the range
		const prevStartDate = new Date(startDate.getTime() - diff - 86400000);
		const prevEndDate = new Date(startDate.getTime() - 86400000);

		return {
			start: format(prevStartDate, 'yyyy-MM-dd'),
			end: format(prevEndDate, 'yyyy-MM-dd'),
		};
	};

	const { start: rangeStart, end: rangeEnd } = getDateRange();
	const { start: prevRangeStart, end: prevRangeEnd } =
		getComparisonDateRange();

	// Fetch data for the selected period and the previous period
	const {
		data: currentData,
		isLoading: isCurrentLoading,
		isError: isCurrentError,
	} = useAnalyticsQuery(
		restaurantId && locationId
			? {
					start: rangeStart,
					end: rangeEnd,
					restaurant: selectedRestaurant || restaurantId,
					location: selectedLocation
						? [selectedLocation]
						: [locationId],
			  }
			: skipToken
	);

	const {
		data: previousData,
		isLoading: isPreviousLoading,
		isError: isPreviousError,
	} = useAnalyticsQuery(
		restaurantId && locationId
			? {
					start: prevRangeStart,
					end: prevRangeEnd,
					restaurant: selectedRestaurant || restaurantId,
					location: selectedLocation
						? [selectedLocation]
						: [locationId],
			  }
			: skipToken
	);

	// Calculate the view rate comparison
	const viewRate =
		currentData?.do && previousData?.do
			? ((currentData.do - previousData.do) / previousData.do) * 100
			: null;
	console.log(viewRate, 'viewRate');
	return (
		<section className='w-full h-full px-5'>
			<h1 className='text-2xl font-bold mt-5 mb-10'>
				Traffic Analytics Dashboard
			</h1>
			{/* top bar */}
			<TrafficAnalyticsHeader
				selectedDateRange={selectedDateRange}
				customDateRange={customDateRange}
				restaurantId={restaurantId}
				locationId={locationId}
				selectedLocation={selectedLocation}
				selectedRestaurant={selectedRestaurant}
			/>

			{/* chart-area */}
			<div className='chart-area w-full h-full my-5'>
				<FunnelChartContainer
					setSelectedLocation={setSelectedLocation}
					selectedLocation={selectedLocation}
					locationList={locationList}
					setSelectedRestaurant={setSelectedRestaurant}
					selectedRestaurant={selectedRestaurant}
					restaurantList={restaurantList}
					setSelectedDateRange={setSelectedDateRange}
					selectedDateRange={selectedDateRange}
					setCustomDateRange={setCustomDateRange}
					customDateRange={customDateRange}
					traffic={currentData}
					viewRate={viewRate}
				/>

				<div className='p-5 w-full border-2 border-gray-300 rounded-xl my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 justify-center'>
					{/* Bounce Rate */}
					{/* <SourceAndBounceRate
						sourceCustomer={currentData?.new_customers_by_source}
					/> */}
					{/* Key metrics */}
					<KeyMetrics
						uniquePageViews={currentData?.unique_viewers}
						newRegistered={currentData?.new_users}
						churnedUsers={currentData?.churned_customers}
						repeatCustomers={currentData?.repeat_customers}
					/>
					{/* Top customer / current active user */}
					<CustomeOverview
						topCustomers={currentData?.top_customers}
					/>
				</div>
			</div>
		</section>
	);
};

export default TrafficAnalytics;
