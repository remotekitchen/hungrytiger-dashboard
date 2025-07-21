import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBinLine } from "react-icons/ri";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { useGetItemDetailsQuery } from "../../../../redux/features/itemCreation/itemCreationApi";
import { useUpdateModifierListOrderMutation } from "../../../../redux/features/modifierGroup/modifierDragApi";

const ModifierList = ({ deleteModifierItem, itemDetails }) => {
  // console.log("🚀 ~ ModifierList ~ modifiers:", modifiers);
  const { data: singleItem, refetch } = useGetItemDetailsQuery({
    itemId: itemDetails?.id,
  });

  // console.log(singleItem, 'singleItem');

  const modifiers = singleItem?.modifiergrouporder_set;
  console.log(modifiers, "modifierGroupOrder");
  const [items, setItems] = useState(modifiers || []);
  // console.log("🚀 ~ ModifierList ~ items:", items);
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOverItem, setDraggedOverItem] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (modifiers) {
      setItems(modifiers);
    }
  }, [modifiers]);

  const [updateModifierListOrder] = useUpdateModifierListOrderMutation();
  const handleDragStart = (index) => {
    setDraggedItem(index);
  };

  const handleDragEnter = (index) => {
    setDraggedOverItem(index);
  };

  const handleDragEnd = async () => {
    if (draggedItem !== null && draggedOverItem !== null) {
      const newList = [...items];
      const draggedItemContent = newList[draggedItem];
      newList.splice(draggedItem, 1);
      newList.splice(draggedOverItem, 0, draggedItemContent);
      setItems(newList);

      const updatedModifier = newList[draggedOverItem];
      const data = { order: draggedOverItem }; // Assuming the API expects an 'order' field

      try {
        await updateModifierListOrder({ id: updatedModifier.id, data });
        toast.success("Modifier order updated successfully");
      } catch (error) {
        toast.error("Failed to update modifier order");
      }
    }

    setDraggedItem(null);
    setDraggedOverItem(null);
  };

  // handle delete modifier item

  const handleDelete = async (id) => {
    try {
      await deleteModifierItem(id).unwrap();
      toast.success("Modifier deleted successfully");
    } catch (error) {
      console.error("error:", error?.message);
    }
  };

  console.log(items, "items");

  return (
    <div>
      {items &&
        items?.map((item, index) => (
          <p
            key={item?.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={handleDragEnd}
            className="p-2 bg-gray-200 mb-2 rounded cursor-move flex items-center gap-3"
          >
            <span>
              <RxDragHandleDots2 className="text-xl" />
            </span>{" "}
            <span className="items-center justify-between w-full inline-flex">
              {" "}
              {item?.name}{" "}
              <RiDeleteBinLine
                onClick={() => handleDelete(item?.id)}
                className="cursor-pointer text-2xl text-red-400 font-bold"
              />
            </span>
          </p>
        ))}
    </div>
  );
};

export default ModifierList;
