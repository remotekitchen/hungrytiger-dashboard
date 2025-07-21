import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useAddModifierUsedByItemsMutation } from "../../../../redux/features/modifierGroup/modifierGroupApi";

const animatedComponents = makeAnimated();

const EditModifierUsedBySelect = ({
  loadItems,
  setPromotion,
  getSearchInput,
  setGetSearchInput,
  selectedRestarauntId,
  modifierGroupId,
}) => {
  const [
    addModifierUsedByItems,
    {
      error: modifierUsedByItemsError,
      isLoading: modifierUsedByItemsLoading,
      isSuccess: modifierUsedByItemsSuccess,
    },
  ] = useAddModifierUsedByItemsMutation();

  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const itemsToLoad = loadItems;
  // console.log(options, "get-items-to-load");

  useEffect(() => {
    const loadOptions = async () => {
      if (itemsToLoad && Array.isArray(itemsToLoad)) {
        const formattedOptions = itemsToLoad.map((item) => ({
          label: (
            <>
              {item.name},
              <span className="px-2 bg-blue-300 rounded-lg text-white py-[1px] ml-2">
                ${item?.base_price}
              </span>
            </>
          ),
          value: item.name,
          id: item.id,
        }));
        setOptions(formattedOptions);
      }
      setIsLoading(false);
    };
    loadOptions();
  }, [selectedRestarauntId, getSearchInput, itemsToLoad]);

  const handleInputChange = (inputValue) => {
    setGetSearchInput(inputValue);
  };

  const handleChange = async (selected) => {
    setSelectedOption(selected);
    setPromotion(selected?.id);

    const menuItemId = selected?.id;

    const postData = {
      menu_item: menuItemId,
      modifier_group: modifierGroupId,
    };

    try {
      await addModifierUsedByItems(postData).unwrap();
    } catch (err) {
      // Errors will be handled by the mutation's state
    }
  };

  // Handle toast notifications for different states
  useEffect(() => {
    if (modifierUsedByItemsSuccess) {
      toast.success("Item added successfully");
    } else if (modifierUsedByItemsError) {
      toast.error(
        modifierUsedByItemsError.data?.non_field_errors || "Error adding item"
      );
    }
  }, [modifierUsedByItemsSuccess, modifierUsedByItemsError]);

  return (
    <Select
      className="text-black !rounded-xl mt-3 w-full grid col-span-8"
      isSearchable
      isClearable
      options={options}
      value={selectedOption}
      onChange={handleChange}
      onInputChange={handleInputChange}
      isLoading={isLoading}
      onFocus={() => setIsLoading(true)}
      loadingMessage={() => "Loading..."}
      components={animatedComponents}
      closeMenuOnSelect={false}
    />
  );
};

export default EditModifierUsedBySelect;
