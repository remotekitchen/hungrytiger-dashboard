import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const MultiCustomSelect = ({ loadItems, setPromotion, setGetSearchInput }) => {
	const [selectedOption, setSelectedOption] = useState(null);

	// Directly format the options from the loadItems prop
	const options = loadItems?.map((item) => ({
		label: item.name,
		value: item.name,
		id: item.id,
	}));

	const handleInputChange = (inputValue) => {
		setGetSearchInput(inputValue);
	};

	const handleChange = (selectedOption) => {
		setSelectedOption(selectedOption);
		setPromotion(selectedOption?.map((item) => item.id));
	};

	return (
		<Select
			className='text-black !rounded-xl mt-3'
			isSearchable
			isClearable
			options={options} // Use the options directly without async fetching
			value={selectedOption}
			onChange={handleChange}
			onInputChange={handleInputChange}
			isMulti
			components={animatedComponents}
			closeMenuOnSelect={false}
			loadingMessage={() => 'Loading...'}
		/>
	);
};

export default MultiCustomSelect;
