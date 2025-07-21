import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-collapse';
import { BiEdit } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import AddNewMemberShipModal from '../Modal/AddNewMemberShipModal';
import { useDeleteMembershipCardMutation, useGetMembershipCardQuery } from '../../../redux/features/membershipCard/membershipCardApi';
import { useDispatch, useSelector } from 'react-redux';
import { selectedMembershipCard } from '../../../redux/features/membershipCard/membershipCardSlice';
import toast from 'react-hot-toast';

const MembershipCard = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState([]);
    const [addNewMemberShip, setAddNewMemberShip] = useState(false);

    const { data: membershipCard } = useGetMembershipCardQuery();
    const toggle = (index) => {
        if (open.includes(index)) {
            setOpen(open.filter((item) => item !== index));
        } else {
            setOpen([...open, index]);
        }
    };

    const handleEditMembershipCard = (item) => {
        setAddNewMemberShip(true);
        dispatch(
            selectedMembershipCard({ isEditing: true, selectedMembershipCardData: item })
        )
    }

    const [deleteMembershipCard, { isSuccess }] = useDeleteMembershipCardMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Successfully deleted a loyalty program");
        }
    }, [isSuccess]);


    const { selectedMembershipCard: selectedMembershipCardSelector } = useSelector(
        (state) => state.membershipCard
    );

    const { isEditing, membershipCardDetails } = selectedMembershipCardSelector;
    return (
        <div className="overflow-x-auto">

            <div >
                <div
                    className="flex justify-between items-center text-left shadow rounded border bg-[#F2F4F8] p-2 cursor-pointer mb-2"
                    onClick={() => toggle(1)}>
                    <div className="">Membership Card</div>

                    <div className='flex items-center gap-2'>

                        <div className="text-[30px]" >
                            {open.includes(1) ? <FiChevronUp className='text-[#697077] ' /> : <FiChevronDown className='text-[#697077] ' />}
                        </div>
                    </div>
                </div>
                <Collapse isOpened={open.includes(1)}>
                    <div className="overflow-x-auto">
                        <label
                            onClick={
                                () => setAddNewMemberShip(true)
                            }
                            htmlFor={
                                isEditing
                                    ? `add_membershipcard_${membershipCardDetails.id}`
                                    : "add_membershipcard_"
                            }
                            className='btn bg-[#42C2FF] w-[250px] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2'>Add New Membership Card</label>
                        <div className='flex justify-between items-center gap-4 my-4'>
                            <div className='grid sm:grid-cols-1 md::grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 w-full'>
                                {
                                    membershipCard?.map((item, index) => (
                                        <div key={index} className='flex gap-4 justify-between  border border-[#DDE1E6] rounded-lg p-4'>
                                            <div className=''>
                                                <h1 className='font-bold mb-2'>{item.name}</h1>
                                                <p>Usage time: {item.start_time + "-" + item.end_time}</p>

                                                <div className='flex items-center gap-2'>
                                                    <label
                                                        onClick={() => handleEditMembershipCard(item)}
                                                        htmlFor={
                                                            isEditing
                                                                ? `add_membershipcard_${item.id}`
                                                                : "add_membershipcard_"
                                                        }
                                                        className='bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-2 flex items-center gap-2'><BiEdit />Modify</label>
                                                    <button onClick={() => deleteMembershipCard(item.id)} className='bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-2 flex items-center gap-2'>
                                                        <MdDeleteOutline className='text-2xl  cursor-pointer' />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='mt-6'>
                                                <p className=' '>Duration: {item.duration}</p>
                                                <p className=''>Discount: {item.discount}</p>
                                                <p className=''>Limit: {item.limit_per_month}/month</p>
                                                <p className=''>Dishes: {
                                                    item.dish_names.map((item, index) => (
                                                        <span key={index}>{item}</span>
                                                    ))
                                                }</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        {
                            addNewMemberShip && (
                                <AddNewMemberShipModal
                                    isEditing={isEditing}
                                    membershipCardDetails={membershipCardDetails}
                                    addNewMemberShip={addNewMemberShip}
                                    setAddNewMemberShip={setAddNewMemberShip}
                                />
                            )
                        }
                    </div>
                </Collapse>
            </div>
        </div>
    )
}

export default MembershipCard