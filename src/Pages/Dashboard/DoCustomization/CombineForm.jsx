import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useSaveDeliveryFeesMutation,
  useUpdateDeliveryFeeMutation,
} from "../../../redux/features/doCustomization/doCustomization";

const CombineForm = ({
  max,
  km,
  feesLessThan5Km,
  fees5To10Km,
  allRestaurant,
}) => {
  const [saveDeliveryFees, { isLoading: isSaving }] =
    useSaveDeliveryFeesMutation();
  const [updateDeliveryFee, { isLoading: isUpdating }] =
    useUpdateDeliveryFeeMutation();

  console.log("🚀 ~ feesLessThan5Km:", feesLessThan5Km);
  const [deliveryFee, setDeliveryFee] = useState();
  const [serviceFee, setServiceFee] = useState();
  const [restaurant, setRestaurant] = useState(0);

  useEffect(() => {
    const initializeState = () => {
      if (feesLessThan5Km?.length > 0) {
        setDeliveryFee(feesLessThan5Km[0].delivery_fee);
        setServiceFee(feesLessThan5Km[0].service_fee);
        setRestaurant(feesLessThan5Km[0].restaurant);
      } else if (fees5To10Km?.length > 0) {
        setDeliveryFee(fees5To10Km[0].delivery_fee);
        setServiceFee(fees5To10Km[0].service_fee);
        setRestaurant(fees5To10Km[0].restaurant);
      }
    };

    initializeState();
  }, [feesLessThan5Km, fees5To10Km]);

  useEffect(() => {
    const matchingFeeLessThan5Km = feesLessThan5Km?.find(
      (fee) => fee.restaurant === restaurant && fee.max_distance === 5
    );

    const matchingFee5To10Km = fees5To10Km?.find(
      (fee) => fee.restaurant === restaurant && fee.max_distance === 10
    );

    if (matchingFeeLessThan5Km) {
      setDeliveryFee(matchingFeeLessThan5Km.delivery_fee);
      setServiceFee(matchingFeeLessThan5Km.service_fee);
    } else if (matchingFee5To10Km) {
      setDeliveryFee(matchingFee5To10Km.delivery_fee);
      setServiceFee(matchingFee5To10Km.service_fee);
    } else {
      setDeliveryFee("");
      setServiceFee("");
    }
  }, [feesLessThan5Km, fees5To10Km, restaurant]);

  const handleSaveChanges = async () => {
    const formData = {
      delivery_fee: deliveryFee,
      service_fee: serviceFee,
      max_distance: parseInt(max),
      restaurant: parseInt(restaurant),
    };

    try {
      const matchingFeeLessThan5Km = feesLessThan5Km?.find(
        (fee) => fee.restaurant === restaurant && fee.max_distance === 5
      );

      const matchingFee5To10Km = fees5To10Km?.find(
        (fee) => fee.restaurant === restaurant && fee.max_distance === 10
      );

      if (matchingFeeLessThan5Km) {
        await updateDeliveryFee({
          id: matchingFeeLessThan5Km.id,
          data: formData,
        }).unwrap();
        toast.success("Delivery fees updated successfully!");
      } else if (matchingFee5To10Km) {
        await updateDeliveryFee({
          id: matchingFee5To10Km.id,
          data: formData,
        }).unwrap();
        toast.success("Delivery fees updated successfully!");
      } else {
        const response = await saveDeliveryFees(formData).unwrap();
        toast.success("Delivery fees saved successfully!");
      }
    } catch (error) {
      toast.error("Failed to save delivery fees.");
    }
  };

  const defaultRestaurant = allRestaurant?.results?.find(
    (res) => res.id === restaurant
  );

  return (
    <div className="grid col-span-4">
      <h3 className="font-bold my-3">{km}</h3>
      <hr />
      <div>
        <h3 className="py-2 font-bold">Restaurant</h3>
        <select
          className="select select-bordered w-full"
          name="restaurant"
          value={restaurant}
          onChange={(e) => setRestaurant(parseFloat(e.target.value))}
        >
          <option disabled selected value={0}>
            Select Restaurant
          </option>
          {allRestaurant?.results?.map((res) => (
            <option key={res.id} value={res.id}>
              {res.name}
            </option>
          ))}
        </select>
      </div>

      <div className="my-3">
        <h3 className="py-2 font-bold">Delivery Fees</h3>
        <div className="relative">
          <span className="absolute left-2 top-2 text-gray-600">$</span>
          <input
            name="delivery_fee"
            value={deliveryFee}
            onChange={(e) => setDeliveryFee(parseFloat(e.target.value))}
            type="number"
            className="w-full h-10 pl-6 rounded bg-[#d7d9e063] shadow-inner"
            required
          />
        </div>
      </div>
      <div className="my-3">
        <h3 className="py-2 font-bold">Service Fees</h3>
        <div className="relative">
          <span className="absolute left-2 top-2 text-gray-600">$</span>
          <input
            name="service_fee"
            value={serviceFee}
            onChange={(e) => setServiceFee(parseFloat(e.target.value))}
            type="number"
            className="w-full h-10 pl-6 rounded bg-[#d7d9e063] shadow-inner"
            required
          />
        </div>
      </div>

      <div className="flex items-center gap-3 mt-5">
        <button
          className={`px-5 py-2 rounded-lg text-white ${
            isSaving || isUpdating ? "bg-gray-500" : "bg-[#34C2FE]"
          }`}
          onClick={handleSaveChanges}
          disabled={isSaving || isUpdating}
        >
          {isSaving || isUpdating ? "Saving..." : "Save Changes"}
        </button>
        {/* <button className="px-5 py-2 border border-[#34C2FE] rounded-lg text-[#34C2FE]">
          Cancel
        </button> */}
      </div>
    </div>
  );
};

export default CombineForm;
