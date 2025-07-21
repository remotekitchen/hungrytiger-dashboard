import React, { useEffect, useState } from 'react';
import { Collapse } from 'react-collapse';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useAddGiftCardMutation, useGetGiftCardQuery, useUpdateGiftCardMutation } from '../../../redux/features/giftCard/giftCardApi';
import toast from 'react-hot-toast';

const GiftCard = () => {
    const [open, setOpen] = useState([]);
    const [isEditing, setIsEditing] = useState();
    const [giftCardStatus, setGiftCardStatus] = useState();
    const [giftCardAmounts, setGiftCardAmounts] = useState(['', '', '', '']); // Initialize amounts array
    const [customAmount, setCustomAmount] = useState();

    const { data: giftCard } = useGetGiftCardQuery();

    const [createGiftCard, { isSuccess }] = useAddGiftCardMutation();

    const [updateGiftCard, { isSuccess: isUpdateSuccess }] = useUpdateGiftCardMutation();


    useEffect(() => {
        if (giftCard && giftCard[0]?.allow_custom) {
            setCustomAmount(giftCard[0]?.allow_custom);
        }
        if (giftCard && giftCard[0]?.is_active) {
            setGiftCardStatus(giftCard[0]?.is_active);
        }
        if (giftCard && giftCard[0]?.amounts) {
            setGiftCardAmounts(giftCard[0]?.amounts);
        }
    }, [giftCard]);


    const toggleGiftCardStatus = () => {
        setGiftCardStatus(!giftCardStatus);
    };

    const toggleCustomAmount = (e) => {
        setCustomAmount(e.target.checked);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (giftCard[0]) {
            const data = {
                is_active: giftCardStatus,
                allow_custom: customAmount,
                amounts: giftCardAmounts,
            };
            updateGiftCard({
                id: giftCard[0].id,
                giftCardItem: data,
            });
        } else {
            const data = {
                is_active: giftCardStatus,
                allow_custom: customAmount,
                amounts: giftCardAmounts,
            };
            createGiftCard(data);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success('Gift Card created successfully');
        }else if(isUpdateSuccess){
            toast.success('Gift Card updated successfully');
        }

    }, [isSuccess, isUpdateSuccess]);


    const toggle = (index) => {
        if (open.includes(index)) {
            setOpen(open.filter((item) => item !== index));
            setIsEditing(false); // Close the card, reset editing state
        } else {
            setOpen([...open, index]);
            setIsEditing(true); // Open the card, set editing state
        }
    };

    const handleAmountChange = (index, value) => {
        setGiftCardAmounts((prevAmounts) => {
            const newAmounts = [...prevAmounts];
            newAmounts[index] = value;
            return newAmounts;
        });
    };

    return (
        <div className="overflow-x-auto">
            <div>
                <div
                    className="flex justify-between items-center text-left shadow rounded border bg-[#F2F4F8] p-2 cursor-pointer mb-2"
                    onClick={() => toggle(1)}
                >
                    <div className="">Gift Card</div>
                    <div className='flex items-center gap-2'>
                        <div className="text-[30px]" >
                            {open.includes(1) ? <FiChevronUp className='text-[#697077] ' /> : <FiChevronDown className='text-[#697077] ' />}
                        </div>
                    </div>
                </div>
                <Collapse isOpened={open.includes(1)}>
                    <div className='w-[50%]'>
                        <form onSubmit={handleSubmit}>
                            <h1 className='font-bold'>Gift Card feature status</h1>
                            <div className="flex items-center mt-2">
                                <input
                                    type="checkbox"
                                    className={`toggle ${giftCardStatus ? 'bg-green-400' : 'bg-red-400'}`}
                                    checked={giftCardStatus}
                                    onChange={toggleGiftCardStatus}
                                />
                                {giftCardStatus ? (
                                    <span className='text-green-500 ml-4'>Active</span>
                                ) : (
                                    <span className='text-red-500 ml-4'>Inactive</span>
                                )}
                            </div>
                            <p className='my-3 text-[#42C2FF]'>See Historical Logs</p>
                            <label>
                                <span className='my-2'>Set amount to load on gift card</span>
                                <div className='flex gap-2 items-center'>
                                    {giftCardAmounts.map((amount, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            className='border border-[#DDE1E6] rounded-lg w-[25%] p-2 mt-2 '
                                            placeholder='$'
                                            value={amount}
                                            onChange={(e) => handleAmountChange(index, e.target.value)}
                                        />
                                    ))}
                                </div>
                            </label>
                            <div className="flex items-center gap-4 my-2">
                                <span>Allow custom amount</span>
                                <input
                                    type="checkbox"
                                    className={`toggle ${customAmount ? 'bg-green-400' : 'bg-red-400'}`}
                                    checked={customAmount}
                                    onChange={toggleCustomAmount}
                                />
                                {customAmount ? (
                                    <span className='text-green-500 ml-4'>Yes</span>
                                ) : (
                                    <span className='text-red-500 ml-4'>No</span>
                                )}
                            </div>
                            <div className='py-3'>
                                <>
                                    <button type='submit' className='bg-[#42C2FF] text-white rounded-lg px-4 py-2'>Save</button>
                                    <button className='bg-[#42C2FF] text-white rounded-lg px-4 py-2 ml-2'>Cancel</button>
                                </>
                            </div>
                        </form>
                    </div>
                </Collapse>
            </div>
        </div>
    );
};

export default GiftCard;
