import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const MultipleItemsSelectCampaign = ({
  loadItems,
  setPromotion,
  getSearchInput,
  setGetSearchInput,
  selectedRestarauntId,
  bogoDetails,
  isLoading,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);

  const itemsToLoad = loadItems;

  // Match default values based on bogoDetails
  useEffect(() => {
    const matchDefaultValues = loadItems?.filter((item) =>
      bogoDetails?.items?.includes(item.id)
    );

    const defaultValues = matchDefaultValues?.map((item) => ({
      label: item.name,
      value: item.name,
      id: item.id,
    }));

    setSelectedOption(defaultValues);
    setPromotion(defaultValues?.map((item) => item.id));
  }, [loadItems, bogoDetails]);

  // Fetch and format the options based on the loadItems data
  const fetchData = async () => {
    const formattedOptions = itemsToLoad.map((item) => ({
      label: (
        <>
          {item.name}
          <span className="px-2 bg-blue-300 rounded-lg text-white py-[1px] ml-2">
            ${item?.base_price}
          </span>
        </>
      ),
      value: item.name,
      id: item.id,
    }));

    setOptions(formattedOptions);
  };

  //   useEffect(() => {
  //     fetchData();
  //   }, [selectedRestarauntId, getSearchInput, loadItems]);

  const handleInputChange = (inputValue) => {
    setGetSearchInput(inputValue);
  };

  const handleChange = (selected) => {
    setSelectedOption(selected);
    setPromotion(selected?.map((item) => item.id));
  };

  return (
    <Select
      className="text-black !rounded-xl mt-3 w-full grid col-span-8"
      isSearchable
      isClearable
      options={options}
      value={selectedOption} // This is controlled by state, including default values
      onChange={handleChange}
      onFocus={() => fetchData()}
      onInputChange={handleInputChange}
      isLoading={isLoading}
      loadingMessage={() => "Loading..."}
      isMulti
      components={animatedComponents}
      closeMenuOnSelect={false}
    />
  );
};

export default MultipleItemsSelectCampaign;
