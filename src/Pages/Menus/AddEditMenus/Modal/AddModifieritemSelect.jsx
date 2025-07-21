import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const AddModifierItemSelect = ({
  loadItems,
  setModifierItems,
  page,
  setPage,
  getSearchInput,
  setGetSearchInput,
  selectedRestarauntId,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  // console.log('🚀 ~ selectedOption:', selectedOption);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const itemsToLoad = loadItems?.results;
  // todo: recheck the rendering hook here with the dependencies
  const fetchData = async () => {
    const initialOptions = await itemsToLoad.slice(0, 10);

    const formattedInitialOptions = initialOptions.map((item) => ({
      label: item.name,
      value: item.name,
      id: item.id,
    }));

    setOptions(formattedInitialOptions);
    // console.log(options, 'options in useEffect');

    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
    setPage(1);
  }, [selectedRestarauntId, setPage, getSearchInput]);

  // console.log(options, 'options outside useEffect');

  const fetchMoreOptions = async () => {
    setIsLoading(true);

    const totalCount = loadItems?.count;
    // console.log(loadItems, 'total items');
    const totalPages = Math.ceil(totalCount / 10);

    // console.log('totalPages', totalPages);
    const newOptions = await itemsToLoad;

    const formattedOptions = newOptions?.map((item) => ({
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

    if (formattedOptions.length > 0) {
      // console.log(page, totalPages);
      if (page < totalPages) {
        setPage((prevPage) => prevPage + 1);
        setOptions((prevOptions) => {
          return [...prevOptions, ...formattedOptions];
        });
      } else {
        // console.log(
        // 	'All data has been loaded, you can stop further requests.'
        // );
        setIsLoading(false);
      }
    } else {
      // console.log("Handle the case where there's no more data to load.");
      setIsLoading(false);
    }
  };

  const handleInputChange = (inputValue) => {
    // // console.log("Input value changed:", inputValue);
    setGetSearchInput(inputValue);
  };

  const handleChange = (selected) => {
    setSelectedOption(selected);
    setModifierItems(selected.map((item) => item.id));

    // console.log(selected, 'selected123');
  };

  // Handle toast notifications for different states

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
      onFocus={() => fetchData()}
      loadingMessage={() => "Loading..."}
      onMenuScrollToBottom={fetchMoreOptions}
      components={animatedComponents}
      closeMenuOnSelect={false}
      isMulti
    />
  );
};

export default AddModifierItemSelect;
