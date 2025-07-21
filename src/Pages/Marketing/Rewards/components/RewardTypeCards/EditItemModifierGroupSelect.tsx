import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useUpdateItemMutation } from '../../../../../redux/features/itemCreation/itemCreationApi';
import { set } from 'react-ga';
import toast from 'react-hot-toast';

const animatedComponents = makeAnimated();

const EditItemModifierGroupSelect = ({
	loadItems,
	setPromotion,
	page,
	setPage,
	isMultiSelect,
	setGetSearchInput,
	selectedRestarauntId,
	getSearchInput,
	menuName,
	category,
	restaurant,
	reward,
	modifiers,
	deleteModifierSuccess,
	id,
}) => {
	// console.log(id, 'modifierId');
	// console.log('reward123', reward);
	// console.log(loadItems?.results, 'LoadItemss');
	// console.log(modifiers, 'LoadItems');

	// const [
	// 	updateItem,
	// 	{
	// 		isLoading: updatedItemLoading,
	// 		isError: updatedItemError,
	// 		isSuccess: isUpdatedItemSuccess,
	// 		data,
	// 	},
	// ] = useUpdateItemMutation();

	const [selectedOption, setSelectedOption] = useState(null);
	const [options, setOptions] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const matchDefaultValues = loadItems?.results?.filter((item) =>
		reward?.includes(item.id)
	);

	const defaultValues = matchDefaultValues?.map((item) => ({
		label: item.name,
		value: item.name,
		id: item.id,
	}));

	const getMainArray = loadItems?.results;

	// Log the structure of modifier_group
	const modifierGroupIds = modifiers
		?.flatMap((data) => {
			// console.log(data?.modifier_group, 'Modifier Group Structure'); // Log the structure
			if (Array.isArray(data?.modifier_group)) {
				// Handle case where modifier_group is an array
				return data.modifier_group.map((data2) => {
					// console.log(data2?.id, 'Modifier Group ID'); // Log each ID
					return parseInt(data2?.id);
				});
			} else if (
				typeof data?.modifier_group === 'object' &&
				data?.modifier_group !== null
			) {
				// Handle case where modifier_group is a single object
				// console.log(
				// 	data?.modifier_group?.id,
				// 	'Single Modifier Group ID'
				// );
				return [parseInt(data?.modifier_group?.id)];
			}
			return [];
		})
		?.filter((id) => id !== undefined); // Ensure no undefined values

	// console.log(modifierGroupIds, 'Extracted Modifier Group IDs'); // Final log to see the IDs

	// Step 2: Filter out items from itemsToLoad that match any of the modifierGroupIds
	const itemsToLoad = getMainArray?.filter(
		(item) => !modifierGroupIds?.includes(parseInt(item?.id))
	);

	// console.log(itemsToLoad, 'Filtered Load Items');

	// todo: recheck the rendering hoook here with the dependencies
	const fetchData = async () => {
		const initialOptions = await itemsToLoad.slice(0, 10);

		const formattedInitialOptions = initialOptions.map((item) => ({
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
	}, [
		selectedRestarauntId,
		setPage,
		getSearchInput,
		category,
		deleteModifierSuccess,
	]);

	// // console.log(options, "options outside useEffect");

	const fetchMoreOptions = async () => {
		setIsLoading(true);

		const totalCount = loadItems?.count;
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
		// Update the selected option in the component state
		setSelectedOption(selectedOption);
		// console.log(selectedOption, 'selectedOption');
		setPromotion(selectedOption?.map((item) => item.id));

		// Prepare the data for the updateItem mutation
		// const updateData = {
		// 	id, // The ID to be passed in the URL
		// 	item: {
		// 		modifiers: selectedOption?.map((item) => item.id),
		// 	}, // Ensure the body is structured correctly as per your API
		// };
		// console.log(updateData, 'updateData');

		// // Call the updateItem mutation with the correct format
		// updateItem(updateData)
		// 	.unwrap()
		// 	.then((response) => {
		// 		// Handle success
		// 		console.log('Item updated successfully:', response);
		// 		toast.success('Item updated successfully');
		// 	})
		// 	.catch((error) => {
		// 		// Handle error
		// 		console.error('Error updating item:', error);
		// 	});
	};

	return (
		<Select
			className='text-black !rounded-xl mt-3'
			isSearchable
			isClearable
			options={options}
			value={selectedOption || defaultValues}
			onChange={handleChange}
			onInputChange={handleInputChange}
			onFocus={() => fetchData()}
			isLoading={isLoading}
			loadingMessage={() => 'Loading...'}
			onMenuScrollToBottom={fetchMoreOptions}
			isMulti={isMultiSelect ? true : false}
			components={animatedComponents}
			closeMenuOnSelect={false}
		/>
	);
};

export default EditItemModifierGroupSelect;
