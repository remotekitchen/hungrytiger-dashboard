import React, { useEffect, useState } from "react";
import { Collapse } from "react-collapse";
import { BiEdit, BiSearch } from "react-icons/bi";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import toast from "react-hot-toast";
import { MdDeleteOutline } from "react-icons/md";
import Loading from "../../Components/Loading";
import {
  useDeleteMenuMutation,
  useGetAllMenuQuery,
} from "../../redux/features/menuCreation/menuCreationApi";
import AddMenuModal from "./AddEditMenus/Modal/AddMenuModal";
import EditMenuModal from "./AddEditMenus/Modal/EditMenuModal";

const Menu = () => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [openItems, setOpenItems] = useState([]);
  const [addMenuModal, setAddMenuModal] = useState(false);
  const [editMenuModal, setEditMenuModal] = useState(false);
  const [editMenu, setEditMenu] = useState("");
  const { data: allMenus, isLoading, isError, error } = useGetAllMenuQuery();

  const handleEditMenu = (item) => {
    setEditMenu(item);
    setEditMenuModal(true);
  };

  const toggle = (index) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter((item) => item !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };

  const [deleteMenu, { isSuccess }] = useDeleteMenuMutation();

  useEffect(() => {
    if (isSuccess) toast.success("Successfully deleted a menu");
  }, [isSuccess]);

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="flex justify-between items-center mt-3">
        <button
          onClick={() => setAddMenuModal(true)}
          className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg"
        >
          + New Menu
        </button>

        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-l-lg p-1 outline-none px-10 w-[250px]"
            />
            <div className=" absolute top-1 right-3">
              <BiSearch className="text-2xl text-[#697077]" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="overflow-x-auto mt-3">
          {allMenus?.results?.map((item, index) => (
            <div key={item.id}>
              <div className="flex justify-between items-center text-left border border-gray-300 p-2">
                <div className="">{item.title}</div>
                {/* <span className="">{item.duration}</span> */}
                <div className="">Mon- Friday 10:00AM - 10:00PM</div>
                <div className="flex items-center gap-2">
                  <BiEdit
                    onClick={() => handleEditMenu(item)}
                    className="text-xl text-[#697077] ml-3 cursor-pointer"
                  />
                  <MdDeleteOutline
                    onClick={() => deleteMenu(item.id)}
                    className="text-xl text-[#697077] ml-3 cursor-pointer"
                  />
                  <div className="text-[30px]" onClick={() => toggle(index)}>
                    {openItems.includes(index) ? (
                      <FiChevronUp className="text-[#697077] " />
                    ) : (
                      <FiChevronDown className="text-[#697077] " />
                    )}
                  </div>
                </div>
              </div>
              <Collapse isOpened={openItems.includes(index)}>
                <div className="px-2 pb-[20px] text-sm border-l border-r border-b border-[#D1D5DB]">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="border border-gray-300 mt-4 bg-[#42C2FF] p-2 flex text-white">
                        {weekdays.map((day, index) => (
                          <div
                            key={index}
                            className="border border-gray-300 p-2 flex items-center justify-center w-12"
                          >
                            {day}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex mt-2">
                      <input
                        type="time"
                        className="border border-gray-300 rounded-lg px-2 py-1 outline-none"
                      />
                      <input
                        type="time"
                        className="border border-gray-300 rounded-lg px-2 py-1 outline-none"
                      />
                    </div>
                    <div>
                      <button className="bg-gray-400 text-white px-4 py-2 rounded-lg mt-2">
                        {" "}
                        Save Changes{" "}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-6">
                    <div>5 Categories</div>
                    <div>50 Items</div>
                    <div>
                      <button className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg">
                        {" "}
                        More Edit
                      </button>
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>
          ))}
        </div>
      </div>
      <AddMenuModal
        addMenuModal={addMenuModal}
        setAddMenuModal={setAddMenuModal}
      />
      <EditMenuModal
        editMenuModal={editMenuModal}
        setEditMenuModal={setEditMenuModal}
        editMenu={editMenu}
        setEditMenu={setEditMenu}
      />
    </div>
  );
};

export default Menu;
