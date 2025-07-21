import React, { useState } from "react";
import Loading from "../../../Components/Loading";
import {
  useCreateDeliveryFeeMutation,
  useEditDeliveryFeeMutation,
  useListDeliveryFeeQuery,
} from "../../../redux/features/deliveryFee/deliveryFeeAssociation";
import { useGetRestaurentsQuery } from "../../../redux/features/menuCreation/menuCreationApi";

const DirectOrderSettings = () => {
  const [selectedRestaurants, setSelectedRestaurants] = useState("");
  const [deliveryFee, setDeliveryFee] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [orderAmount, setOrderAmount] = useState("");
  const [serviceFee, setServiceFee] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [editId, setEditId] = useState(0);
  const [editableIndex, setEditableIndex] = useState(null);
  const [editDeliveryFee, setEditDeliveryFee] = useState("");
  const [editServiceFee, setEditServiceFee] = useState("");
  const [editOrderAmount, setEditOrderAmount] = useState("");
  const [editDiscount, setEditDiscount] = useState("");
  const [editTaxRate, setEditTaxRate] = useState("");
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const {
    data: restaurantList,
    isLoading: isRestaurantLoading,
    isError: isRestaurantError,
    error: restaurantError,
  } = useGetRestaurentsQuery();
  const [createDeliveryFee, { isLoading, isError, isSuccess, data }] =
    useCreateDeliveryFeeMutation();
  const [editDeliveryFeeQuery] = useEditDeliveryFeeMutation();

  const handleRestaurantChange = (e) => {
    const selectedRestaurantId = e.target.value;
    setSelectedRestaurants(selectedRestaurantId);
    alert(selectedRestaurantId);
  };

  // const restaurantName = restaurantList.results.find(
  // 	(restaurant) => restaurant.id === selectedRestaurants()
  // );

  // // console.log(restaurantName);

  const handleSubmission = async (e) => {
    e.preventDefault();

    // Validate and prepare the data for the delivery fee
    if (!selectedRestaurants.length) {
      alert("Please select at least one restaurant.");
      return;
    }

    if (
      !deliveryFee ||
      !serviceFee ||
      !orderAmount ||
      !discountRate ||
      !taxRate
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const deliveryFeeObj = {
      restaurant: selectedRestaurants,
      delivery_fee: parseFloat(deliveryFee), // Convert to a floating-point number
      convenience_fee: parseFloat(serviceFee), // Convert to a floating-point number
      minimum_order_amount: parseFloat(orderAmount), // Convert to a floating-point number
      discount: parseFloat(discountRate), // Convert to a floating-point number
      tax_rate: parseFloat(taxRate), // Convert to a floating-point number
      use_tax: isChecked,
    };
    try {
      // Send the request to create the delivery fee
      const response = await createDeliveryFee(deliveryFeeObj);

      // Check if the mutation was successful
      if (response.data) {
        // Handle success, you can show a success message or reset the form
        alert("Delivery fee created successfully");
        // Optionally, reset the form
        setSelectedRestaurants([]);
        setDeliveryFee("");
        setServiceFee("");
        setOrderAmount("");
        setDiscountRate("");
        setTaxRate("");
        setIsChecked(false);
      } else {
        // Handle any potential errors from the mutation
        alert("Error creating the delivery fee. Please try again.");
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleEdit = (index) => {
    // Set the editable index when the "Edit" button is clicked
    setEditableIndex(index);

    // Initialize the editable fields with the current values from the list
    const item = getList?.results[index];
    setEditDeliveryFee(item.delivery_fee);
    setEditOrderAmount(item.minimum_order_amount);
    setEditServiceFee(item.convenience_fee);
    setEditDiscount(item.discount);
    setEditTaxRate(item.tax_rate);
  };

  const handleSave = async (id) => {
    const deliveryFeeObj = {
      delivery_fee: parseFloat(editDeliveryFee), // Convert to a floating-point number
      convenience_fee: parseFloat(editServiceFee), // Convert to a floating-point number
      minimum_order_amount: parseFloat(editOrderAmount), // Convert to a floating-point number
      discount: parseFloat(editDiscount), // Convert to a floating-point number
      tax_rate: parseFloat(editTaxRate), // Convert to a floating-point number
      use_tax: isChecked,
    };
    try {
      // Send the request to create the delivery fee
      const response = await editDeliveryFeeQuery(id, deliveryFeeObj);

      // Check if the mutation was successful
      if (response.data) {
        // Handle success, you can show a success message or reset the form
        alert("Delivery fee updated successfully");
        // Optionally, reset the form
        setSelectedRestaurants([]);
        setEditDeliveryFee("");
        setEditServiceFee("");
        setEditOrderAmount("");
        setEditDiscountRate("");
        setEditTaxRate("");
        setIsChecked(false);
      } else {
        // Handle any potential errors from the mutation
        alert("Error creating the delivery fee. Please try again.");
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again.");
    }
    setEditableIndex(null);
  };

  const handleCancel = () => {
    // Cancel editing and reset the editable index
    setEditableIndex(null);
  };
  //const{data:getDetails,isLoading:isDetailsLoading,isError:isDetailsError,isSuccess:isDetailsSucess}=  useGetDeliveryFeeQuery(editId);

  // to get all the menus for that restaurant
  const {
    data: getList,
    isLoading: islistLoading,
    isSuccess: isListSuccess,
    isError: isListError,
    error: ListError,
  } = useListDeliveryFeeQuery();
  let displayableContent;
  if (islistLoading && !isListError) {
    displayableContent = <Loading />;
  } else if (isListError && !isListSuccess) {
    displayableContent = <p>Something went wrong...</p>;
  } else if (!isListError && isListSuccess && getList.results.length === 0) {
    displayableContent = (
      <>
        <p>No menus or items avaialble for this location/restaurant</p>
      </>
    );
  } else if (!isListError && isListSuccess && getList.results.length > 0) {
    displayableContent = (
      <div className="container-fluid">
        <table className="table table-striped table-hover w-100">
          <thead className="thead-light">
            <tr>
              <th>Restaurant</th>
              <th>Delivery Fee</th>
              <th>Service Fee</th>
              <th>Minimum Amount</th>
              <th>Discount</th>
              <th>Tax rate</th>
              <th>use VAT</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {getList?.results.map((item, index) => (
              <tr key={item.id}>
                <td>
                  {
                    <td>
                      {
                        restaurantList?.results.find(
                          (restaurant) => restaurant.id === item.restaurant
                        )?.name
                      }
                    </td>
                  }
                </td>

                <td>
                  {editableIndex === index ? (
                    <input
                      className="text-bg-warning"
                      type="number"
                      value={editDeliveryFee}
                      onChange={(e) => setEditDeliveryFee(e.target.value)}
                    />
                  ) : (
                    item.delivery_fee
                  )}
                </td>
                <td>
                  {editableIndex === index ? (
                    <input
                      className="text-bg-warning"
                      type="number"
                      value={editServiceFee}
                      onChange={(e) => setEditServiceFee(e.target.value)}
                    />
                  ) : (
                    item.convenience_fee
                  )}
                </td>
                <td>
                  {editableIndex === index ? (
                    <input
                      className="text-bg-warning"
                      type="number"
                      value={editOrderAmount}
                      onChange={(e) => setEditOrderAmount(e.target.value)}
                    />
                  ) : (
                    item.minimum_order_amount
                  )}
                </td>
                <td>
                  {editableIndex === index ? (
                    <input
                      className="text-bg-warning"
                      type="number"
                      value={editDiscount}
                      onChange={(e) => setEditDiscount(e.target.value)}
                    />
                  ) : (
                    item.discount
                  )}
                </td>
                <td>
                  {editableIndex === index ? (
                    <input
                      className="text-bg-warning"
                      type="number"
                      value={editTaxRate}
                      onChange={(e) => setEditTaxRate(e.target.value)}
                    />
                  ) : (
                    item.tax_rate
                  )}
                </td>
                <td>
                  {" "}
                  {item.use_tax ? (
                    <input
                      type="checkbox"
                      checked={true}
                      onChange={(e) => setIsChecked(e.target.checked)}
                    />
                  ) : (
                    <input
                      type="checkbox"
                      checked={false}
                      onChange={(e) => setIsChecked(!e.target.checked)}
                    />
                  )}
                </td>
                <td>
                  {editableIndex === index ? (
                    <div className="btn-group">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleSave(item.id)}
                      >
                        Save
                      </button>
                      <button className="btn btn-danger" onClick={handleCancel}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => handleEdit(index)}>Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold mb-7">Direct Order Settings</h1>
      <h2 className="text-2xl font-bold">Set Fees</h2>
      <p>
        You may change additional fees and set minimum order amount for delivery
        orders with these settings.
      </p>
      <div className="mt-4 w-1/2 py-4">
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Restaurants
          </label>
          <select
            id="restaurant"
            value={selectedRestaurants}
            onChange={handleRestaurantChange}
            className="select select-bordered w-full"
          >
            {" "}
            <option>please select restaurant</option>
            {restaurantList?.results.map((item) => (
              <option value={item.id} key={item.id}>
                {item?.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">
            Delivery Fee
          </label>
          <input
            type="number"
            placeholder="CA$"
            className="border border-gray-300 rounded-md p-2 w-full"
            value={deliveryFee}
            onChange={(e) => setDeliveryFee(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Service Fee
          </label>
          <input
            type="number"
            placeholder="%"
            className="border border-gray-300 rounded-md p-2 w-full"
            value={serviceFee}
            onChange={(e) => setServiceFee(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Minimum Order Amount
          </label>
          <input
            type="number"
            placeholder="CA$"
            className="border border-gray-300 rounded-md p-2 w-full"
            value={orderAmount}
            onChange={(e) => setOrderAmount(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">
            Discount Rate
          </label>
          <input
            type="number"
            placeholder="%"
            className="border border-gray-300 rounded-md p-2 w-full"
            value={discountRate}
            onChange={(e) => setDiscountRate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            VAT Rate
          </label>
          <input
            type="number"
            placeholder="%"
            className="border border-gray-300 rounded-md p-2 w-full"
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Use VAT
          </label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </div>
        <div>
          {selectedRestaurants !== "" && (
            <>
              {" "}
              <button
                className="mt-4 bg-[#42C2FF] text-white font-bold py-2 px-4 rounded"
                // onClick={handleUpdateSubmission}
              >
                Edit
              </button>
              <button
                className="mt-4 bg-red text-white font-bold py-2 px-4 rounded"
                // onClick={handleCancelSubmission}
              >
                cancel
              </button>
            </>
          )}
          {selectedRestaurants === "" && (
            <button
              className="mt-4 bg-[#42C2FF] text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmission}
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
      <div className="overflow-x-auto my-6" style={{ maxWidth: "100%" }}>
        {/* ================ */}
        {displayableContent}
      </div>
    </div>
  );
};
export default DirectOrderSettings;
