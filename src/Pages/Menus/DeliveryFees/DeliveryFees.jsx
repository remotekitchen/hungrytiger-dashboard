import React, { useState } from "react";
import { useGetUpdatedDeliveryFeesQuery } from "../../../redux/features/doCustomization/doCustomization";
import { useGetAllRestaurantQuery } from "../../../redux/features/restaurentCreation/restaurentCreationApi";
import CombineForm from "../../Dashboard/DoCustomization/CombineForm";

const DeliveryFees = () => {
  const { data: deliveryFeesData } = useGetUpdatedDeliveryFeesQuery();

  console.log(deliveryFeesData, "deliveryFees_dataaaaaaa");

  // Filter fees data based on max_distance
  const feesLessThan5Km = deliveryFeesData?.results?.filter(
    (fees) => fees.max_distance <= 5
  );
  const fees5To10Km = deliveryFeesData?.results?.filter(
    (fees) => fees.max_distance > 5 && fees.max_distance <= 10
  );

  const [formData, setFormData] = useState({
    restaurant: "",
    // delivery_fee: "",
    // convenience_fee: "",
    tax_rate: "",
    use_tax: false,
    alcoholic_tax_rate: "",
  });

  const { data: allRestaurant } = useGetAllRestaurantQuery();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue;

    if (type === "checkbox") {
      newValue = checked;
    } else if (type === "number") {
      newValue = parseFloat(value);
    } else if (name === "restaurant") {
      newValue = parseInt(value, 10);
    } else {
      newValue = value;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await createDeliveryFee(formData).unwrap();
      // console.log("Delivery Fee Created Successfully", formData);
    } catch (err) {
      console.error("Failed to create delivery fee: ", err);
      // toast.error(err);
    }
  };

  return (
    <section className="my-10 px-10">
      <h1 className="font-bold text-2xl">Delivery Fees Setup</h1>

      <div>
        <div className="my-5 grid grid-cols-12 gap-16">
          <CombineForm
            km="In Less Than 5 Km"
            form="one"
            max={5}
            feesLessThan5Km={feesLessThan5Km}
            allRestaurant={allRestaurant}
          />
          <CombineForm
            km="In More Than 5 Km to 10 Km"
            form="two"
            max={10}
            fees5To10Km={fees5To10Km}
            allRestaurant={allRestaurant}
          />
        </div>
      </div>
    </section>
  );
};

export default DeliveryFees;
