import React, { useState } from 'react';
import { useGetRewardsGroupQuery } from '../../../redux/features/Rewards/rewardsApi';
import SingleRewardInfinity from './SingleRewardInfinity';

const AddFissionCampaign = ({
	selectedRestaurant,
	setSelectedRestaurant,
	restaurantList,
	prizes,
	handlePrizeSelect,
	allCampaigns,
	setPrizes,
}) => {
	const [page, setPage] = useState(1);
	const {
		data: rewardData,
		isError,
		isLoading,
	} = useGetRewardsGroupQuery(page);
	// // console.log("🚀 ~ rewardDataaaaaaaaaaaaaaaaaaaa:", rewardData);
	const [singleReward, setSingleReward] = useState([]);

	// console.log("🚀 ~ rewardDataaaaaaaaaaaaaaa:", rewardData);
	// console.log("🚀 ~ prizesssssssssssss:", prizes);
	// remove prize data
	const removePrize = (index) => {
		const newPrizes = [...prizes];
		newPrizes.splice(index, 1);
		setPrizes(newPrizes);
	};

	return (
		<>
			<div className=''>
				{/* restaurant */}
				{prizes?.map((prize, index) => (
					<div key={index}>
						<div className='flex justify-between items-center'>
							<h1 className='text-xl font-bold mb-2'>
								Prize {index + 1}
							</h1>
							{/* delete prize  */}
							<span
								onClick={() => removePrize(index)}
								className='text-2xl px-2 bg-gray-300 rounded cursor-pointer'
							>
								X
							</span>
						</div>
						{/* Render select and input elements here, each bound to prize[index] */}
						{/* Example for select element */}
						<label className='font-bold' htmlFor='select-reward'>
							Select Reward
						</label>

						<p>
							<span className='px-2 py-[1px] bg-gray-300 rounded-xl'>
								{
									rewardData?.results?.find(
										(data) =>
											data?.id === prize?.reward_group
									)?.name
								}
							</span>
						</p>

						{/* <div className="flex gap-4 px-4 mt-1">
              <select
                name="reward_name"
                className="border border-[rgb(221,225,230)] rounded-lg w-full p-2"
                value={prize.reward_group}
                onChange={(e) =>
                  handlePrizeSelect(
                    index,
                    "reward_group",
                    parseInt(e.target.value)
                  )
                }
              >
                <option selected disabled>
                  Select Reward
                </option>
                {rewardData?.results?.map((rewards) => (
                  <option key={rewards?.id} value={parseInt(rewards?.id)}>
                    {rewards?.name}
                  </option>
                ))}
              </select>
            </div> */}

						{/* infinity  */}

						<SingleRewardInfinity
							page={page}
							setPage={setPage}
							loadItems={rewardData}
							isMultiSelect={false}
							handlePrizeSelect={handlePrizeSelect}
							index={index}
							defaultValue={prize?.reward_group}
							setPromotion={setSingleReward}
						/>

						{/* infinity  */}

						<div className='flex gap-4 mt-5 items-center py-4'>
							<label className='text-lg pl-4 mb-2'>
								Probability
							</label>
							<input
								name='probability'
								value={prize?.probability}
								onChange={(e) =>
									handlePrizeSelect(
										index,
										'probability',
										parseFloat(e.target.value)
									)
								}
								type='number'
								className='border border-[#DDE1E6] rounded-lg p-2'
								placeholder='Percentage %'
							/>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default AddFissionCampaign;
