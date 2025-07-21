import React, { useEffect, useRef, useState } from 'react'
import { selectedLoyaltyProgram } from '../../../redux/features/loyaltyProgram/loyaltyProgramSlice';
import { useDispatch } from 'react-redux';
import { useGetRestaurentsQuery } from '../../../redux/features/menuCreation/menuCreationApi';
import { useAddLoyaltyProgramMutation, useUpdateLoyaltyProgramMutation } from '../../../redux/features/loyaltyProgram/loyaltyProgramApi';
import toast from 'react-hot-toast';

const AddLoyaltyProgramModal = ({
    isEditing,
    loyaltyProgramDetails,
    addLoyaltyProgram,
    setAddLoyaltyProgram,
}) => {
    const dispatch = useDispatch();
    const [selectedRestaurants, setSelectedRestaurants] = useState();
    const [days, setDays] = useState("");
    const [isCampaignEnabled, setIsCampaignEnabled] = useState();
    const [isDeliveryYes, setIsDeliveryYes] = useState();
    const [rewardType, setRewardType] = useState("");
    const [order, setOrder] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        if (isEditing) {
            setSelectedRestaurants(loyaltyProgramDetails.restaurant);
            setDays(loyaltyProgramDetails.validity_days);
            setIsCampaignEnabled(loyaltyProgramDetails.is_enabled);
            setIsDeliveryYes(loyaltyProgramDetails.covers_delivery_fees);
            setRewardType(loyaltyProgramDetails.reward_type);
            setOrder(loyaltyProgramDetails.min_orders);
            setName(loyaltyProgramDetails.name)
        } else {
            setSelectedRestaurants("");
            setDays("");
            setIsCampaignEnabled(true);
            setIsDeliveryYes(true);
            setRewardType("");
            setOrder("");
            setName("")
        }
    }, [isEditing, loyaltyProgramDetails])

    const toggleCampaignStatus = () => {
        setIsCampaignEnabled(!isCampaignEnabled);
    };

    const toggleDeliveryStatus = () => {
        setIsDeliveryYes(!isDeliveryYes);
    }

    const {
        data: restaurantList,
        isLoading: isRestaurantLoading,
        isError: isRestaurantError,
        error: restaurantError,
    } = useGetRestaurentsQuery();

    const handleRestaurantChange = (e) => {
        const selectedId = e.target.value;
        setSelectedRestaurants(selectedId);

        // Update the selected restaurant ID
        // setSelectedRestaurantId(selectedId);
    };

    const [createLoyaltyProgram, { isSuccess, isError }] = useAddLoyaltyProgramMutation();

    const [updateLoyaltyProgram, {
        isSuccess: isLoyaltyProgramSuccess,
        isLoading: isLoyaltyProgramLoading,
        isError: isLoyaltyProgramError,
    }] = useUpdateLoyaltyProgramMutation();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name) {
            toast.error("Please enter a name");
            return;
        }
        if (!selectedRestaurants) {
            toast.error("Please select a restaurant");
            return;
        }
        if (!days) {
            toast.error("Please enter a validity days");
            return;
        }
        if (!order) {
            toast.error("Please enter a order");
            return;
        }
        if (!rewardType) {
            toast.error("Please enter a reward type");
            return;
        }      

        const loyaltyProgramData = {
            restaurant: selectedRestaurants,
            validity_days: days,
            is_enabled: isCampaignEnabled,
            covers_delivery_fees: isDeliveryYes,
            reward_type: rewardType,
            min_orders: order,
            name: name,
        };

        if (isEditing) {
            updateLoyaltyProgram({
                id: loyaltyProgramDetails.id,
                loyaltyProgramItem: loyaltyProgramData,
            })
        } else {
            createLoyaltyProgram(loyaltyProgramData);
        }
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(
                selectedLoyaltyProgram({
                    isEditing: false,
                    loyaltyProgramDetails: {},
                })
            );
            setAddLoyaltyProgram(false);
            toast.success("Successfully added a loyalty program");
        }
        if (isError) {
            toast.error("Something went wrong");
        }
        if (isLoyaltyProgramSuccess) {
            dispatch(
                selectedLoyaltyProgram({
                    isEditing: false,
                    loyaltyProgramDetails: {},
                })
            );
            setAddLoyaltyProgram(false);
            toast.success("Successfully updated the loyalty program");
        }
        if (isLoyaltyProgramError) {
            toast.error("Something went wrong");
        }
    }, [isSuccess, isError, isLoyaltyProgramSuccess, isLoyaltyProgramError]);


    return (
        <>
            <input
                type="checkbox"
                id={
                    isEditing
                        ? `add_loyaltyProgram_${loyaltyProgramDetails.id}`
                        : "add_loyaltyProgram_"
                }
                className="modal-toggle"
            />
            <div className="modal">
                <div className="modal-box">
                    <h1 className="text-2xl mb-6 font-bold font-sans">
                        {isEditing ? "Edit" : "Add A"} Loyalty Program
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span className='my-2 font-bold'>Name</span>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className='border border-[#DDE1E6] rounded-lg w-full p-2 mt-2 ' />
                        </label>
                        <label>
                            <div className='my-2 font-bold'>Campaign Status</div>
                            <div className='flex items-center gap-3 my-2'>
                                {isCampaignEnabled ? (
                                    <span className='text-green-500'>Enable</span>
                                ) : (
                                    <span className='text-red-500'>Disable</span>
                                )}
                                <input
                                    type="checkbox"
                                    className={`toggle ${isCampaignEnabled ? 'bg-green-400' : 'bg-red-400'}`}
                                    checked={isCampaignEnabled}
                                    onChange={toggleCampaignStatus}
                                />
                            </div>
                        </label>
                        <label>
                            <div className='my-2 font-bold'>Stores</div>
                            <select
                                onChange={handleRestaurantChange}
                                name="store"
                                id=""
                                className='border border-[#DDE1E6] rounded-lg w-full p-2'>
                                <option selected >
                                    Select Store
                                </option>
                                {
                                    restaurantList?.results?.map((item, index) => (
                                        <option key={index} value={item.id} selected={loyaltyProgramDetails?.restaurant === item.id}>{item.name} </option>
                                    ))
                                }
                            </select>
                        </label>

                        <label>
                            <span className='my-2 font-bold'>Voucher will be valid for</span>
                            <div className='flex gap-2 items-center my-2'>
                                <input value={days} onChange={(e) => setDays(e.target.value)} type="text" className='border border-[#DDE1E6] rounded-lg w-[90px] p-2 mt-2 ' />
                                <p>days</p>
                            </div>
                        </label>
                        <label>
                            <div className='my-2 font-bold'>Does it cover delivery fees</div>
                            <div className='flex items-center gap-3 my-2'>
                                {isDeliveryYes ? (
                                    <span className='text-green-500'>Yes</span>
                                ) : (
                                    <span className='text-red-500'>No</span>
                                )}
                                <input
                                    type="checkbox"
                                    className={`toggle ${isDeliveryYes ? 'bg-green-400' : 'bg-red-400'}`}
                                    checked={isDeliveryYes}
                                    onChange={toggleDeliveryStatus}
                                    value={isDeliveryYes}
                                />
                            </div>
                        </label>
                        <label>
                            <div className='my-2 font-bold'>Select type of reward</div>

                            <select value={rewardType} onChange={(e) => setRewardType(e.target.value)} name="" id="" className='border border-[#DDE1E6] rounded-lg w-full p-2 my-2'>
                                <option selected >
                                    Select Reward Type
                                </option>
                                <option value="discount">Discount</option>
                                <option value="free_meal">Free Meal</option>
                            </select>
                        </label>
                        <label>
                            <span className='my-2 font-bold'>Free Meal after how many orders</span>
                            <div className='flex gap-2 items-center my-2'>
                                <input value={order} onChange={(e) => setOrder(e.target.value)} type="text" className='border border-[#DDE1E6] rounded-lg w-[90px] p-2 mt-2 ' />
                                <p>Orders</p>
                            </div>
                        </label>

                        <label className='flex gap-4 mt-2'>
                            <div className="modal-action">
                                <label htmlFor="add_loyaltyProgram_">
                                    <button
                                        disabled={isLoyaltyProgramLoading || createLoyaltyProgram}
                                        name='save'
                                        type='submit'
                                        className='bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2'>Save</button>
                                </label>
                            </div>
                            {/* <button className='bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2'>Cancel</button> */}
                        </label>
                    </form>
                </div>
                <label
                    onClick={() => {
                        // setShowAddNewPromotionModal(false);
                        dispatch(
                            selectedLoyaltyProgram({
                                isEditing: false,
                                loyaltyProgramDetails: {},
                            })
                        );
                    }}
                    className="modal-backdrop"
                    htmlFor={
                        isEditing
                            ? `add_loyaltyProgram_${loyaltyProgramDetails.id}`
                            : "add_loyaltyProgram_"
                    }
                >
                    Close
                </label>
            </div>
        </>
    )
}

export default AddLoyaltyProgramModal