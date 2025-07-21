import React, { useEffect, useRef, useState } from 'react'
import { useGetRestaurentsQuery } from '../../../redux/features/menuCreation/menuCreationApi';
import { useGetAllItemsQuery } from '../../../redux/features/itemCreation/itemCreationApi';
import { useAddMembershipCardMutation, useUpdateMembershipCardMutation } from '../../../redux/features/membershipCard/membershipCardApi';
import { useDispatch } from 'react-redux';
import { selectedMembershipCard } from '../../../redux/features/membershipCard/membershipCardSlice';
import toast from 'react-hot-toast';

const AddNewMemberShipModal = ({
    isEditing,
    membershipCardDetails,
    addNewMemberShip,
    setAddNewMemberShip
}) => {

    const dispatch = useDispatch();
    const [selectedRestaurants, setSelectedRestaurants] = useState();
    const [membershipCardName, setMembershipCardName] = useState();
    const [price, setPrice] = useState();
    const [duration, setDuration] = useState();
    const [start_time, setStartTime] = useState();
    const [end_time, setEndTime] = useState();
    const [anyTime, setAnyTime] = useState();
    const [discount, setDiscount] = useState();
    const [limit, setLimit] = useState();
    const [dishes, setDishes] = useState();

    useEffect(() => {
        if (isEditing) {
            setSelectedRestaurants(membershipCardDetails.restaurant);
            setMembershipCardName(membershipCardDetails.name);
            setPrice(membershipCardDetails.price);
            setDuration(membershipCardDetails.duration);
            setStartTime(membershipCardDetails.start_time);
            setEndTime(membershipCardDetails.end_time);
            setAnyTime(membershipCardDetails.anytime);
            setDiscount(membershipCardDetails.discount);
            setLimit(membershipCardDetails.limit_per_month);
            setDishes(membershipCardDetails.dishes);
        } else {
            setSelectedRestaurants("");
            setMembershipCardName("");
            setPrice("");
            setDuration("");
            setStartTime("");
            setEndTime("");
            setAnyTime(true);
            setDiscount("");
            setLimit("");
            setDishes("");
        }
    }, [isEditing, membershipCardDetails])

    const toggleAnyTimeChange = () => {
        setAnyTime(!anyTime)
    }


    const {
        data: restaurantList,
        isLoading: isRestaurantLoading,
        isError: isRestaurantError,
        error: restaurantError,
    } = useGetRestaurentsQuery();

    const {
        data: allItems,
        isLoading,
        isError,
        error,
    } = useGetAllItemsQuery(1);

    const handleItemChange = (e) => {
        const selectedItemId = e.target.value;
        setDishes([selectedItemId]);
    };

    const handleRestaurantChange = (e) => {
        const selectedId = e.target.value;
        setSelectedRestaurants(selectedId);

        // Update the selected restaurant ID
        // setSelectedRestaurantId(selectedId);
    };

    const [createMembershipCard, { isSuccess, isErr }] = useAddMembershipCardMutation();

    const [updateMembershipCard, {
        isSuccess: isUpdateSuccess,
        isError: isUpdateError,
    }] = useUpdateMembershipCardMutation();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!membershipCardName) {
            toast.error("Please enter membership card name");
            return;
        }
        if (!selectedRestaurants) {
            toast.error("Please select restaurant");
            return;
        }
        if (!price) {
            toast.error("Please enter price");
            return;
        }
        if (!duration) {
            toast.error("Please enter duration");
            return;
        }
        if (!start_time) {
            toast.error("Please enter start time");
            return;
        }
        if (!end_time) {
            toast.error("Please enter end time");
            return;
        }
        if (!discount) {
            toast.error("Please enter discount");
            return;
        }
        if (!limit) {
            toast.error("Please enter limit");
            return;
        }
        if (!dishes) {
            toast.error("Please select dishes");
            return;
        }
        const data = {
            name: membershipCardName,
            restaurant: selectedRestaurants,
            price: price,
            duration: duration,
            start_time: start_time,
            end_time: end_time,
            anytime: anyTime,
            discount: discount,
            limit_per_month: limit,
            dishes: dishes
        }
        if (isEditing) {
            updateMembershipCard({
                id: membershipCardDetails.id,
                membershipCardItem: data
            })
        } else {
            createMembershipCard(data)
        }
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(
                selectedMembershipCard({
                    isEditing: false,
                    membershipCardDetails: {},
                })
            );
            setAddNewMemberShip(false);
            toast.success("Membership card added successfully");
        }
        if (isErr) {
            toast.error("Something went wrong");
        }
        if (isUpdateSuccess) {
            dispatch(
                selectedMembershipCard({
                    isEditing: false,
                    membershipCardDetails: {},
                })
            );
            setAddNewMemberShip(false);
            toast.success("Membership card updated successfully");
        }
        if (isUpdateError) {
            toast.error("Something went wrong");
        }
    }, [isSuccess, isErr, isUpdateSuccess, isUpdateError])

    return (
        <>
            <input
                type="checkbox"
                id={
                    isEditing
                        ? `add_membershipcard_${membershipCardDetails.id}`
                        : "add_membershipcard_"
                }
                className="modal-toggle"
            />
            <div className="modal">
                <div className="modal-box">
                    <h1 className="text-2xl mb-6 font-bold font-sans">
                        {isEditing ? "Edit" : "Add A"} Membership Card
                    </h1>

                    <form onSubmit={handleSubmit}>

                        <label>
                            <span className='mb-1'>Membership card name</span>
                            <input
                                type="text"
                                value={membershipCardName}
                                onChange={(e) => setMembershipCardName(e.target.value)}
                                className='border border-[#DDE1E6] rounded-lg w-full p-2' placeholder='Membership name' />
                        </label>
                        <div>
                            <span className='my-1'>Restaurant</span>
                            <span className=''>Select the restaurant</span>
                            <select
                                onChange={handleRestaurantChange}
                                name="restaurant"
                                id=""
                                value={selectedRestaurants}
                                className='border border-[#DDE1E6] rounded-lg w-full p-2'>
                                <option selected >
                                    Select Restaurant
                                </option>
                                {
                                    restaurantList?.results?.map((item, index) => (
                                        <option key={index} value={item.id} selected={membershipCardDetails?.restaurant === item.id}>{item.name} </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            <p>Membership Price</p>

                            <input
                                type="text"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className='border border-[#DDE1E6] rounded-lg w-[90px] p-2 mt-2 ' placeholder='$' />

                        </div>
                        <div>
                            <label className='my-2'>Duration</label>
                            <div className='flex gap-2 items-center'>
                                <input
                                    type="text"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    className='border border-[#DDE1E6] rounded-lg w-[90px] p-2 mt-2 ' />
                                <p>days</p>
                            </div>
                        </div>
                        <label>
                            <span>Usage time</span>
                            <div className='flex'>
                                <input
                                    type="time"
                                    value={start_time}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    className='border border-[#DDE1E6] rounded-lg w-full p-2 mt-2 mr-4' />
                                <input
                                    type="time"
                                    value={end_time}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    className='border border-[#DDE1E6] rounded-lg w-full p-2 mt-2' />
                            </div>
                        </label>
                        <div className='flex items-center gap-4 my-3'>
                            <label>Anytime</label>
                            <input
                                type="checkbox"
                                checked={anyTime}
                                className='toggle'
                                onChange={toggleAnyTimeChange} />
                        </div>
                        <label>
                            <p>Discount</p>

                            <input
                                type="text"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                                className='border border-[#DDE1E6] rounded-lg w-[90px] p-2 mt-2 ' placeholder='%' />

                        </label>
                        <label>
                            <p>Limit</p>
                            <div className='flex gap-2 items-center'>
                                <input
                                    type="text"
                                    value={limit}
                                    onChange={(e) => setLimit(e.target.value)}
                                    className='border border-[#DDE1E6] rounded-lg w-[90px] p-2 mt-2 ' placeholder='Times' />
                                <p>/month</p>
                            </div>
                        </label>
                        <label>
                            <span className='my-2'>Dishes</span>
                            <select
                                onChange={handleItemChange}
                                value={dishes}
                                name="items"
                                id=""
                                className='border border-[#DDE1E6] rounded-lg w-full p-2 mt-2'>
                                <option selected >
                                    Select item
                                </option>
                                {
                                    allItems?.results?.map((item, index) => (
                                        <option key={index} value={item.id} selected={membershipCardDetails?.items === item.id}>{item.name}</option>
                                    ))
                                }
                            </select>

                        </label>
                        <div className='flex gap-4 mt-2'>
                            <button type='submit' className='bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2'>Save</button>
                            {/* <button className='bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2'>Cancel</button> */}
                        </div>
                    </form>
                </div>
                <label
                    onClick={() => {
                        // setAddNewMemberShip(false);
                        dispatch(
                            selectedMembershipCard({
                                isEditing: false,
                                membershipCardDetails: {},
                            })
                        );
                    }}
                    className="modal-backdrop"
                    htmlFor={
                        isEditing
                            ? `add_membershipcard_${membershipCardDetails.id}`
                            : "add_membershipcard_"
                    }
                >
                    Close
                </label>
            </div>
        </ >
    )
}

export default AddNewMemberShipModal