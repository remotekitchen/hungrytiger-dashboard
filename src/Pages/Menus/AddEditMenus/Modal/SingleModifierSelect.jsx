import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useAddModifierItemsMutation } from "../../../../redux/features/modifierGroup/modifierGroupApi";

const animatedComponents = makeAnimated();

const SingleModifierSelect = ({
  loadItems,
  setPromotion,
  getSearchInput,
  setGetSearchInput,
  selectedRestarauntId,
  modifierGroupId,
}) => {
  // console.log(loadItems, 'loadItems');
  const [
    addModifierItems,
    {
      error: modifierItemsError,
      isLoading: modifierItemsLoading,
      isSuccess: modifierItemsSuccess,
    },
  ] = useAddModifierItemsMutation();

  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const itemsToLoad = loadItems;
  //   console.log(itemsToLoad, "itemsToLoad");

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
      modifier_item: modifierGroupId,
    };

    try {
      await addModifierItems(postData).unwrap();
    } catch (err) {
      // Errors will be handled by the mutation's state
    }
  };

  useEffect(() => {
    if (modifierItemsSuccess) {
      toast.success("Item added successfully");
    } else if (modifierItemsError) {
      toast.error(
        modifierItemsError.data?.non_field_errors || "Error adding item"
      );
    }
  }, [modifierItemsSuccess, modifierItemsError]);

  // console.log(options, "options");

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
      loadingMessage={() => "Loading..."}
      components={animatedComponents}
      closeMenuOnSelect={false}
    />
  );
};

export default SingleModifierSelect;
