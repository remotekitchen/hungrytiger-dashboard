import { QRCodeCanvas } from "qrcode.react";
import React, { useEffect, useState } from "react";
import {
  useGetLocationsQuery,
  useGetRestaurentsQuery,
} from "../../../redux/features/menuCreation/menuCreationApi";
import { useGetQRLinksQuery } from "../../../redux/features/restaurentCreation/restaurentCreationApi";

const GenerateQR = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const {
    data: restaurantList,
    isLoading: restaurantListLoading,
    isError: isRestaurantListError,
    error: restaurantListError,
  } = useGetRestaurentsQuery();

  const {
    data: locationList,
    isLoading: isLocationLoading,
    isError: isLocationError,
    error: locationError,
  } = useGetLocationsQuery({ restaurantId: selectedRestaurant });
  let optionLocationContent;
  if (isLocationLoading) optionLocationContent = <option>Loading...</option>;
  else if (isLocationError)
    optionLocationContent = (
      <option>Something went wrong loading the locations</option>
    );
  else if (locationList.results.length === 0)
    optionLocationContent = <option>No location available right now</option>;
  else {
    optionLocationContent = locationList.results.map((item) => (
      <>
        <option value={item.id} key={item.id}>
          {item.name}
        </option>
      </>
    ));
  }

  // UseEffect to set default value if there's only one restaurant & location
  useEffect(() => {
    if (restaurantList?.results?.length === 1) {
      setSelectedRestaurant(restaurantList?.results[0].id);
    }
  }, [restaurantList]);

  useEffect(() => {
    if (selectedRestaurant && locationList?.results?.length === 1) {
      setSelectedLocation(locationList?.results[0].id);
    }
  }, [locationList]);

  let optionContent;
  if (restaurantListLoading) optionContent = <option>Loading...</option>;
  else if (isRestaurantListError)
    optionContent = (
      <option>Something went wrong loading the restaurent</option>
    );
  else if (restaurantList.results.length === 0)
    optionContent = <option>No restaurent available right now</option>;
  else
    optionContent = restaurantList.results.map((item) => (
      <option value={item.id} key={item.id}>
        {item?.name}
      </option>
    ));

  /*  */
  const [generateToken, setGenerateToken] = useState(true);
  const {
    data: qrLinks,
    isLoading: qrLinnksLoading,
    isError: isQRLinnksError,
    error: qrLinnksError,
  } = useGetQRLinksQuery(selectedLocation, {
    skip: !generateToken,
  });
  return (
    <div className="mt-5">
      <div className="flex items-center">
        <select
          onChange={(e) => setSelectedRestaurant(e.target.value)}
          className="select select-bordered w-full max-w-xs"
          value={selectedRestaurant}
        >
          <option disabled selected>
            Select a restaurant
          </option>
          {optionContent}
        </select>

        <select
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="select select-bordered w-full max-w-xs ms-2"
          disabled={!selectedRestaurant}
          value={selectedLocation}
        >
          <option>Select Location</option>
          {optionLocationContent}
        </select>

        <button
          disabled={!selectedLocation}
          onClick={() => setGenerateToken(true)}
          className={`bg-sky-400 hover:bg-sky-500 mx-2 text-white font-semibold py-2 px-4 rounded-md cursor-pointer btn
              }`}
        >
          Generate QR code
        </button>
      </div>
      {qrLinnksLoading ? (
        <>Loading...</>
      ) : (
        <div className="my-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-evenly">
          {qrLinks?.banner_qrlink && (
            <div className="my-3">
              <h1 className="text-3xl font-bold mb-3">Banner QR Link:</h1>
              <QRCodeCanvas size={300} value={qrLinks?.banner_qrlink} />

              <h1 className="text-xl font-bold my-3">
                QR Link:{" "}
                {qrLinks?.banner_qrlink ? (
                  <a
                    className="text-blue-500 border-b-2 border-blue-500 ml-2 pb-1"
                    href={qrLinks?.banner_qrlink}
                    target="_blank"
                  >
                    Link
                  </a>
                ) : (
                  ""
                )}
              </h1>
              <h1 className="text-xl font-bold my-3">QR Type: Banner</h1>
              <h1 className="text-xl font-bold my-3">
                Total Visits:{" "}
                {qrLinks?.banner_qrlink_scanned
                  ? qrLinks?.banner_qrlink_scanned
                  : 0}
              </h1>
            </div>
          )}
          {qrLinks?.table_qrlink && (
            <div className="my-3">
              <h1 className="text-3xl font-bold mb-3">Table QR Link:</h1>
              <QRCodeCanvas size={300} value={qrLinks?.table_qrlink} />

              <h1 className="text-xl font-bold my-3">
                QR Link:{" "}
                {qrLinks?.table_qrlink ? (
                  <a
                    className="text-blue-500 border-b-2 border-blue-500 ml-2 pb-1"
                    href={qrLinks?.table_qrlink}
                    target="_blank"
                  >
                    Link
                  </a>
                ) : (
                  ""
                )}
              </h1>
              <h1 className="text-xl font-bold my-3">QR Type: Table</h1>

              <h1 className="text-xl font-bold my-3">
                Total Visits:{" "}
                {qrLinks?.table_qrlink_scanned
                  ? qrLinks?.table_qrlink_scanned
                  : 0}
              </h1>
            </div>
          )}
          {qrLinks?.social_qrlink && (
            <div className="my-3">
              <h1 className="text-3xl font-bold mb-3">Social QR Link:</h1>
              <QRCodeCanvas size={300} value={qrLinks?.social_qrlink} />

              <h1 className="text-xl font-bold my-3">
                QR Link:{" "}
                {qrLinks?.social_qrlink ? (
                  <a
                    className="text-blue-500 border-b-2 border-blue-500 ml-2 pb-1"
                    href={qrLinks?.social_qrlink}
                    target="_blank"
                  >
                    Link
                  </a>
                ) : (
                  ""
                )}
              </h1>
              <h1 className="text-xl font-bold my-3">QR Type: Social</h1>

              <h1 className="text-xl font-bold my-3">
                Total Visits:{" "}
                {qrLinks?.social_qrlink_scanned
                  ? qrLinks?.social_qrlink_scanned
                  : 0}
              </h1>
            </div>
          )}
          {qrLinks?.business_card_qrlink && (
            <div className="my-3">
              <h1 className="text-3xl font-bold mb-3">
                Business card QR Link:
              </h1>
              <QRCodeCanvas size={300} value={qrLinks?.business_card_qrlink} />
              <h1 className="text-xl font-bold my-3">
                QR Link:{" "}
                {qrLinks?.business_card_qrlink ? (
                  <a
                    className="text-blue-500 border-b-2 border-blue-500 ml-2 pb-1"
                    href={qrLinks?.business_card_qrlink}
                    target="_blank"
                  >
                    Link
                  </a>
                ) : (
                  ""
                )}
              </h1>
              <h1 className="text-xl font-bold my-3">QR Type: Business Card</h1>
              <h1 className="text-xl font-bold my-3">
                Total Visits:{" "}
                {qrLinks?.business_card_qrlink_scanned
                  ? qrLinks?.business_card_qrlink_scanned
                  : 0}
              </h1>
            </div>
          )}
          {qrLinks?.flyer_qrlink && (
            <div className="my-3">
              <h1 className="text-3xl font-bold mb-3">Flyer QR Link:</h1>
              <QRCodeCanvas size={300} value={qrLinks?.flyer_qrlink} />

              <h1 className="text-xl font-bold my-3">
                QR Link:{" "}
                {qrLinks?.flyer_qrlink ? (
                  <a
                    className="text-blue-500 border-b-2 border-blue-500 ml-2 pb-1"
                    href={qrLinks?.flyer_qrlink}
                    target="_blank"
                  >
                    Link
                  </a>
                ) : (
                  ""
                )}
              </h1>
              <h1 className="text-xl font-bold my-3">QR Type: Flyer</h1>

              <h1 className="text-xl font-bold my-3">
                Total Visits:{" "}
                {qrLinks?.flyer_qrlink_scanned
                  ? qrLinks?.flyer_qrlink_scanned
                  : 0}
              </h1>
            </div>
          )}
          {qrLinks?.coupon_qrlink && (
            <div className="my-3">
              <h1 className="text-3xl font-bold mb-3">Coupon QR Link:</h1>
              <QRCodeCanvas size={300} value={qrLinks?.coupon_qrlink} />

              <h1 className="text-xl font-bold my-3">
                QR Link:{" "}
                {qrLinks?.coupon_qrlink ? (
                  <a
                    className="text-blue-500 border-b-2 border-blue-500 ml-2 pb-1"
                    href={qrLinks?.coupon_qrlink}
                    target="_blank"
                  >
                    Link
                  </a>
                ) : (
                  ""
                )}
              </h1>
              <h1 className="text-xl font-bold my-3">QR Type: Coupon</h1>

              <h1 className="text-xl font-bold my-3">
                Total Visits:{" "}
                {qrLinks?.coupon_qrlink_scanned
                  ? qrLinks?.coupon_qrlink_scanned
                  : 0}
              </h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GenerateQR;
