import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { setSelectedRewardOption } from "../../../redux/features/Rewards/rewardsSlice";
const animatedComponents = makeAnimated();

// const SingleRewardInfinity = ({
//   loadItems,
//   setPromotion,
//   page,
//   setPage,
//   isMultiSelect,
//   handlePrizeSelect,
//   index,
//   defaultValue,
//   restaurantId
// }) => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [options, setOptions] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const itemsToLoad = loadItems?.results;
//   // todo: recheck the rendering hoook here with the dependencies
//   const fetchData = async () => {
//     const initialOptions = await itemsToLoad.slice(0, 10);

//     const formattedInitialOptions = initialOptions.map((item) => ({
//       label: item.name,
//       value: item.name,
//       id: item.id,
//     }));

//     setOptions(formattedInitialOptions);
//     // console.log(options, "options in useEffect");

//     setIsLoading(false);
//   };
//   useEffect(() => {
//     fetchData();

//   }, [itemsToLoad]);

//   // console.log(options, "options outside useEffect");

//   const fetchMoreOptions = async () => {
//     setIsLoading(true);

//     const totalCount = loadItems?.count;
//     // console.log(loadItems, "total items");
//     const totalPages = Math.ceil(totalCount / 10);

//     // console.log("totalPages", totalPages);
//     const newOptions = await itemsToLoad;

//     const formattedOptions = newOptions?.map((item) => ({
//       label: item.name,
//       value: item.name,
//       id: item.id,
//     }));

//     if (formattedOptions.length > 0) {
//       // console.log(page, totalPages);
//       if (page < totalPages) {
//         setPage((prevPage) => prevPage + 1);
//         setOptions((prevOptions) => {
//           return [...prevOptions, ...formattedOptions];
//         });
//       } else {
//         // console.log("All data has been loaded, you can stop further requests.");
//         setIsLoading(false);
//       }
//     } else {
//       // console.log("Handle the case where there's no more data to load.");
//       setIsLoading(false);
//     }
//   };

//   const handleInputChange = (inputValue) => {
//     // console.log("Input value changed:", inputValue);
//   };

//   const handleChange = (selectedOption) => {
//     setSelectedOption(selectedOption);

//     // Ensure selectedOption is an array
//     const selectedIds = Array.isArray(selectedOption)
//       ? selectedOption.map((item) => item.id)
//       : selectedOption && selectedOption.id
//       ? [selectedOption.id]
//       : [];

//     // Constructing an object similar to event object from the first select field
//     const fakeEvent = {
//       target: {
//         value: selectedIds,
//       },
//     };

//     // Calling handlePrizeSelect with constructed object
//     handlePrizeSelect(index, "reward_group", parseInt(fakeEvent.target.value));
//   };

//   return (
//     <Select
//       className="text-black !rounded-xl mt-3"
//       isSearchable
//       isClearable
//       options={options}
//       value={selectedOption}
//       onChange={handleChange}
//       onInputChange={handleInputChange}
//       isLoading={isLoading}
//       loadingMessage={() => "Loading..."}
//       onMenuScrollToBottom={fetchMoreOptions}
//       isMulti={isMultiSelect ? true : false}
//       components={animatedComponents}
//       closeMenuOnSelect={false}
//     />
//   );
// };

const SingleRewardInfinity = ({
  loadItems,
  setPromotion,
  page,
  setPage,
  isMultiSelect,
  handlePrizeSelect,
  index,
  defaultValue,
  restaurantId,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextUrl, setNextUrl] = useState(loadItems?.links?.next);
  const [prevUrl, setPrevUrl] = useState(loadItems?.links?.previous);
  const selectRef = useRef(null);

  // console.log("loadItems", loadItems);
  // console.log("selectedOption", selectedOption);
  // console.log("nextUrl", nextUrl);
  // console.log("prevUrl", prevUrl);

  const dispatch = useDispatch();

  useEffect(() => {
    if (loadItems?.results) {
      const formattedOptions = Object.values(loadItems.results).map((item) => ({
        label: item.name,
        value: item.name,
        id: item.id,
      }));
      setOptions((prevOptions) => [...prevOptions, ...formattedOptions]);
      setNextUrl(loadItems.links?.next);
    }
  }, [loadItems]);

  const fetchMoreOptions = async () => {
    if (!nextUrl) return;

    setIsLoading(true);

    try {
      const response = await fetch(nextUrl);
      const data = await response.json();

      const newOptions = data?.results?.map((item) => ({
        label: item.name,
        value: item.name,
        id: item.id,
      }));

      setOptions((prevOptions) => [...prevOptions, ...newOptions]);
      setNextUrl(data.links.next);
      setPrevUrl(data.links.previous);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching more options:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = (event) => {
    const { target } = event;
    const bottom =
      target.scrollHeight - target.scrollTop === target.clientHeight;

    if (bottom && nextUrl && !isLoading) {
      setIsLoading(true);
      fetchMoreOptions(nextUrl).then(() => {
        setIsLoading(false);
      });
    }
  };

  const fetchPreviousOptions = async () => {
    if (!prevUrl) return;

    setIsLoading(true);
    try {
      const response = await fetch(prevUrl);
      const data = await response.json();

      const newOptions = data?.results?.map((item) => ({
        label: item.name,
        value: item.name,
        id: item.id,
      }));

      setOptions((prevOptions) => [...newOptions, ...prevOptions]);
      setNextUrl(data.links.next);
      setPrevUrl(data.links.previous);
      setPage((prevPage) => prevPage - 1);
    } catch (error) {
      console.error("Error fetching previous options:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (inputValue) => {
    // console.log("Input value changed:", inputValue);
  };

  // const handleChange = (selectedOption) => {
  //   setSelectedOption(selectedOption);
  //   dispatch( setSelectedRewardOption(selectedOption));

  //   const selectedIds = Array.isArray(selectedOption)
  //     ? selectedOption.map((item) => item.id)
  //     : selectedOption && selectedOption.id
  //       ? [selectedOption.id]
  //       : [];

  //   const fakeEvent = {
  //     target: {
  //       value: selectedIds,
  //     },
  //   };

  //   handlePrizeSelect(index, "reward_group", parseInt(fakeEvent.target.value));
  // };

  /* disabled by adnan top code */

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);

    // Dispatch the selected option with the index to differentiate between rewards
    dispatch(setSelectedRewardOption({ index, selectedOption }));

    const selectedIds = Array.isArray(selectedOption)
      ? selectedOption.map((item) => item.id)
      : selectedOption && selectedOption.id
      ? [selectedOption.id]
      : [];

    const fakeEvent = {
      target: {
        value: selectedIds,
      },
    };

    handlePrizeSelect(index, "reward_group", parseInt(fakeEvent.target.value));
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
      onMenuScrollToBottom={handleScroll}
      onMenuScrollToTop={fetchPreviousOptions}
      isMulti={isMultiSelect ? true : false}
      components={animatedComponents}
      closeMenuOnSelect={false}
    />
  );
};

export default SingleRewardInfinity;
