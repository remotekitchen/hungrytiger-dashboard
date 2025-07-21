import React from 'react';
import makeAnimated from 'react-select/animated';
import MultiCustomSelectUpdate from './MultiCustomSelectUpdate';

const animatedComponents = makeAnimated();

const MultipleDishCard = ({
	handleRewardChange,
	index,
	reward,
	setMultipleMenuItem,
	page,
	setPage,
	menuItems,
	setGetSearchInput,
	selectedRestarauntId,
	getSearchInput,
}) => {
	// const [page, setPage] = useState(1);
	// const {
	//   data: menuItems,
	//   isLoading,
	//   isError,
	//   error,
	// } = useGetAllItemsQuery(page);

	const handleNextPage = () => {
		setPage((prevPage) => prevPage + 1);
	};

	const bogoGategory = menuItems?.results;

	const options =
		menuItems?.results?.map((item) => ({
			value: item.id,
			label: item.name,
		})) || [];

	return (
		<div className='form-control w-full'>
			<label className='label' htmlFor='multiple_dish'>
				<span className='label-text'>Dish Name</span>
			</label>
			{/* infinity  */}
			<MultiCustomSelectUpdate
				page={page}
				setPage={setPage}
				loadItems={menuItems}
				setPromotion={setMultipleMenuItem}
				isMultiSelect={true}
				setGetSearchInput={setGetSearchInput}
				selectedRestarauntId={selectedRestarauntId}
				getSearchInput={getSearchInput}
			></MultiCustomSelectUpdate>
		</div>
	);
};

export default MultipleDishCard;
