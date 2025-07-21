import React, { forwardRef, useState } from "react";

const ModifierCreationModal = forwardRef((props, ref) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    restaurant: "",
    modifierName: "",
    modifierGroup: "",
    price: "",
    quantity: "",
    status: "Required",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.restaurant) newErrors.restaurant = "Restaurant is required";
    if (!formData.modifierName)
      newErrors.modifierName = "Modifier name is required";
    if (!formData.modifierGroup)
      newErrors.modifierGroup = "Modifier group is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.quantity) newErrors.quantity = "Quantity is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // console.log(formData, "Form Data::::");
    setErrors({});
    ref.current.close();
  };

  return (
    <dialog id="my_modal_2" className="modal" ref={ref}>
      <div className="modal-box">
        <h2 className="text-2xl opacity-80 font-bold mb-3">Create Modifier</h2>
        <form onSubmit={handleSubmit}>
          <label className="form-control w-full mb-2">
            <span className="label-text pb-2">Select Restaurant</span>
            <select
              className="select select-bordered w-full max-w-xs"
              name="restaurant"
              value={formData.restaurant}
              onChange={handleChange}
            >
              <option value="">Select Restaurant</option>
              <option value="Lees House">Lees House</option>
              <option value="Famous Wok">Famous Wok</option>
              <option value="Bombay Masala">Bombay Masala</option>
              <option value="Tandori Kona">Tandori Kona</option>
            </select>
            {errors.restaurant && (
              <p className="text-red-500">{errors.restaurant}</p>
            )}
          </label>

          <label className="form-control w-full">
            <span className="label-text pb-2">Modifier Name</span>
            <input
              type="text"
              name="modifierName"
              placeholder="Type here"
              className="input input-bordered w-full"
              value={formData.modifierName}
              onChange={handleChange}
            />
            {errors.modifierName && (
              <p className="text-red-500">{errors.modifierName}</p>
            )}
          </label>

          <label className="form-control w-full mt-3">
            <span className="label-text pb-2">Modifier Group</span>
            <select
              className="select select-bordered w-full max-w-xs"
              name="modifierGroup"
              value={formData.modifierGroup}
              onChange={handleChange}
            >
              <option value="">Select Modifier Group</option>
              <option value="Size">Size</option>
              <option value="Flavor">Flavor</option>
              <option value="Toppings">Toppings</option>
              <option value="Extras">Extras</option>
            </select>
            {errors.modifierGroup && (
              <p className="text-red-500">{errors.modifierGroup}</p>
            )}
          </label>

          <label className="form-control w-full mt-3">
            <span className="label-text pb-2">Price</span>
            <input
              type="number"
              name="price"
              placeholder="Type here"
              className="input input-bordered w-full"
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && <p className="text-red-500">{errors.price}</p>}
          </label>

          <label className="form-control w-full mt-3">
            <span className="label-text pb-2">Modifier Quantity</span>
            <input
              type="number"
              name="quantity"
              placeholder="Type here"
              className="input input-bordered w-full"
              value={formData.quantity}
              onChange={handleChange}
            />
            {errors.quantity && (
              <p className="text-red-500">{errors.quantity}</p>
            )}
          </label>

          <label className="form-control w-full mt-3">
            <span className="label-text pb-2">Modifier Status</span>
            <div className="form-control border-2 border-gray-400 rounded-xl border-opacity-20 p-2">
              <label className="label cursor-pointer">
                <span className="label-text">Required</span>
                <input
                  type="radio"
                  name="status"
                  value="Required"
                  className="radio checked:bg-blue-500"
                  checked={formData.status === "Required"}
                  onChange={handleChange}
                />
              </label>
              <label className="label cursor-pointer">
                <span className="label-text">Optional</span>
                <input
                  type="radio"
                  name="status"
                  value="Optional"
                  className="radio checked:bg-blue-500"
                  checked={formData.status === "Optional"}
                  onChange={handleChange}
                />
              </label>
            </div>
          </label>

          <button
            type="submit"
            className="w-full bg-blue-300 hover:bg-blue-500 rounded-xl py-2 mt-5 text-white text-xl transition-all duration-300"
          >
            Submit
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={() => ref.current.close()}>
          {props.closeText || "close"}
        </button>
      </form>
    </dialog>
  );
});

export default ModifierCreationModal;
