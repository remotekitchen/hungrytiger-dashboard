import React, { useEffect, useState } from "react";
import { Collapse } from "react-collapse";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../Components/Loading";
import {
  useDeleteVoucherMutation,
  useGetVoucherQuery,
} from "../../../redux/features/Voucher/voucherApi";
import { selectedVoucher } from "../../../redux/features/Voucher/voucherSlice";
import AddVoucherModal from "../Modal/AddVoucherModal";

const Voucher = () => {
  const [open, setOpen] = useState([]);
  const [addVoucher, setAddVoucher] = useState(false);

  const dispatch = useDispatch();
  const editVoucher = (item) => {
    setAddVoucher(true);
    dispatch(selectedVoucher({ isEditing: true, selectedVoucherData: item }));
  };

  const { data: voucher, isLoading: voucherIsLoading } = useGetVoucherQuery();
  // console.log("🚀 ~ Voucher ~ voucher:", voucher);

  const [deleteVoucher, { isSuccess, isLoading: deleteVoucherLoading }] =
    useDeleteVoucherMutation();

  const toggle = (index) => {
    if (open.includes(index)) {
      setOpen(open.filter((item) => item !== index));
    } else {
      setOpen([...open, index]);
    }
  };

  const { selectedVoucher: selectedVoucherSelector } = useSelector(
    (state) => state.voucher
  );

  const { isEditing, voucherDetails } = selectedVoucherSelector;

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully deleted a voucher");
    }
  }, [isSuccess]);
  return (
    <div className="overflow-x-auto">
      <div>
        <div
          className="flex justify-between items-center text-left shadow rounded border bg-[#F2F4F8] p-2 cursor-pointer mb-2"
          onClick={() => toggle(1)}
        >
          <div className="">Voucher</div>

          <div className="flex items-center gap-2">
            <div className="text-[30px]">
              {open.includes(1) ? (
                <FiChevronUp className="text-[#697077] " />
              ) : (
                <FiChevronDown className="text-[#697077] " />
              )}
            </div>
          </div>
        </div>
        <Collapse isOpened={open.includes(1)}>
          <div>
            <div className="overflow-x-auto bg-transparent my-5 rounded-lg">
              <table className="table">
                {/* head */}
                <thead>
                  <tr className="bg-base-200 border-b-2 border-gray-500 border-opacity-20 text-[14px] ">
                    <th>Promotion Name</th>
                    <th>Duration</th>
                    <th>Restaurant</th>
                    <th>Location</th>
                    <th>Voucher Code</th>
                    <th>Availability</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="">
                  {/* row 1 */}
                  {voucherIsLoading ? (
                    <Loading />
                  ) : (
                    voucher?.results
                      ?.filter((d) => d?.restaurant)
                      .map((item, index) => (
                        <tr key={item?.id} className="">
                          <td>{item?.name}</td>
                          <td>
                            <p className="">
                              {item?.durations?.length > 0
                                ? item?.durations?.map((duration, index) => (
                                    <span key={index}>
                                      {duration?.start_date.slice(0, 10)} -{" "}
                                      {duration?.end_date.slice(0, 10)}
                                    </span>
                                  ))
                                : "Not Available"}
                            </p>
                          </td>
                          <td>{item?.restaurant}</td>
                          <td>{item?.location}</td>
                          <td>{item?.voucher_code}</td>
                          <td className="">{item?.available_to}</td>
                          <td>
                            <div className="flex items-center gap-3">
                              <label
                                onClick={() => editVoucher(item)}
                                htmlFor={
                                  isEditing
                                    ? `add_voucher_${voucherDetails.id}`
                                    : "add_voucher_"
                                }
                                className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-2 flex items-center gap-2 cursor-pointer"
                              >
                                <BiEdit className="text-2xl  cursor-pointer" />
                                Modify
                              </label>
                              <button
                                onClick={() => deleteVoucher(item.id)}
                                className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-2 flex items-center gap-2"
                              >
                                <MdDeleteOutline className="text-2xl  cursor-pointer" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
                <label
                  onClick={() => setAddVoucher(true)}
                  htmlFor={
                    isEditing
                      ? `add_voucher_${voucherDetails.id}`
                      : "add_voucher_"
                  }
                  className="btn bg-[#42C2FF] w-[250px] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2"
                  // disabled={bogo?.results?.length >= 1}
                >
                  + Add New Promotion
                </label>
              </table>
            </div>
          </div>
        </Collapse>
      </div>
      {addVoucher && (
        <AddVoucherModal
          isEditing={isEditing}
          voucherDetails={voucherDetails}
          addVoucher={addVoucher}
          setAddVoucher={setAddVoucher}
        />
      )}
    </div>
  );
};

export default Voucher;
