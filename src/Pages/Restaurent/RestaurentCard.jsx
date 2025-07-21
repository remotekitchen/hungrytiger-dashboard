import React from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { useDeleteRestaurantMutation } from "../../redux/features/restaurentCreation/restaurentCreationApi";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const RestaurentCard = ({ item }) => {
  const { id, location, name, opening_hours, owner } = item || {};
  const [deleteRestaurant, { isLoading, isError, isSuccess }] =
    useDeleteRestaurantMutation();
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/restaurant/${id}`)}
      className="card w-96 bg-base-100 shadow-xl hover:scale-105 transition-all cursor-pointer"
    >
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h1 className="card-title text-3xl">{name}</h1>
          <AiFillDelete
            onClick={() => deleteRestaurant(id)}
            className="text-error hover:scale-105 hover:shadow-md cursor-pointer"
            size={24}
          />
        </div>
        <div>
          <div className="badge badge-outline">{location}</div>
        </div>
        {/* <div className="card-actions justify-end">
          <div className="tooltip" data-tip="Add A Category">
            <label
              htmlFor="categoryModal"
              className="btn btn-primary text-white  btn-sm bg-white text-black hover:bg-black hover:text-white"
            >
              <BiCategoryAlt />
            </label>
          </div>
        </div> */}
        {/* <button
            onClick={() => navigate(`/menus/all-menus/${id}`)}
            className="btn btn-primary text-white btn-sm bg-white text-black hover:bg-black hover:text-white"
          >
            Show Menu Details
          </button> */}
      </div>
    </div>
  );
};

export default RestaurentCard;
