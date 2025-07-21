import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { selecteditem } from "../../../redux/features/itemCreation/itemCreationSlice";
import EditItemModal from "../../Items/EditItemModal/EditItemModal";

const MenuItemsTableRow = ({ data }) => {
  const { base_price, name, locations, images, description, id } = data || {};
  const dispatch = useDispatch();
  const [isEditItemModaOpen, setIsEditItemModalOpen] = useState(false);
  return (
    <tr className="">
      <th></th>
      <td>
        <div className="avatar">
          <div className="w-24 rounded-xl">
            <img
              src={
                images[0]?.remote_url
                  ? images[0]?.remote_url
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZxeriEHXP4Ybny2R8TQ1kHmoSvagWlBSCHRze2yNi&s"
              }
            />
          </div>
        </div>
      </td>
      <td>{name}</td>
      <td className="">{description}</td>
      <td>{base_price}</td>
      <th className="flex ">
        <label
          onClick={() => {
            dispatch(selecteditem(data));
            setIsEditItemModalOpen(true);
          }}
          htmlFor={`editItemModal-${id}`}
          className="btn me-2 btn-primary text-white btn-sm"
        >
          Edit
        </label>
        <button name="delete" className="btn btn-primary text-white btn-sm">
          Delete
        </button>
      </th>
      {/* edit item modal */}
      {isEditItemModaOpen && (
        <EditItemModal
          setIsEditItemModalOpen={setIsEditItemModalOpen}
          itemId={id}
        />
      )}
    </tr>
  );
};

export default MenuItemsTableRow;
