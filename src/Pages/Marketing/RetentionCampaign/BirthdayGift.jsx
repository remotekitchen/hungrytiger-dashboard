import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-collapse';
import { BiEdit } from 'react-icons/bi';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { useDeleteBirthdayGiftMutation, useGetBirthdayGiftQuery } from '../../../redux/features/birthdayGift/birthdayGiftApi';
import { MdDeleteOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { selectedBirthdayGift } from '../../../redux/features/birthdayGift/birthdayGiftSlice';
import AddBirthdayGiftModal from '../Modal/AddBirthdayGiftModal';
import toast from 'react-hot-toast';


const BirthdayGift = () => {
    const [open, setOpen] = useState([]);
    const [close, setClose] = useState(false);
    const [AddBirthdayGift, setAddBirthdayGift] = useState(false);

    const { data: birthdayGift } = useGetBirthdayGiftQuery();

    const dispatch = useDispatch();

    const editBirthdayGift = (item) => {
        setAddBirthdayGift(true);
        dispatch(
            selectedBirthdayGift({ isEditing: true, selectedBirthdayGiftData: item })
        )
    }

    const [deleteBirthdayGift, { isSuccess }] = useDeleteBirthdayGiftMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Successfully deleted a Birthday Gift");
        }
    }, [isSuccess]);

    const handleHistoryLogs = () => {
        setClose(!close)
    }

    const toggle = (index) => {
        if (open.includes(index)) {
            setOpen(open.filter((item) => item !== index));
        } else {
            setOpen([...open, index]);
        }
    };

    const { selectedBirthdayGift: selectedBirthdayGiftSelector } = useSelector(
        (state) => state.birthdayGift
    );

    const { isEditing, birthdayGiftDetails } = selectedBirthdayGiftSelector;

    return (
        <div className="overflow-x-auto">

            <div >
                <div
                    className="flex justify-between items-center text-left shadow rounded border bg-[#F2F4F8] p-2 cursor-pointer mb-2"
                    onClick={() => toggle(1)}>
                    <div className="">Birthday Gift</div>

                    <div className='flex items-center gap-2'>

                        <div className="text-[30px]" >
                            {open.includes(1) ? <FiChevronUp className='text-[#697077] ' /> : <FiChevronDown className='text-[#697077] ' />}
                        </div>
                    </div>
                </div>
                <Collapse isOpened={open.includes(1)}>
                    <div className="overflow-x-auto">
                        <label
                            onClick={() => setAddBirthdayGift(true)}
                            htmlFor={
                                isEditing
                                    ? `add_birthdaygift_${birthdayGiftDetails.id}`
                                    : "add_birthdaygift_"
                            }
                            className='btn bg-[#42C2FF] w-[250px] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2'>Add New Birthday Gift</label>
                        <div className='flex justify-between items-center gap-4 my-4'>
                            <div className='grid sm:grid-cols-1 md::grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 w-full'>
                                {
                                    birthdayGift?.map((item, index) => (
                                        <div key={index} className='flex gap-4 justify-between  border border-[#DDE1E6] rounded-lg p-4'>
                                            <div className=''>
                                                <h1 className='font-bold mb-2 capitalize'>{item?.restaurant_name}</h1>
                                                <p className={`text-${item.is_active
                                                    === true ? "green" : "red"}-500 capitalize`}>
                                                    {item.is_active
                                                        === true ? "enable" : "disable"}
                                                </p>

                                                <div className='flex items-center gap-2'>
                                                    <label
                                                        onClick={() => editBirthdayGift(item)}
                                                        htmlFor={
                                                            isEditing
                                                                ? `add_birthdaygift_${item.id}`
                                                                : "add_birthdaygift_"
                                                        }
                                                        className='bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-2 flex items-center gap-2 cursor-pointer'><BiEdit />Modify</label>
                                                    <button onClick={() => deleteBirthdayGift(item.id)} className='bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-2 flex items-center gap-2'>
                                                        <MdDeleteOutline className='text-2xl  cursor-pointer' />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='mt-6'>
                                                <p className=''>Gift: {item?.gift_option_type}</p>
                                                <h1 className=''>Membership subscriber: {""}
                                                    {<span className={` text-${item.membership_only
                                                        === true ? "green" : "red"}-500 capitalize`}>
                                                        {item.membership_only
                                                            === true ? "yes" : "no"}
                                                    </span>}
                                                </h1>
                                                <p className=' '>User with a certain consumption: {""}
                                                    {<span className={` text-${item.has_condition
                                                        === true ? "green" : "red"}-500 capitalize`}>
                                                        {item.has_condition
                                                            === true ? "yes" : "no"}
                                                    </span>}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <p onClick={handleHistoryLogs} className='my-3 text-[#42C2FF] cursor-pointer'>See Historical Logs</p>
                        {close &&
                            <div className='border border-[#DDE1E6] rounded-lg w-full p-2'>
                                dchdh
                            </div>

                        }
                        {
                            AddBirthdayGift && (
                                <AddBirthdayGiftModal
                                    isEditing={isEditing}
                                    birthdayGiftDetails={birthdayGiftDetails}
                                    AddBirthdayGift={AddBirthdayGift}
                                    setAddBirthdayGift={setAddBirthdayGift}
                                />
                            )
                        }

                    </div>

                </Collapse>
            </div>
        </div>
    )
}

export default BirthdayGift