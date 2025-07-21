import React, { useState } from 'react';
import { MdArrowUpward, MdArrowDownward } from 'react-icons/md';
import { useGetAccountDetailsQuery } from '../../redux/features/Account/accountApi';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import {
	useGetLocationsQuery,
	useGetRestaurentsQuery,
} from '../../redux/features/menuCreation/menuCreationApi';
import { format } from 'date-fns';
import { useAnalyticsQuery } from '../../redux/features/analytics/analyticsApi';

const TrafficAnalyticsHeader = () => {
	const { data: restaurantList, isLoading: restaurantListLoading } =
		useGetRestaurentsQuery();

	const restaurantId = restaurantList?.results[0]?.id || null;

	const { data: locationList, isLoading: locationListLoading } =
		useGetLocationsQuery(restaurantId, { skip: !restaurantId });

	const locationId = locationList?.results[0]?.id || null;

	const today = format(new Date(), 'yyyy-MM-dd');
	const yesterday = format(
		new Date(new Date().setDate(new Date().getDate() - 1)),
		'yyyy-MM-dd'
	);
	const lastWeekSameDay = format(
		new Date(new Date().setDate(new Date().getDate() - 7)),
		'yyyy-MM-dd'
	);
	const beforeLastWeekSameDay = format(
		new Date(new Date().setDate(new Date().getDate() - 8)),
		'yyyy-MM-dd'
	);

	console.log(lastWeekSameDay, beforeLastWeekSameDay, 'lastWeekSameDay');

	const { data: userData } = useGetAccountDetailsQuery();
	const [selectedRestaurant, setSelectedRestaurant] = useState('');
	const [selectedLocation, setSelectedLocation] = useState('');

	const { data: todayData, isLoading: isTodayDataLoading } =
		useAnalyticsQuery(
			restaurantId && locationId
				? {
						start: yesterday,
						end: today,
						restaurant: selectedRestaurant || restaurantId,
						location: selectedLocation
							? [selectedLocation]
							: [locationId],
					}
				: skipToken
		);

	const { data: lastWeekData, isLoading: isLastWeekDataLoading } =
		useAnalyticsQuery(
			restaurantId && locationId
				? {
						start: beforeLastWeekSameDay,
						end: lastWeekSameDay,
						restaurant: restaurantId,
						location: [locationId],
					}
				: skipToken
		);

	const todayTraffic = todayData?.do || 0;
	const lastWeekTraffic = lastWeekData?.do || 0;

	const calculatePercentageChange = (current, previous) => {
		if (!previous || previous === 0) return '0%';
		const change = ((current - previous) / previous) * 100;
		return `${change > 0 ? '+' : ''}${change.toFixed(2)}%`;
	};

	const changeFromLastWeek = calculatePercentageChange(
		todayTraffic,
		lastWeekTraffic
	);

	const isPositiveChange = parseFloat(changeFromLastWeek) > 0;

	const getTimeOfDay = () => {
		const hour = new Date().getHours();
		if (hour >= 5 && hour < 12) return 'Good Morning';
		if (hour >= 12 && hour < 17) return 'Good Afternoon';
		return 'Good Evening';
	};
	const lastWeekWeekName = format(new Date(lastWeekSameDay), 'EEEE');

	return (
		<div className='top-bar w-full bg-[#42C3FE] p-5 flex justify-between items-center text-white rounded-xl'>
			<div>
				<span>{getTimeOfDay()}</span>
				<h1 className='text-3xl font-medium'>
					{userData?.first_name || 'User'}
				</h1>
			</div>

			<div>
				<span className='font-bold'>Today's Unique Traffic</span>
				<h4 className='text-3xl font-bold py-3'>{todayTraffic}</h4>
				<p className='font-bold flex items-center'>
					<span
						className={`flex items-center px-2 py-1 rounded-full text-sm font-bold ${
							isPositiveChange ? 'bg-green-500' : 'bg-red-500'
						}`}
					>
						{isPositiveChange ? (
							<MdArrowUpward />
						) : (
							<MdArrowDownward />
						)}{' '}
						{changeFromLastWeek}
					</span>
					<span className='ml-2 text-sm'>
						From Last {lastWeekWeekName}
					</span>
				</p>
			</div>
		</div>
	);
};

export default TrafficAnalyticsHeader;
