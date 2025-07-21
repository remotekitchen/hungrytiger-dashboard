import React, { useEffect, useState } from "react";
import { Collapse } from "react-collapse";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import { FaPlay, FaRegStopCircle } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../Components/Loading";
import {
  useDeleteBogoMutation,
  useGetBogoQuery,
  useUpdateBogoMutation,
} from "../../../redux/features/bogo/bogoApi";
import { selectedBogo } from "../../../redux/features/bogo/bogoSlice";
import AddBogoModal from "../Modal/AddBogoModal";
const Bogo = () => {
  const [open, setOpen] = useState([]);
  const [addBogo, setAddBogo] = useState(false);

  const dispatch = useDispatch();
  const editBogo = (item) => {
    setAddBogo(true);
    dispatch(selectedBogo({ isEditing: true, selectedBogoData: item }));
  };

  const { data: bogo, isLoading: bogoLoading } = useGetBogoQuery();

  // // console.log(bogo?.results?.length, "bogoooooooItems");
  // // console.log("Bogo",bogo)

  const [deleteBogo, { isSuccess }] = useDeleteBogoMutation();

  const [updateBogo] = useUpdateBogoMutation();

  const handleToggle = async (item) => {
    try {
      const updatedBogoItem = {
        is_disabled: !item.is_disabled,
      };

      await updateBogo({ id: item?.id, bogoItem: updatedBogoItem }).unwrap();
      toast.success("Status Updated");
    } catch (error) {
      console.error("Failed to update the BOGO item: ", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully deleted a Bogo promotion");
    }
  }, [isSuccess]);

  const toggle = (index) => {
    if (open.includes(index)) {
      setOpen(open.filter((item) => item !== index));
    } else {
      setOpen([...open, index]);
    }
  };

  const { selectedBogo: selectedBogoSelector } = useSelector(
    (state) => state.bogo
  );

  const { isEditing, bogoDetails } = selectedBogoSelector;

  return (
    <div className="overflow-x-auto">
      <div>
        <div
          className="flex justify-between items-center text-left shadow rounded border bg-[#F2F4F8] p-2 cursor-pointer mb-2"
          onClick={() => toggle(1)}
        >
          <div className="">Bogo</div>

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
          {/* <div className="flex justify-between items-center gap-4 my-4">
            <div className="grid sm:grid-cols-1 md::grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 w-full">
              {bogo?.results?.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 justify-between  border border-[#DDE1E6] rounded-lg p-4"
                >
                  <div className="">
                    <h1 className="font-bold mb-2">{item.name}</h1>
                    <div className="relative">
                      <img
                        src={bogoImg}
                        alt=""
                        className="w-80 h-40 object-cover rounded relative"
                      />
                      <p className=" absolute top-0 left-1 text-white capitalize -mt-[2px] tracking-tighter">
                        {item?.name}
                      </p>
                      <p className=" absolute right-1 bottom-0 text-white capitalize tracking-tighter">
                        Buy 1 Get 1
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <label
                        onClick={() => editBogo(item)}
                        htmlFor={
                          isEditing ? `add_bogo_${bogoDetails.id}` : "add_bogo_"
                        }
                        className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-2 flex items-center gap-2 cursor-pointer"
                      >
                        <BiEdit />
                        Modify
                      </label>
                      <button
                        onClick={() => deleteBogo(item.id)}
                        className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-2 flex items-center gap-2"
                      >
                        <MdDeleteOutline className="text-2xl  cursor-pointer" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h1 className="">Items: {item?.item_names}</h1>
                    <p className=" ">Audience: {item?.audience}</p>
                    <p className="">
                      Duration:
                      {item?.durations?.map((duration, index) => (
                        <span key={index}>
                          {duration?.start_date.slice(0, 10)} -{" "}
                          {duration?.end_date.slice(0, 10)}
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
          </div> */}

          {/* bogo details  */}
          <div className="py-5">
            <h1 className="text-4xl font-bold">Buy 1, Get 1 Free</h1>
            <p className="border-b-2 border-gray-300 pt-4 pb-2 border-opacity-40">
              History
            </p>
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
                      <th>Audience</th>
                      <th>Items</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {/* row 1 */}
                    {bogoLoading ? (
                      <Loading />
                    ) : (
                      bogo?.results
                        ?.filter((item) => item?.restaurant)
                        .map((item, index) => (
                          <tr key={item?.id} className="">
                            <td>{item?.name}</td>
                            <td>
                              <p className="">
                                {item?.durations?.map((duration, index) => (
                                  <span key={index}>
                                    {duration?.start_date.slice(0, 10)} -{" "}
                                    {duration?.end_date.slice(0, 10)}
                                  </span>
                                ))}
                              </p>
                            </td>
                            <td>{item?.restaurant}</td>
                            <td>{item?.location}</td>
                            <td>{item?.audience}</td>
                            <td>{item?.item_names}</td>
                            <td>
                              <div className="flex items-center gap-3">
                                <label
                                  onClick={() => handleToggle(item)}
                                  className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-2 flex items-center gap-2 cursor-pointer"
                                >
                                  {item?.is_disabled ? (
                                    <span className="flex items-center gap-2">
                                      <FaPlay className="text-xl  cursor-pointer" />
                                    </span>
                                  ) : (
                                    <span className="flex items-center gap-2">
                                      <FaRegStopCircle className="text-2xl  cursor-pointer" />
                                    </span>
                                  )}
                                </label>
                                <label
                                  onClick={() => editBogo(item)}
                                  htmlFor={
                                    isEditing
                                      ? `add_bogo_${bogoDetails.id}`
                                      : "add_bogo_"
                                  }
                                  className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-2 flex items-center gap-2 cursor-pointer"
                                >
                                  <BiEdit className="text-2xl  cursor-pointer" />
                                  Modify
                                </label>
                                <button
                                  onClick={() => deleteBogo(item.id)}
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
                    onClick={() => setAddBogo(true)}
                    htmlFor={
                      isEditing ? `add_bogo_${bogoDetails.id}` : "add_bogo_"
                    }
                    className="btn bg-[#42C2FF] w-[250px] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2"
                    // disabled={bogo?.results?.length >= 1}
                  >
                    + Add New Promotion
                  </label>
                </table>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
      {addBogo && (
        <AddBogoModal
          isEditing={isEditing}
          bogoDetails={bogoDetails}
          addBogo={addBogo}
          setAddBogo={setAddBogo}
        />
      )}
    </div>
  );
};

export default Bogo;
