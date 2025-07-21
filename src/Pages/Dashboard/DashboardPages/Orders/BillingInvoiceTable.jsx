import React from "react";

const BillingInvoiceTable = ({
  order,
  selectedLocation,
  selectedRestaurant,
  restaurentList,
  locationList,
}) => {
  // console.log("🚀 ~ selectedLocation:", selectedLocation);
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  function formatTime(dateString) {
    const date = new Date(dateString);
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  // Find the restaurant name
  const restaurant = restaurentList?.results?.find(
    (data) => data.id === parseInt(selectedRestaurant)
  );
  const restaurantName = restaurant ? restaurant?.name : "N/A";

  // Find the location name
  const location = locationList?.results?.find(
    (data) => data.id === parseInt(selectedLocation)
  );
  const locationName = location ? location.name : "N/A";

  return (
    <tr className="" key={order.id}>
      {order.dropoff_contact_first_name || order.dropoff_contact_last_name ? (
        <td className="p-3  text-left align-top">
          {order.dropoff_contact_first_name} <span className="pl-1"></span>{" "}
          {order.dropoff_contact_last_name}
        </td>
      ) : (
        <td className="p-3  text-left align-top">{order?.customer}</td>
      )}
      <td className="p-3  text-left align-top whitespace-nowrap">
        {restaurantName}
      </td>
      <td className="p-3  text-left align-top">{locationName}</td>
      <td className="p-3 text-left align-top whitespace-nowrap">
        {formatDate(order?.receive_date)}
      </td>
      <td className="p-3 text-left align-top whitespace-nowrap">
        {formatTime(order?.receive_date)}
      </td>
      <td className="p-3  text-left align-top">
        {order?.order_id} <br />
      </td>
      <td className="p-3  text-left align-top">{order?.subtotal}</td>{" "}
      {/* Fix the typo here */}
      <td className="p-3  text-left align-top">{order?.discount}</td>
      <td className="p-3  text-left align-top">{order?.payment_method}</td>
      <td className="p-3  text-left align-top">{order?.order_method}</td>
      <td className="p-3 text-left align-top">{order?.total}</td>
      <td className="p-3 text-left align-top">{order?.delivery_fee}</td>
      <td className="p-3 text-left align-top">{order?.status}</td>
      <td className="p-3 text-left align-top">{order?.quantity}</td>
      <td className="p-3 text-left align-top">{order?.tax}</td>
      <td className="p-3 text-left align-top">{order?.convenience_fee}</td>
      <td className="p-3 text-left align-top">{order?.currency}</td>
      <td className="p-3 text-left align-top">
        {order?.is_paid === false ? "False" : "True"}
      </td>
      <td className="p-3 text-left align-top"></td>
      <td className="p-3 text-left align-top"></td>
    </tr>
  );
};

export default BillingInvoiceTable;
