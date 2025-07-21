import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const SingleDishCardInfinity = ({
  loadItems,
  setPromotion,
  isMultiSelect,
  setGetSearchInput,
  getSearchInput,
  reward,
  isLoading,
}) => {
  // console.log('reward', reward);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);

  const itemsToLoad = loadItems;

  const matchDefaultValues = itemsToLoad?.filter((item) =>
    reward?.includes(item.id)
  );

  const defaultValues = matchDefaultValues?.map((item) => ({
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

  // console.log(defaultValues, 'defaultValues');

  // This useEffect will set the options once itemsToLoad is available
  useEffect(() => {
    if (itemsToLoad?.length > 0) {
      const formattedOptions = itemsToLoad?.map((item) => ({
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
  }, [itemsToLoad]);

  const handleInputChange = (inputValue) => {
    setGetSearchInput(inputValue);
  };

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);

    setPromotion(
      isMultiSelect
        ? selectedOption.map((item) => item.id)
        : parseInt(selectedOption.id)
    );
  };

  return (
    <Select
      className="text-black !rounded-xl mt-3"
      isSearchable
      isClearable
      options={options}
      value={selectedOption || defaultValues}
      onChange={handleChange}
      isLoading={isLoading}
      onInputChange={handleInputChange}
      isMulti={isMultiSelect}
      components={animatedComponents}
      loadingMessage={() => "Loading..."}
      closeMenuOnSelect={false}
    />
  );
};

export default SingleDishCardInfinity;
