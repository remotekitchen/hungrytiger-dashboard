import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-collapse';
import { BiEdit } from 'react-icons/bi';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { MdDeleteOutline } from 'react-icons/md';
import AddLoyaltyProgramModal from '../Modal/AddLoyaltyProgramModal';
import { useDeleteLoyaltyProgramMutation, useGetLoyaltyProgramQuery } from '../../../redux/features/loyaltyProgram/loyaltyProgramApi';
import { useDispatch, useSelector } from 'react-redux';
import { selectedLoyaltyProgram } from '../../../redux/features/loyaltyProgram/loyaltyProgramSlice';
import toast from 'react-hot-toast';
import { CgDanger } from 'react-icons/cg';

const LoyaltyProgram = () => {
    const [open, setOpen] = useState([]);
    const [addLoyaltyProgram, setAddLoyaltyProgram] = useState(false);

    const { data: loyaltyProgram } = useGetLoyaltyProgramQuery();

    const dispatch = useDispatch();

    const editLoyaltyProgram = (item) => {
        setAddLoyaltyProgram(true);
        dispatch(
            selectedLoyaltyProgram({ isEditing: true, selectedLoyaltyProgramData: item })
        );
    };

    const [deleteLoyaltyProgram, { isSuccess }] = useDeleteLoyaltyProgramMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Successfully deleted a loyalty program");
        }
    }, [isSuccess]);

    const toggle = (index) => {
        if (open.includes(index)) {
            setOpen(open.filter((item) => item !== index));
        } else {
            setOpen([...open, index]);
        }
    };

    const { selectedLoyaltyProgram: selectedLoyaltyProgramSelector } = useSelector(
        (state) => state.loyaltyProgram
    );

    const { isEditing, loyaltyProgramDetails } = selectedLoyaltyProgramSelector;

    return (
        <div className="overflow-x-auto">

            <div >
                <div
                    className="flex justify-between items-center text-left shadow rounded border bg-[#F2F4F8] p-2 cursor-pointer mb-2"
                    onClick={() => toggle(1)}>
                    <div className="">Loyalty Program</div>

                    <div className='flex items-center gap-2'>

                        <div className="text-[30px]" >
                            {open.includes(1) ? <FiChevronUp className='text-[#697077] ' /> : <FiChevronDown className='text-[#697077] ' />}
                        </div>
                    </div>
                </div>
                <Collapse isOpened={open.includes(1)}>
                    <div className="overflow-x-auto">
                        <div className='bg-[#E6ECFA] w-[65%] border-l-2 border-[#42C2FF]'>
                            <div className='flex justify-between items-start p-4'>
                                <div className='text-2xl text-[#42C2FF]'><CgDanger /></div>
                                <div>
                                    <p className='font-bold'>Setup Loyalty Programs </p>
                                    <p>Currently you dont have any loyalty program set up</p>
                                </div>
                                <div>
                                    <label
                                        onClick={() => setAddLoyaltyProgram(true)}
                                        htmlFor={
                                            isEditing
                                                ? `add_loyaltyProgram_${loyaltyProgramDetails.id}`
                                                : "add_loyaltyProgram_"
                                        }
                                        className=' text-[#42C2FF] cursor-pointer'>Create your own</label>
                                </div>
                            </div>
                            <div className='px-20'>
                                <div className='flex justify-between items-start'>                                    
                                    <div className='text-blue-600 font-bold border border-[#42C2FF] rounded-2xl p-3'>Setup Chatchef recommended loyalty programs</div>
                                </div>
                            </div>
                            <div className='px-16'>
                                <div className='flex justify-between items-start p-4'>
                                    <div className='text-gray-400'>**You can modify it later as you see fit**</div>
                                </div>
                            </div>
                        </div>

                        <div className='flex justify-between items-center gap-4 my-4'>
                            <div className='grid sm:grid-cols-1 md::grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 w-full'>
                                {
                                    loyaltyProgram?.results?.map((item, index) => (
                                        <div key={index} className='flex gap-4 justify-between  border border-[#DDE1E6] rounded-lg p-4'>
                                            <div className=''>
                                                <h1 className='font-bold mb-2 capitalize'>{item.reward_type
                                                } Program</h1>
                                                <p className={`text-${item.is_enabled === true ? "green" : "red"}-500 capitalize`}>
                                                    {item.is_enabled === true ? "enable" : "disable"}
                                                </p>

                                                <div className='flex items-center gap-2'>
                                                    <label
                                                        onClick={() => editLoyaltyProgram(item)}
                                                        htmlFor={
                                                            isEditing
                                                                ? `add_loyaltyProgram_${item.id}`
                                                                : "add_loyaltyProgram_"
                                                        }
                                                        className='bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-2 flex items-center gap-2'><BiEdit />Modify</label>
                                                    <button onClick={() => deleteLoyaltyProgram(item.id)} className='bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-2 flex items-center gap-2'>
                                                        <MdDeleteOutline className='text-2xl  cursor-pointer' />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='mt-6'>
                                                {/* <p className=''>10% off if no orders placed in 14 days</p> */}
                                                <h1 className=' capitalize'>Stores:  {item.restaurant_name }</h1>
                                                <p className=' '>Valid for: {item.validity_days} days</p>
                                                <p>Cover Delivery Fees: <span className={`text-${item.covers_delivery_fees === true ? "green" : "red"}-500 capitalize`}>{item.covers_delivery_fees === true ? "Yes" : "No"}</span></p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        {addLoyaltyProgram && (
                            <AddLoyaltyProgramModal
                                isEditing={isEditing}
                                loyaltyProgramDetails={loyaltyProgramDetails}
                                addLoyaltyProgram={addLoyaltyProgram}
                                setAddLoyaltyProgram={setAddLoyaltyProgram}
                            />
                        )}
                    </div>
                </Collapse>
            </div>
        </div>
    )
}

export default LoyaltyProgram