import { useEffect, useState } from "react";
import Select from "react-select";

const SingleCustomSelect = ({
  loadItems,
  setPromotion,
  page,
  setPage,
  setGetSearchInput,
  getSearchInput,
  restaurant,
  category,
}) => {
  // // console.log("🚀 ~ loadItems:", loadItems);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState<
    { label: string; value: string; id: string }[]
  >([]);
  // // console.log("🚀 ~ options:", options);
  const [isLoading, setIsLoading] = useState(true);

  const matchDefaultValues = loadItems?.filter((item) =>
    category?.includes(item.id)
  );

  const defaultValues = matchDefaultValues?.map((item) => ({
    label: item.name,
    value: item.name,
    id: item.id,
  }));

  // console.log(defaultValues, 'defaultValues');

  const itemsToLoad = loadItems;

  // // console.log(itemsToLoad, "itemsToLoad");
  // todo: recheck the rendering hoook here with the dependencies
  const fetchData = async () => {
    const initialOptions = await itemsToLoad.slice(0, 10);

    const formattedInitialOptions = initialOptions.map((item: any) => ({
      label: item.name,
      value: item.name,
      id: item.id,
    }));

    setOptions(formattedInitialOptions);
    // // console.log(options, "options in useEffect");

    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
    setPage(1);
  }, [getSearchInput, setPage, restaurant, itemsToLoad]);

  // // console.log(options, "options outside useEffect");

  const fetchMoreOptions = async () => {
    setIsLoading(true);

    const totalCount = loadItems?.length;
    // // console.log(loadItems, "total items");
    const totalPages = Math.ceil(totalCount / 10);

    // // console.log("totalPages", totalPages);
    const newOptions = await itemsToLoad;

    const formattedOptions = newOptions?.map((item) => ({
      label: item.name,
      value: item.name,
      id: item.id,
    }));

    if (formattedOptions.length > 0) {
      // console.log(page, totalPages);
      if (page < totalPages) {
        setPage((prevPage: any) => prevPage + 1);
        setOptions((prevOptions) => {
          return [...prevOptions, ...formattedOptions];
        });
      } else {
        // // console.log("All data has been loaded, you can stop further requests.");
        // // console.log("All data has been loaded, you can stop further requests.");
        // // console.log("All data has been loaded, you can stop further requests.");
        // // console.log("All data has been loaded, you can stop further requests.");
        // // console.log("All data has been loaded, you can stop further requests.");
        // // console.log("All data has been loaded, you can stop further requests.");
        setIsLoading(false);
      }
    } else {
      // // console.log("Handle the case where there's no more data to load.");
      setIsLoading(false);
    }
  };

  const handleInputChange = (inputValue: any) => {
    // // console.log("Input value changed:", inputValue);
    setGetSearchInput(inputValue);
  };

  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);

    setPromotion(selectedOption?.id);
  };

  // // console.log("selectedOptionsss", selectedOption);

  return (
    <Select
      className="text-black !rounded-xl mt-3"
      isSearchable
      isClearable
      options={options}
      value={selectedOption || defaultValues}
      onChange={handleChange}
      onInputChange={handleInputChange}
      isLoading={isLoading}
      loadingMessage={() => "Loading..."}
      onMenuScrollToBottom={fetchMoreOptions}
      closeMenuOnSelect={false}
    />
  );
};

export default SingleCustomSelect;
