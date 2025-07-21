import React from 'react';
import MultiCustomSelect from '../../../../../Components/MultiCustomSelect';

const RewardAdditionalCondition = ({
	page,
	setPage,
	loadItems,
	setPromotion,
	setGetSearchInput,
	handleSelectChange,
	formData,
	handleConditionChange,
}) => {
	const condition = formData?.additionalcondition_set[0];

	return (
		<div>
			<div className='form-control w-full'>
				<label className='label' htmlFor='additional_info'>
					<span className='label-text'>Please select an option</span>
				</label>
				<select
					name='additional_info'
					required
					id='additional_info'
					className='select select-bordered w-full'
					onChange={handleSelectChange}
					value={condition?.condition_type || ''}
				>
					<option disabled value=''>
						Please select an option (Time of day, Specific item in
						cart, Minimum order amount)
					</option>

					<option value='minimum_amount' name='minimum_amount'>
						Minimum order amount
					</option>
					<option value='time_of_day' name='time_of_day'>
						Time of Day
					</option>
					<option
						value='specific_item_in_cart'
						name='specific_item_in_cart'
					>
						Specific item in cart
					</option>
				</select>

				{/* Conditionally render fields based on the selected option */}
				{condition?.condition_type === 'specific_item_in_cart' && (
					<div className='my-3 w-4/5'>
						<MultiCustomSelect
							page={page}
							setPage={setPage}
							loadItems={loadItems}
							setPromotion={setPromotion}
							setGetSearchInput={setGetSearchInput}
						/>
					</div>
				)}

				{condition?.condition_type === 'minimum_amount' && (
					<div className='flex items-center my-3'>
						<input
							type='number'
							placeholder='50'
							className='input input-bordered me-2 w-28'
							value={condition?.amount || ''}
							onChange={(e) =>
								handleConditionChange('amount', e.target.value)
							}
						/>
						<span>$</span>
					</div>
				)}

				{condition?.condition_type === 'time_of_day' && (
					<div className='flex items-center my-3 gap-3'>
						<input
							type='time'
							className='input input-bordered me-2 w-36'
							value={condition?.start_time || ''}
							onChange={(e) =>
								handleConditionChange(
									'start_time',
									e.target.value
								)
							}
						/>
						<input
							type='time'
							className='input input-bordered me-2 w-36'
							value={condition?.end_time || ''}
							onChange={(e) =>
								handleConditionChange(
									'end_time',
									e.target.value
								)
							}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default RewardAdditionalCondition;
