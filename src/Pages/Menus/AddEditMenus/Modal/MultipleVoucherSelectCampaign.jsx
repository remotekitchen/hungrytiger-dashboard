import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const MultipleVoucherSelectCampaign = ({
  loadItems,
  setPromotion,
  getSearchInput,
  setGetSearchInput,
  selectedRestarauntId,
  voucherDetails,
  isLoading,
}) => {
  const [selectedOption, setSelectedOption] = useState([]);
  const [options, setOptions] = useState([]);

  // Fetch and format the options based on the loadItems data
  useEffect(() => {
    if (loadItems?.length) {
      const formattedOptions = loadItems.map((item) => ({
        label: item.name,
        value: item.name,
        // Ensure reward_set exists and has at least one item
        id: item?.reward_set?.length ? item.reward_set[0].id : null,
      }));
      setOptions(formattedOptions);
    }
  }, [loadItems]);

  // Match default values based on voucherDetails and set selectedOption
  useEffect(() => {
    if (loadItems?.length && voucherDetails?.reward) {
      // Convert voucherDetails.reward to an array if it's not already
      const rewardArray = Array.isArray(voucherDetails.reward)
        ? voucherDetails.reward
        : [voucherDetails.reward];

      const matchedValues = loadItems
        .filter((item) => rewardArray.includes(item.id))
        .map((item) => ({
          label: item.name,
          value: item.name,
          id: item?.reward_set[0].id,
        }));
      setSelectedOption(matchedValues);
    }
  }, [loadItems, voucherDetails]);

  const handleInputChange = (inputValue) => {
    setGetSearchInput(inputValue);
  };

  const handleChange = (selected) => {
    setSelectedOption(selected);
    setPromotion(selected?.id);
  };

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

export default MultipleVoucherSelectCampaign;
