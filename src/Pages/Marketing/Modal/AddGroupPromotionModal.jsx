import React, { useEffect, useRef, useState } from 'react';
import {
	useGetLocationsQuery,
	useGetRestaurentsQuery,
} from '../../../redux/features/menuCreation/menuCreationApi';
import {
	useAddGroupOrderingMutation,
	useUpdateGroupOrderingMutation,
} from '../../../redux/features/groupOrdering/groupOrderingApi';
import toast from 'react-hot-toast';
import { selectedGroupOrdering } from '../../../redux/features/groupOrdering/groupOrderingSlice';
import { useDispatch } from 'react-redux';
import groupOrdering from '../../../assets/campaign/groupOrdering.png';

const AddGroupPromotionModal = ({
	isEditing,
	groupOrderingDetails,
	setAddGroupPromotion,
}) => {
	const extractDate = (isoString) => {
		const dateObject = new Date(isoString);
		const options = { day: '2-digit', month: '2-digit', year: 'numeric' };

		const dayMonthYearArray = dateObject
			.toLocaleDateString(undefined, options)
			.split('/');
		const formattedDate = `${dayMonthYearArray[2]}-${dayMonthYearArray[0]}-${dayMonthYearArray[1]}`;

		return formattedDate;
	};

	const startDate = extractDate(
		groupOrderingDetails?.durations?.map((item) => item.start_date)
	);
	const endDate = extractDate(
		groupOrderingDetails?.durations?.map((item) => item.end_date)
	);

	const [promotion, setPromotion] = useState('');
	const [selectedRestaurants, setSelectedRestaurants] = useState('');
	const [selectedLocations, setSelectedLocations] = useState('');
	const [selectedRestaurantId, setSelectedRestaurantId] = useState();
	const [promotionName, setPromotionName] = useState('');
	const [selectedOption, setSelectedOption] = useState(''); // State to track the selected option
	const [isChecked, setIsChecked] = useState(false);
	const [dateRanges, setDateRanges] = useState([
		{ start_date: '', end_date: '' },
	]);
	const [promoOptions, setPromoOptions] = useState([
		{ people: '', discount: '' },
	]);

	const dispatch = useDispatch();

	useEffect(() => {
		if (isEditing) {
			setPromotionName(groupOrderingDetails?.name || '');
			setSelectedRestaurantId(groupOrderingDetails?.restaurant || '');
			setSelectedLocations(groupOrderingDetails?.location || '');
			setSelectedOption(groupOrderingDetails?.audience || '');
			setDateRanges([
				{
					start_date: startDate,
					end_date: endDate,
				},
			]);
			setPromoOptions(
				groupOrderingDetails?.promo_options || [
					{ people: '', discount: '' },
				]
			);
		} else {
			setPromotionName('');
			setSelectedRestaurants('');
			setSelectedLocations('');
			setSelectedOption('');
			setDateRanges([{ start_date: '', end_date: '' }]);
			setPromoOptions([{ people: '', discount: '' }]);
		}
	}, [isEditing, groupOrderingDetails]);

	const handleAddMore = (e) => {
		e.preventDefault();
		setDateRanges([...dateRanges, { start_date: '', end_date: '' }]);
	};

	const handleAddMorePromoOptions = (e) => {
		e.preventDefault();
		setPromoOptions([...promoOptions, { people: '', discount: '' }]);
	};

	const handlePromoOptionsChange = (index, field, value) => {
		setPromoOptions((prevOptions) => {
			const updatedPromoOptions = [...prevOptions];
			updatedPromoOptions[index] = {
				...updatedPromoOptions[index],
				[field]: value,
			};
			return updatedPromoOptions;
		});
	};

	const handleRemovePromoOptions = (index) => {
		const updatedPromoOptions = [...promoOptions];
		updatedPromoOptions.splice(index, 1);
		setPromoOptions(updatedPromoOptions);
	};

	const handleDateChange = (index, field, value) => {
		const updatedDateRanges = [...dateRanges];
		updatedDateRanges[index][field] = value;
		setDateRanges(updatedDateRanges);
	};
	const handleRemove = (index) => {
		const updatedDateRanges = [...dateRanges];
		updatedDateRanges.splice(index, 1);
		setDateRanges(updatedDateRanges);
	};

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
	};

	const handleOptionChange = (event) => {
		setSelectedOption(event.target.value); // Update the selected option when a radio button is clicked
	};

	const {
		data: restaurantList,
		isLoading: isRestaurantLoading,
		isError: isRestaurantError,
		error: restaurantError,
	} = useGetRestaurentsQuery();

	const handleRestaurantChange = (e) => {
		const selectedId = e.target.value;
		setSelectedRestaurants([...selectedRestaurants, selectedId]);

		// Update the selected restaurant ID
		setSelectedRestaurantId(selectedId);
	};

	const { data: locationList, isSuccess: isLocationSuccess } =
		useGetLocationsQuery(selectedRestaurantId);

	const handleLocationChange = (e) => {
		const selectedLocationId = e.target.value;
		setSelectedLocations(selectedLocationId);
	};

	const [createGroupOrdering, { isSuccess, isError }] =
		useAddGroupOrderingMutation();

	const [
		groupOrderingList,
		{
			isLoading: isGroupOrderingLoading,
			isSuccess: isGroupOrderingSuccess,
			isError: isGroupOrderingError,
		},
	] = useUpdateGroupOrderingMutation();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!promotionName) {
			toast.error('Please enter a promotion name');
			return;
		}
		if (!selectedRestaurantId) {
			toast.error('Please select a restaurant');
			return;
		}
		if (!selectedLocations) {
			toast.error('Please select a location');
			return;
		}
		if (!promoOptions[0]?.people) {
			toast.error('Please enter a number of people');
			return;
		}
		if (!promoOptions[0]?.discount) {
			toast.error('Please select a discount');
			return;
		}
		if (!selectedOption) {
			toast.error('Please select an audience');
			return;
		}
		if (!dateRanges[0]?.start_date) {
			toast.error('Please select a start date');
			return;
		}
		if (!dateRanges[0]?.end_date) {
			toast.error('Please select an end date');
			return;
		}

		const groupOrderingData = {
			name: promotionName,
			restaurant: selectedRestaurantId,
			location: selectedLocations,
			audience: selectedOption,
			durations: dateRanges,
			promo_options: promoOptions,
		};

		if (isEditing) {
			groupOrderingList({
				id: groupOrderingDetails.id,
				groupOrderingItem: groupOrderingData,
			});
		} else {
			createGroupOrdering(groupOrderingData);
		}

		// createGroupOrdering(groupOrderingData);
		// setAddGroupPromotion(false);
		// toast.success("Successfully created a group promotion");
	};

	useEffect(() => {
		if (isSuccess) {
			dispatch(
				selectedGroupOrdering({
					isEditing: false,
					groupOrderingDetails: {},
				})
			);
			setAddGroupPromotion(false);
			toast.success('Successfully created a group promotion');
		}
		if (isError) {
			toast.error('Something went wrong');
		}
		if (isGroupOrderingSuccess) {
			dispatch(
				selectedGroupOrdering({
					isEditing: false,
					groupOrderingDetails: {},
				})
			);
			setAddGroupPromotion(false);
			toast.success('Successfully updated the group promotion');
		}
		if (isGroupOrderingError) {
			toast.error('Something went wrong');
		}
	}, [isSuccess, isError, isGroupOrderingSuccess, isGroupOrderingError]);

	return (
		<>
			<input
				type='checkbox'
				id={
					isEditing
						? `add_group_${groupOrderingDetails.id}`
						: 'add_group_'
				}
				className='modal-toggle'
			/>
			<div className='modal'>
				<div className='modal-box w-11/12 max-w-2xl'>
					<h1 className='text-2xl mb-6 font-bold font-sans'>
						{isEditing ? 'Edit' : 'Add A'} Group Ordering Promotion
					</h1>
					<div className='flex justify-between gap-4'>
						<div className='w-[50%]'>
							<form onSubmit={handleSubmit}>
								<h1 className='font-bold mb-2'>
									Promotion Name
								</h1>
								<label>
									<span className='mb-1'>
										Set a Name for your promotion.
									</span>
									<input
										value={promotionName}
										onChange={(e) =>
											setPromotionName(e.target.value)
										}
										type='text'
										className='border border-[#DDE1E6] rounded-lg w-full p-2'
									/>
								</label>
								<h1 className='my-4 font-bold'>Restaurant</h1>
								<label>
									<span className='mb-1'>
										Select the restaurant and it’s location
										this offer.
									</span>
									<select
										onChange={handleRestaurantChange}
										name='restaurant'
										id=''
										className='border border-[#DDE1E6] rounded-lg w-full p-2'
									>
										<option selected>
											Select Restaurant
										</option>
										{restaurantList?.results?.map(
											(item, index) => (
												<option
													key={index}
													value={item.id}
													selected={
														groupOrderingDetails?.restaurant ===
														item.id
													}
												>
													{item.name}
												</option>
											)
										)}
									</select>
									<select
										onChange={handleLocationChange}
										name='location'
										id=''
										className='border border-[#DDE1E6] rounded-lg w-full p-2 mt-2'
									>
										<option selected>
											Select Location
										</option>
										{locationList?.results?.map(
											(item, index) => (
												<option
													key={index}
													value={item.id}
													selected={
														groupOrderingDetails?.location ===
														item.id
													}
												>
													{item.name}
												</option>
											)
										)}
									</select>
								</label>
								<h1 className='my-4 font-bold'>Promotion</h1>
								<label>
									<span className='mb-1'>
										Set offer for different number of
										groups.
									</span>
									{promoOptions?.map((promoOption, index) => (
										<div
											className='flex items-center'
											key={index}
										>
											<input
												type='text'
												className='border border-[#DDE1E6] rounded-lg w-full p-2 mt-2 mr-2'
												value={promoOption.people}
												onChange={(e) =>
													handlePromoOptionsChange(
														index,
														'people',
														e.target.value
													)
												}
											/>
											<label className='mr-2'>
												People
											</label>
											<select
												value={promoOption.discount}
												onChange={(e) =>
													handlePromoOptionsChange(
														index,
														'discount',
														e.target.value
													)
												}
												name=''
												id=''
												className='border border-[#DDE1E6] rounded-lg w-full p-2 mt-2 mr-2'
											>
												<option selected>Select</option>
												<option value='10'>10%</option>
												<option value='20'>20%</option>
												<option value='30'>30%</option>
												<option value='40'>40%</option>
												<option value='50'>50%</option>
											</select>
											<label className='mr-2'>
												Discount
											</label>
											{index > 0 && ( // Only show Remove button for extra date fields
												<button
													type='button'
													className='text-red-500 ml-2'
													onClick={() =>
														handleRemovePromoOptions(
															index
														)
													}
												>
													Remove
												</button>
											)}
										</div>
									))}
									<button
										onClick={handleAddMorePromoOptions}
										className='bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2'
									>
										+ Add More
									</button>
								</label>
								<h1 className='my-4 font-bold'>Audience</h1>
								<label>
									<span className=''>
										Select which customers will see your
										offer.
									</span>

									<div className='flex items-center mb-4'>
										<input
											id='default-radio-1'
											type='radio'
											value='all'
											name='default-radio'
											className='w-4 h-4 text-[#42C2FF]'
											onChange={handleOptionChange}
											checked={selectedOption === 'all'}
										/>
										<label
											htmlFor='default-radio-1'
											className='ml-2 font-medium'
										>
											All customers
										</label>
									</div>

									<div className='flex items-center'>
										<input
											id='default-radio-2'
											type='radio'
											value='members'
											name='default-radio'
											className='w-4 h-4 text-[#42C2FF]'
											onChange={handleOptionChange}
											checked={
												selectedOption === 'members'
											}
										/>
										<label
											htmlFor='default-radio-2'
											className='ml-2 font-medium'
										>
											Members Only
										</label>
									</div>
								</label>
								<h1 className='my-4 font-bold'>Duration</h1>
								<label>
									<span>
										Select the dates your offer will run
										for.
									</span>
									{dateRanges.map((dateRange, index) => (
										<div className='flex' key={index}>
											<input
												type='date'
												className='border border-[#DDE1E6] rounded-lg w-full p-2 mt-2 mr-4'
												// value={dateRange.start_date}
												onChange={(e) =>
													handleDateChange(
														index,
														'start_date',
														e.target.value
													)
												}
												defaultValue={
													dateRange.start_date
												}
											/>
											<input
												type='date'
												className='border border-[#DDE1E6] rounded-lg w-full p-2 mt-2'
												// value={date  Range.end_date}
												onChange={(e) =>
													handleDateChange(
														index,
														'end_date',
														e.target.value
													)
												}
												defaultValue={
													dateRange.end_date
												}
											/>
											{index > 0 && ( // Only show Remove button for extra date fields
												<button
													type='button'
													className='text-red-500 ml-2'
													onClick={() =>
														handleRemove(index)
													}
												>
													Remove
												</button>
											)}
										</div>
									))}
									<button
										onClick={handleAddMore}
										className='bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2'
									>
										+ Add More
									</button>
								</label>
								<div className='flex my-4'>
									<input
										type='checkbox'
										className='mr-3 text-[#42C2FF]'
										onClick={handleCheckboxChange}
									/>
									<label className='text-[#42C2FF]'>
										I agree to the Terms and Conditions
									</label>
								</div>
								<button
									type='submit'
									className={`bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2 ${
										isChecked
											? ''
											: 'disabled:opacity-50 cursor-not-allowed'
									}`}
									disabled={
										!isChecked ||
										isGroupOrderingLoading ||
										isGroupOrderingSuccess
									}
								>
									{isEditing
										? 'Save Changes'
										: ' + Create this Promotion'}
								</button>
							</form>
						</div>
						<div className='w-[50%]'>
							<h1 className='font-bold mb-2'>Offer Preview</h1>
							<div className='relative'>
								<img
									src={groupOrdering}
									alt=''
									className='w-80 h-41 object-cover rounded relative'
								/>
								<p className=' absolute top-0 left-1 text-white capitalize -mt-[2px] tracking-tighter'>
									{promotionName}
								</p>
								<p className=' absolute right-1 bottom-0 text-white capitalize tracking-tighter'>
									Get up to{' '}
									{promoOptions?.map((p) => {
										return p?.discount;
									})}
									% OFF
								</p>
							</div>
						</div>
					</div>
				</div>
				<label
					onClick={() => {
						// setAddGroupPromotion(false);
						dispatch(
							selectedGroupOrdering({
								isEditing: false,
								groupOrderingDetails: {},
							})
						);
					}}
					className='modal-backdrop'
					htmlFor={
						isEditing
							? `add_group_${groupOrderingDetails?.id}`
							: 'add_group_'
					}
				>
					Close
				</label>
			</div>
		</>
	);
};

export default AddGroupPromotionModal;
