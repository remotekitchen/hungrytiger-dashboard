import React from 'react';
import AdditionalConditions from './AdditionalConditions';

const RewardsCondition = ({
	setIsDeliverySelected,
	setIsPickupSelected,
	setIsDineInSelected,
	isDeliverySelected,
	isPickupSelected,
	isDineInSelected,
	renderAdditionalComponents,
	setSelectedAdditionalCondition,
	selectedAdditionalCondition,
	timeOfDayStartTime,
	setTimeOfDayStartTime,
	timeOfDayEndTime,
	setTimeOfDayEndTime,
	itemInCartOrTimeOfDay,
	setItemInCartOrTimeOfDay,
	setAdditionalItems,
	menuItems,
	page,
	setPage,
	setGetSearchInput,
}) => {
	return (
		<div className='my-4'>
			<h2 className='font-bold'>Conditions</h2>
			<h6>Applies for:</h6>
			<div className='form-control'>
				<label className='label cursor-pointer items-center space-x-2 justify-start'>
					<input
						type='checkbox'
						className='checkbox checkbox-primary'
						checked={isDeliverySelected}
						onChange={() =>
							setIsDeliverySelected(!isDeliverySelected)
						}
					/>
					<span className='label-text my-0'>Delivery</span>
				</label>
			</div>
			<div className='form-control'>
				<label className='label cursor-pointer items-center space-x-2 justify-start'>
					<input
						type='checkbox'
						className='checkbox checkbox-primary'
						checked={isPickupSelected}
						onChange={() => setIsPickupSelected(!isPickupSelected)}
					/>
					<span className='label-text my-0'>Pickup</span>
				</label>
			</div>
			<div className='form-control'>
				<label className='label cursor-pointer items-center space-x-2 justify-start'>
					<input
						type='checkbox'
						className='checkbox checkbox-primary'
						checked={isDineInSelected}
						onChange={() => setIsDineInSelected(!isDineInSelected)}
					/>
					<span className='label-text my-0'>Dine-in</span>
				</label>
			</div>

			{/* addtional conditions */}
			<AdditionalConditions
				renderAdditionalComponents={renderAdditionalComponents}
				setSelectedAdditionalCondition={setSelectedAdditionalCondition}
				selectedAdditionalCondition={selectedAdditionalCondition}
				itemInCartOrTimeOfDay={itemInCartOrTimeOfDay}
				setItemInCartOrTimeOfDay={setItemInCartOrTimeOfDay}
				timeOfDayStartTime={timeOfDayStartTime}
				setTimeOfDayStartTime={setTimeOfDayStartTime}
				timeOfDayEndTime={timeOfDayEndTime}
				setTimeOfDayEndTime={setTimeOfDayEndTime}
				setAdditionalItems={setAdditionalItems}
				menuItems={menuItems}
				page={page}
				setPage={setPage}
				setGetSearchInput={setGetSearchInput}
			/>
		</div>
	);
};

export default RewardsCondition;
