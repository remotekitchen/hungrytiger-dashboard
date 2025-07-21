import React, { useEffect, useState } from "react";
import { Collapse } from "react-collapse";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import spendXsaveY from "../../../assets/campaign/spendXsaveY.png";
import {
  useDeleteSpendXSaveYMutation,
  useGetSpendXSaveYQuery,
} from "../../../redux/features/SpendXSaveY/spendxsaveyApi";
import { selectedSpendXSaveY } from "../../../redux/features/SpendXSaveY/spendxsaveySlice";
import AddNewPromotionModal from "../Modal/AddNewPromotionModal";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

const SpendXSaveY = () => {
  const [open, setOpen] = useState([]);
  const [addNewPromotion, setAddNewPromotion] = useState(false);

  const dispatch = useDispatch();
  const editSpendXSaveY = (item) => {
    setAddNewPromotion(true);
    dispatch(
      selectedSpendXSaveY({ isEditing: true, selectedSpendXSaveYData: item })
    );
  };

  const { data: spendxsavey } = useGetSpendXSaveYQuery();

  const [deleteSpendXSaveY, { isSuccess }] = useDeleteSpendXSaveYMutation();

  const toggle = (index) => {
    if (open.includes(index)) {
      setOpen(open.filter((item) => item !== index));
    } else {
      setOpen([...open, index]);
    }
  };

  const { selectedSpendXSaveY: selectedSpendXSaveYSelector } = useSelector(
    (state) => state.spendxsavey
  );

  const { isEditing, spendXSaveYDetails } = selectedSpendXSaveYSelector;

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully deleted a promotion");
    }
  }, [isSuccess]);

  return (
    <div className="overflow-x-auto">
      <div>
        <div
          className="flex justify-between items-center text-left shadow rounded border bg-[#F2F4F8] p-2 cursor-pointer mb-2"
          onClick={() => toggle(1)}
        >
          <div className="">Spend X Save Y</div>

          <div className="flex items-center gap-2">
            <div className="text-[30px]">
              {open.includes(1) ? (
                <FiChevronUp className="text-[#697077] " />
              ) : (
                <FiChevronDown className="text-[#697077] " />
              )}
            </div>
          </div>
          {/* test */}
          {/* <label
            onClick={() => {
              setAddNewPromotionModal(true);
            }}
            htmlFor={
              isEditing
                ? `add_spendxsavey_modal_${spendXSaveYDetails.id}`
                : "add_spendxsavey_modal_"
            }
            className="btn bg-[#42C2FF] w-[250px] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2"
          >
            + Add New Promotion (test)
          </label> */}
        </div>
        <Collapse isOpened={open.includes(1)}>
          <label
            onClick={() => {
              setAddNewPromotion(true);
            }}
            htmlFor={
              isEditing
                ? `add_spendxsavey_modal_${spendXSaveYDetails.id}`
                : "add_spendxsavey_modal_"
            }
            className="btn bg-[#42C2FF] w-[250px] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2"
          >
            + Add New Promotion
          </label>
          <div className="flex justify-between items-center gap-4 my-4">
            <div className="grid sm:grid-cols-1 md::grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 w-full">
              {spendxsavey?.results.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 justify-between  border border-[#DDE1E6] rounded-lg p-4"
                >
                  <div className="">
                    <h1 className="font-bold mb-2">{item.name}</h1>
                    <div className="relative">
                      <img
                        src={spendXsaveY}
                        alt=""
                        className="w-80 h-40 object-cover rounded relative"
                      />
                      <p className=" absolute top-0 left-1 text-white capitalize -mt-[2px] tracking-tighter">
                        {item?.name}
                      </p>
                      <p className=" absolute right-1 bottom-0 text-white capitalize tracking-tighter">
                        {item?.promo_option_detail?.name}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <label
                        onClick={() => editSpendXSaveY(item)}
                        htmlFor={
                          isEditing
                            ? `add_spendxsavey_modal_${spendXSaveYDetails.id}`
                            : "add_spendxsavey_modal_"
                        }
                        className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-2 flex items-center gap-2 cursor-pointer"
                      >
                        <BiEdit />
                        Modify
                      </label>
                      <button
                        onClick={() => deleteSpendXSaveY(item.id)}
                        className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-2 flex items-center gap-2"
                      >
                        <MdDeleteOutline className="text-2xl  cursor-pointer" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h1 className="">
                      Promotion: {item?.promo_option_detail?.name}
                    </h1>
                    <p className=" capitalize">Audience: {item?.audience}</p>
                    <p className="">
                      Duration:
                      {item?.durations?.map((duration, index) => (
                        <span
                          className="px-3 py-1 bg-gray-300 rounded-xl mt-1 mx-1 inline-block"
                          key={index}
                        >
                          {formatDate(duration?.start_date)} -{" "}
                          {formatDate(duration?.end_date)}
                        </span>
                      ))}
                    </p>

                    <p className=" capitalize">
                      Restaurant: {item?.restaurant_name}
                    </p>
                    <p className=" capitalize">
                      Location: {item?.location_name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Collapse>
      </div>
      {addNewPromotion && (
        <AddNewPromotionModal
          isEditing={isEditing}
          spendXSaveYDetails={spendXSaveYDetails}
          setAddNewPromotionModal={setAddNewPromotion}
        />
      )}
    </div>
  );
};

export default SpendXSaveY;
