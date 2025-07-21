import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const RewardListSelect = ({
  loadItems,
  setPromotion,
  page,
  setPage,
  isMultiSelect,
  setGetSearchInput,
  selectedRestarauntId,
  getSearchInput,
}) => {
  // // console.log(
  //   "Test Console--------",
  //   loadItems,
  //   page,
  //   setGetSearchInput,
  //   selectedRestarauntId,
  //   getSearchInput
  // );

  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const itemsToLoad = loadItems?.results;
  // todo: recheck the rendering hoook here with the dependencies
  const fetchData = async () => {
    const initialOptions = await itemsToLoad.slice(0, 10);
    // // console.log(
    //   "🚀 ~ fetchData ~ initialOptions:",
    //   initialOptions[0]?.reward_group_name
    // );

    const formattedInitialOptions = initialOptions.map((item) => ({
      label: `${item?.reward_group_name}, ${item?.amount}, ${item?.offer_type}`,
      value: `${item?.reward_group_name}, ${item?.amount}, ${item?.offer_type}`,
      id: item?.id,
    }));

    setOptions(formattedInitialOptions);
    // // console.log(options, "options in useEffect");

    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
    setPage(1);
  }, [selectedRestarauntId, setPage, getSearchInput]);

  // // console.log(options, "options outside useEffect");

  const fetchMoreOptions = async () => {
    setIsLoading(true);

    const totalCount = loadItems?.count;
    // // console.log(loadItems, "total items");
    const totalPages = Math.ceil(totalCount / 10);

    // // console.log("totalPages", totalPages);
    const newOptions = await itemsToLoad;

    const formattedOptions = newOptions?.map((item) => ({
      label: `${item?.reward_group_name}, ${item?.amount}, ${item?.offer_type}`,
      value: `${item?.reward_group_name}, ${item?.amount}, ${item?.offer_type}`,
      id: item?.id,
    }));

    if (formattedOptions.length > 0) {
      // // console.log(page, totalPages);
      if (page < totalPages) {
        setPage((prevPage) => prevPage + 1);
        setOptions((prevOptions) => {
          return [...prevOptions, ...formattedOptions];
        });
      } else {
        // // console.log("All data has been loaded, you can stop further requests.");
        setIsLoading(false);
      }
    } else {
      // // console.log("Handle the case where there's no more data to load.");
      setIsLoading(false);
    }
  };

  const handleInputChange = (inputValue) => {
    // // console.log("Input value changed:", inputValue);
    setGetSearchInput(inputValue);
  };

  const handleChange = (selectedOption) => {
    // console.log("🚀 ~ handleChange ~ selectedOption:", selectedOption);

    setSelectedOption(selectedOption);
    // setPromotion(selectedOption?.map((item) => item.id));
    setPromotion(selectedOption?.id);
  };

  return (
    <Select
      className="text-black !rounded-xl mt-3"
      isSearchable
      isClearable
      options={options}
      value={selectedOption}
      onChange={handleChange}
      onInputChange={handleInputChange}
      isLoading={isLoading}
      loadingMessage={() => "Loading..."}
      onMenuScrollToBottom={fetchMoreOptions}
      isMulti={isMultiSelect ? true : false}
      components={animatedComponents}
      closeMenuOnSelect={false}
    />
  );
};

export default RewardListSelect;
