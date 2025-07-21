import React, { useEffect, useState } from 'react'
import { useGetRestaurentsQuery } from '../../../redux/features/menuCreation/menuCreationApi';
import { useAddBirthdayGiftMutation, useGetActivationCampaignQuery, useUpdateBirthdayGiftMutation } from '../../../redux/features/birthdayGift/birthdayGiftApi';
import { useDispatch } from 'react-redux';
import { selectedBirthdayGift } from '../../../redux/features/birthdayGift/birthdayGiftSlice';
import toast from 'react-hot-toast';

const AddBirthdayGiftModal = ({
    isEditing,
    birthdayGiftDetails,
    setAddBirthdayGift,
}) => {
    const dispatch = useDispatch();
    const [selectedRestaurants, setSelectedRestaurants] = useState();
    const [membership, setMembership] = useState();
    const [birthdayGiftSetup, setBirthdayGiftSetup] = useState();
    const [consumption, setConsumption] = useState();
    const [amount, setAmount] = useState();
    const [giftOptions, setGiftOptions] = useState();
    const [selectedGiftType, setSelectedGiftType] = useState(null);
    const [selectedGiftId, setSelectedGiftId] = useState(null);



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

    const toggleBirthdayGiftSetup = () => {
        setBirthdayGiftSetup(!birthdayGiftSetup);
    }

    const toggleMembership = () => {
        setMembership(!membership);
    }

    const toggleConsumption = () => {
        setConsumption(!consumption);
    }

    const { data: activationCampaignList } = useGetActivationCampaignQuery();

    const allGiftOptions = Object?.entries(activationCampaignList || {}).flatMap(([type, options]) => options?.map(option => ({ type, ...option })));

    const handleGiftSelection = (e) => {
        const selectedId = e.target.value;
        setSelectedGiftId(selectedId);

        // Use the type from the selected option
        const selectedOption = allGiftOptions?.find(option => option?.id === parseInt(selectedId, 10)) || '';
        setSelectedGiftType(selectedOption ? selectedOption?.type : null);
    };

    const [createBirthdayGift, { isSuccess }] = useAddBirthdayGiftMutation()

    const [updateBirthdayGift, { isSuccess: isBirthdayGiftSuccess, isLoading: isBirthdayGiftLoading }] = useUpdateBirthdayGiftMutation()

    useEffect(() => {
        if (isEditing) {
            setSelectedRestaurants(birthdayGiftDetails.restaurant)
            setMembership(birthdayGiftDetails.membership_only)
            setBirthdayGiftSetup(birthdayGiftDetails.is_active)
            setConsumption(birthdayGiftDetails.has_condition)
            setAmount(birthdayGiftDetails.minimum_spent)
            setSelectedGiftType(birthdayGiftDetails.gift_option_type)
            setSelectedGiftId(birthdayGiftDetails.object_id)
        } else {
            setSelectedRestaurants("")
            setMembership(false)
            setBirthdayGiftSetup(false)
            setConsumption(false)
            setAmount("")
            setSelectedGiftType("")
            setSelectedGiftId("")
        }
    }, [birthdayGiftDetails])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedRestaurants) {
            toast.error("Please select a restaurant");
            return;
        }
        if (!amount) {
            toast.error("Please enter the amount");
            return;
        }
        if (!selectedGiftType) {
            toast.error("Please select a gift option");
            return;
        }

        const birthdayGiftData = {
            is_active: birthdayGiftSetup,
            restaurant: selectedRestaurants,
            membership_only: membership,
            has_condition: consumption,
            minimum_spent: amount,
            gift_option_type: selectedGiftType,
            object_id: selectedGiftId
        };
        if (isEditing) {
            updateBirthdayGift({ id: birthdayGiftDetails.id, birthdayGiftItem: birthdayGiftData })
        }
        else {
            createBirthdayGift(birthdayGiftData)
        }

    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(
                selectedBirthdayGift({
                    isEditing: false,
                    selectedBirthdayGiftData: {},
                })
            );
            toast.success("Successfully added a Birthday Gift");
            setAddBirthdayGift(false)
        }
        if (isBirthdayGiftSuccess) {
            dispatch(
                selectedBirthdayGift({
                    isEditing: false,
                    selectedBirthdayGiftData: {},
                })
            );
            toast.success("Successfully updated a Birthday Gift");
            setAddBirthdayGift(false)
        }
    }, [isSuccess, isBirthdayGiftSuccess])

    return (
        <>
            <input
                type="checkbox"
                id={
                    isEditing
                        ? `add_birthdaygift_${birthdayGiftDetails.id}`
                        : "add_birthdaygift_"
                }
                className="modal-toggle"
            />
            <div className="modal">
                <div className="modal-box">
                    <h1 className="text-2xl mb-6 font-bold font-sans">
                        {isEditing ? "Edit" : "Add A"} Birthday Gift
                    </h1>
                    <form onSubmit={handleSubmit}>

                        <span className='my-1'>Birthday Gift Setup</span>
                        <div className="flex gap-4 py-2 items-center">
                            {birthdayGiftSetup ? (
                                <span className='text-green-500 ml-4'>Enable</span>
                            ) : (
                                <span className='text-red-500 ml-4'>Disable</span>
                            )}
                            <input
                                type="checkbox"
                                className={`toggle ${birthdayGiftSetup ? 'bg-green-400' : 'bg-red-400'}`}
                                checked={birthdayGiftSetup}
                                onChange={toggleBirthdayGiftSetup}

                            />
                        </div>

                        <div>
                            <span className='my-1'>Restaurant</span>
                            <span className=''>Select the restaurant</span>
                            <select
                                onChange={handleRestaurantChange}
                                name="restaurant"
                                id=""
                                className='border border-[#DDE1E6] rounded-lg w-full p-2'>
                                <option selected >
                                    Select Restaurant
                                </option>
                                {
                                    restaurantList?.results?.map((item, index) => (
                                        <option key={index} value={item.id} selected={birthdayGiftDetails.restaurant === item.id}>{item.name} </option>
                                    ))
                                }
                            </select>
                        </div>

                        <h1 className='font-bold'>Who can get birthday gift</h1>
                        <div className='flex items-center gap-4 mt-3 py-2'>
                            <label>Membership subscriber</label>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className={`toggle ${membership ? 'bg-green-400' : 'bg-red-400'}`}
                                    checked={membership}
                                    onChange={toggleMembership}

                                />
                                {membership ? (
                                    <span className='text-green-500 ml-4'>Yes</span>
                                ) : (
                                    <span className='text-red-500 ml-4'>No</span>
                                )}
                            </div>

                        </div>
                        <div className='flex items-center gap-4 my-3 py-2 '>
                            <label>User with a certain consumption</label>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className={`toggle ${consumption ? 'bg-green-400' : 'bg-red-400'}`}
                                    checked={consumption}
                                    onChange={toggleConsumption}
                                />
                                {consumption ? (
                                    <span className='text-green-500 ml-4'>Yes</span>
                                ) : (
                                    <span className='text-red-500 ml-4'>No</span>
                                )}
                            </div>

                        </div>
                        <label>
                            <span className='my-1'>Set amount spent in 12 months to get birthday gift</span>
                            <input
                                type="text"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className='border my-2 border-[#DDE1E6] rounded-lg w-full p-2' placeholder='$Amount'
                            />
                        </label>
                        <div>
                            <span className='my-1'>Select Gift Options</span>
                            <select
                                className='border border-[#DDE1E6] rounded-lg w-full my-2 p-2'
                                onChange={handleGiftSelection}
                                value={selectedGiftId}
                            >
                                <option selected>Select...</option>
                                {allGiftOptions?.map(({ id, name }, index) => (
                                    <option key={index} value={id}>{name}</option>
                                ))}
                            </select>
                        </div>

                        <div className='flex gap-4 mt-2'>
                            <div className="modal-action">
                                <label htmlFor="add_birthdaygift_">
                                    <button
                                        disabled={isBirthdayGiftLoading || createBirthdayGift}
                                        name='save'
                                        type='submit'
                                        className='bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2'>Save</button>
                                </label>
                            </div>
                            {/* <button className='bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2'>Cancel</button> */}
                        </div>
                    </form>
                </div>
                <label
                    onClick={() => {
                        // setAddBirthdayGift(false);
                        dispatch(
                            selectedBirthdayGift({
                                isEditing: false,
                                selectedBirthdayGiftData: {},
                            })
                        );
                    }}
                    className="modal-backdrop"
                    htmlFor={
                        isEditing
                            ? `add_birthdaygift_${birthdayGiftDetails.id}`
                            : "add_birthdaygift_"
                    }
                >
                    Close
                </label>
            </div>
        </>
    )
}

export default AddBirthdayGiftModal