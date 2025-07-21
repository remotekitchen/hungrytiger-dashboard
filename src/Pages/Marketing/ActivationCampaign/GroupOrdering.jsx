import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-collapse';
import { BiEdit } from 'react-icons/bi';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { MdDeleteOutline } from 'react-icons/md';
import AddGroupPromotionModal from '../Modal/AddGroupPromotionModal';
import { useDeleteGroupOrderingMutation, useGetGroupOrderingQuery } from '../../../redux/features/groupOrdering/groupOrderingApi';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { selectedGroupOrdering } from '../../../redux/features/groupOrdering/groupOrderingSlice';
import groupOrdering from "../../../assets/campaign/groupOrdering.png";

const GroupOrdering = () => {
    const [open, setOpen] = useState([]);
    const [addGroupPromotion, setAddGroupPromotion] = useState(false);

    const dispatch = useDispatch();
    const editGroupOrdering = (item) => {
        setAddGroupPromotion(true);
        dispatch(
            selectedGroupOrdering({ isEditing: true, selectedGroupOrderingData: item })
        );
    };

    const { data: groupPromotion } = useGetGroupOrderingQuery();

    const [deleteGroupOrdering, { isSuccess }] = useDeleteGroupOrderingMutation();

    const toggle = (index) => {
        if (open.includes(index)) {
            setOpen(open.filter((item) => item !== index));
        } else {
            setOpen([...open, index]);
        }
    };


    const { selectedGroupOrdering: selectedGroupOrderingSelector } = useSelector(
        (state) => state.groupOrdering
    );

    const { isEditing, groupOrderingDetails } = selectedGroupOrderingSelector;

    useEffect(() => {
        if (isSuccess) {
            toast.success("Successfully deleted a group promotion");
        }
    }, [isSuccess]);

    return (
        <div className="overflow-x-auto">

            <div >
                <div
                    className="flex justify-between items-center text-left shadow rounded border bg-[#F2F4F8] p-2 cursor-pointer mb-2"
                    onClick={() => toggle(1)}>
                    <div className="">Group Ordering</div>

                    <div className='flex items-center gap-2'>

                        <div className="text-[30px]" >
                            {open.includes(1) ? <FiChevronUp className='text-[#697077] ' /> : <FiChevronDown className='text-[#697077] ' />}
                        </div>
                    </div>
                </div>
                <Collapse isOpened={open.includes(1)}>
                    <label
                        onClick={() => setAddGroupPromotion(true)}
                        htmlFor={
                            isEditing
                                ? `add_group_${groupOrderingDetails.id}`
                                : "add_group_"
                        }
                        className='btn bg-[#42C2FF] w-[250px] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2'>
                        + Add New Promotion
                    </label>
                    <div className='flex justify-between items-center gap-4 my-4'>
                        <div className='grid sm:grid-cols-1 md::grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 w-full'>
                            {
                                groupPromotion?.results?.map((item, index) => (
                                    <div key={index} className='flex gap-4 justify-between  border border-[#DDE1E6] rounded-lg p-4'>
                                        <div className=''>
                                            <h1 className='font-bold mb-2'>{item.name}</h1>

                                            <div className="relative">
                                                <img
                                                    src={groupOrdering}
                                                    alt=""
                                                    className="w-80 h-40 object-cover rounded relative"
                                                />
                                                <p className=" absolute top-0 left-1 text-white capitalize -mt-[2px] tracking-tighter">{item?.name}</p>
                                                <p className=" absolute right-1 bottom-0 text-white capitalize tracking-tighter">
                                                    {item?.promo_options?.map((option, index) => (
                                                        <span key={index}>Get up to {option?.discount}% OFF</span>
                                                    ))}
                                                </p>
                                            </div>

                                            <div className='flex items-center gap-2'>
                                                <label
                                                    onClick={() => editGroupOrdering(item)}
                                                    htmlFor={
                                                        isEditing
                                                            ? `add_group_${groupOrderingDetails.id}`
                                                            : "add_group_"
                                                    }
                                                    className='bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-2 flex items-center gap-2'>
                                                    <BiEdit />Modify
                                                </label>
                                                <button onClick={() => deleteGroupOrdering(item.id)} className='bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-2 flex items-center gap-2'>
                                                    <MdDeleteOutline className='text-2xl  cursor-pointer' />
                                                </button>
                                            </div>
                                        </div>
                                        <div className='mt-6'>
                                            <h1 className=''>Promotion: {item?.name}</h1>
                                            <p className=' '>Audience: {item.audience}</p>
                                            <p className=''>Duration:
                                                {
                                                    item?.durations?.map((duration, index) => (
                                                        <span key={index}>{duration?.start_date.slice(0, 10)} - {duration?.end_date.slice(0, 10)}</span>
                                                    ))
                                                }
                                            </p>
                                            <p className=' capitalize'>Restaurant: {item?.restaurant_name}</p>
                                            <p className=' capitalize'>Location: {item?.location_name}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </Collapse>
            </div>
            {addGroupPromotion && (
                <AddGroupPromotionModal
                    isEditing={isEditing}
                    groupOrderingDetails={groupOrderingDetails}
                    addGroupPromotion={addGroupPromotion}
                    setAddGroupPromotion={setAddGroupPromotion} />
            )}
        </div>
    )
}

export default GroupOrdering