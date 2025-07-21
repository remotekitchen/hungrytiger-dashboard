import React, { useState, useEffect } from 'react';
import {
	useGetLocationsQuery,
	useGetRestaurentsQuery,
} from '../../../redux/features/menuCreation/menuCreationApi';

const RestaurantLocationSelector = ({
	selectedRestaurant,
	setSelectedRestaurant,
	selectedLocation,
	setSelectedLocation,
}) => {
	const {
		data: restaurantList,
		isLoading: restaurantListLoading,
		isError: restaurantListError,
	} = useGetRestaurentsQuery();

	const {
		data: locationList,
		isLoading: locationListLoading,
		isError: locationListError,
	} = useGetLocationsQuery(selectedRestaurant);

	console.log(
		restaurantList,
		locationList,
		selectedRestaurant,
		selectedLocation,
		'location123'
	);

	useEffect(() => {
		if (!selectedRestaurant && restaurantList?.results?.length > 0) {
			setSelectedRestaurant(restaurantList.results[0].id); // Set first restaurant as default
		}
	}, [restaurantList, selectedRestaurant, setSelectedRestaurant]);

	useEffect(() => {
		if (selectedRestaurant && locationList?.results?.length > 0) {
			setSelectedLocation(locationList.results[0].id); // Set first location as default
		}
	}, [locationList, selectedRestaurant, setSelectedLocation]);

	useEffect(() => {
		// Set the default location to the first in the list when restaurant changes
		if (selectedRestaurant && locationList?.results?.length > 0) {
			console.log('renderd');
			setSelectedLocation(locationList.results[0].id);
			console.log(locationList.results[0].id, 'location1234');
		}
	}, [locationList, selectedRestaurant, setSelectedLocation]);

	console.log(
		restaurantList,
		locationList,
		selectedRestaurant,
		selectedLocation,
		'location123'
	);

	if (restaurantListLoading || locationListLoading) {
		return <p>Loading...</p>;
	}

	if (restaurantListError || locationListError) {
		return <p>Error loading data.</p>;
	}

	return (
		<div>
			<h2 className='mb-5'>Select Restaurant and Location</h2>
			{/* Restaurant Dropdown */}
			<div className='flex gap-10'>
				<div style={{ marginBottom: '15px' }}>
					<label htmlFor='restaurant-select'>Select Restaurant</label>
					<select
						id='restaurant-select'
						value={selectedRestaurant}
						onChange={(e) => setSelectedRestaurant(e.target.value)}
						style={{
							width: '100%',
							padding: '10px',
							marginTop: '5px',
						}}
					>
						<option value=''>-- Choose a restaurant --</option>
						{restaurantList?.results.map((restaurant) => (
							<option key={restaurant.id} value={restaurant.id}>
								{restaurant.name}
							</option>
						))}
					</select>
				</div>

				{/* Location Dropdown */}
				<div>
					<label htmlFor='location-select'>Select Location</label>
					<select
						id='location-select'
						value={selectedLocation}
						onChange={(e) => setSelectedLocation(e.target.value)}
						disabled={
							!selectedRestaurant ||
							locationList?.results.length === 0
						}
						style={{
							width: '100%',
							padding: '10px',
							marginTop: '5px',
						}}
					>
						<option value=''>-- Choose a location --</option>
						{locationList?.results.map((location) => (
							<option key={location.id} value={location.id}>
								{location.details}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
};

export default RestaurantLocationSelector;
