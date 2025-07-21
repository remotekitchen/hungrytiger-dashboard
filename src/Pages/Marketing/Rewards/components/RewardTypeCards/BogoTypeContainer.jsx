import makeAnimated from "react-select/animated";

import SingleDishCardInfinity from "./SingleDishCardInfinity";

const animatedComponents = makeAnimated();
const BogoTypeContainer = ({
  handleRewardChange,
  reward,
  index,
  setBogoMenuItem,
  page,
  setPage,
  menuItems,
  setGetSearchInput,
  getSearchInput,
  selectedRestarauntId,
  isLoading,
}) => {
  // const [page, setPage] = useState(1);
  // const { data: menuItems } = useGetAllItemsQuery(page);

  return (
    <div>
      <div className="form-control w-full">
        <label className="label" htmlFor="dish">
          <span className="label-text">BOGO Type</span>
        </label>
        <select
          onChange={(e) =>
            handleRewardChange(index, "bogoType", e.target.value)
          }
          value={reward.bogoType}
          name={`bogoType${index}`}
          id={`bogoType${index}`}
          className="select select-bordered w-full"
        >
          <option selected disabled>
            Select BOGO Type
          </option>
          <option value="any_dish">Any Dish</option>
          <option value="selected_dishes">Selected Dishes</option>
        </select>
      </div>
      {/* bogo dish types */}
      {reward.bogoType === "selected_dishes" && (
        <div className="form-control w-full">
          <label className="label" htmlFor="dish">
            <span className="label-text">Select Dishes For BOGO</span>
          </label>
          {/* <div>
						{reward?.items_name?.map((n) => (
							<span className='px-2 py-[4px] text-sm bg-blue-100 rounded-xl mr-1 inline-block mb-2'>
								{n}
							</span>
						))}
					</div> */}
          {/* <Select
            options={options}
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            onChange={(selectedOptions) => {
              const formattedValues = selectedOptions.map(
                (option) => option.value
              );
              setBogoMenuItem(formattedValues);
            }}
          /> */}

          <SingleDishCardInfinity
            page={page}
            setPage={setPage}
            loadItems={menuItems}
            setPromotion={setBogoMenuItem}
            isMultiSelect={true}
            setGetSearchInput={setGetSearchInput}
            getSearchInput={getSearchInput}
            selectedRestarauntId={selectedRestarauntId}
            reward={reward?.items?.map((n) => n)}
            isLoading={isLoading}
          ></SingleDishCardInfinity>
        </div>
      )}
    </div>
  );
};

export default BogoTypeContainer;
