import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import Loading from "../../../Components/Loading";
import { createArray } from "../../../core/utils";
import {
  useDeleteMenuMutation,
  useGetAllMenuQuery,
} from "../../../redux/features/menuCreation/menuCreationApi";
import EditMenuModal from "./Modal/EditMenuModal";

const Overview = () => {
  const [editMenuModal, setEditMenuModal] = useState(false);
  const [editMenu, setEditMenu] = useState("");

  const handleEditMenu = (item) => {
    setEditMenu(item);
    setEditMenuModal(true);
  };
  const [selectedPage, setSelectedPage] = useState(1);
  const {
    data: allMenus,
    isLoading,
    isError,
    error,
  } = useGetAllMenuQuery({ page: selectedPage });
  // // console.log("🚀 ~ Overview ~ allMenus:", allMenus);

  const [deleteMenu, { isSuccess }] = useDeleteMenuMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully deleted a menu");
    }
  }, [isSuccess]);

  if (isLoading) return <Loading />;
  //   // console.log(allMenus?.results, "all menus");
  // const pageArr = createArray(allMenus);
  const pageArr = allMenus?.results ? createArray(allMenus) : [];

  return (
    <div className="mt-3">
      <div className="flex justify-between items-center gap-4">
        <div className="grid sm:grid-cols-1 md::grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 w-full">
          {allMenus?.results?.map((menu, index) => (
            <div
              key={index}
              className="flex gap-4 justify-between items-center border border-[#DDE1E6] rounded-lg p-4"
            >
              <div className="">
                <h1 className="text-2xl font-bold capitalize">{menu.title}</h1>
                <p className=" capitalize">
                  Restaurant Name: {menu.restaurant_name}
                </p>
                <p className="capitalize">
                  Location Name: {menu.location_names}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditMenu(menu)}
                    className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-2 flex items-center gap-2"
                  >
                    <BiEdit /> Edit Menu
                  </button>
                  <Link
                    to={`${
                      import.meta.env.VITE_API_ROOT
                    }api/food/v1/menu-export/${menu?.id}/`}
                    className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-2 flex items-center gap-2"
                    download
                  >
                    Export to excel
                  </Link>
                </div>
              </div>
              <div className="">
                <h1 className="">Availability: {}</h1>
                <p className=" ">Number of Categories: {menu.category_cnt}</p>
                <p className="">Number of Items: {menu.item_cnt}</p>
                {/* <div className="flex items-center gap-2">
                  <button
                    onClick={() => deleteMenu(menu.id)}
                    className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-2 flex items-center gap-2"
                  >
                    <MdDeleteOutline className="text-2xl  cursor-pointer" />
                  </button>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-10/12">
        {pageArr && (
          <div className="join flex-wrap">
            {pageArr.map((page) => (
              <button
                onClick={() => {
                  setSelectedPage(page);
                }}
                key={page}
                className={`join-item my-1 btn btn-sm ${
                  selectedPage === page && "btn-active"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
      <EditMenuModal
        editMenuModal={editMenuModal}
        setEditMenuModal={setEditMenuModal}
        editMenu={editMenu}
        setEditMenu={setEditMenu}
      />
    </div>
  );
};

export default Overview;
