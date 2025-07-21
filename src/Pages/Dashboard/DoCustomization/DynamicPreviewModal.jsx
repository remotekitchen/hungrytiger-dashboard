import React from "react";
import backgroundColor from "../../../assets/colorsShown/backgroundColor.jpg";
import CardColor from "../../../assets/colorsShown/CardColor.jpg";
import positiveColor from "../../../assets/colorsShown/positiveColor.jpg";
import primaryColor from "../../../assets/colorsShown/primaryColor.jpg";
import secondaryColor from "../../../assets/colorsShown/secondaryColor.jpg";
import stockColor from "../../../assets/colorsShown/stockColor.jpg";
import textColor from "../../../assets/colorsShown/textColor.jpg";

const DynamicPreviewModal = ({ modalId }) => {
  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      {/* <button
        className="btn"
        onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        open modal
      </button> */}
      <dialog id={modalId} className="modal">
        <div className="modal-box w-[1000px] h-[600px] max-w-5xl">
          {/* <h1>{modalId}</h1> */}
          {modalId === "modal_background_color" ? (
            <div className="flex justify-center items-center">
              <img
                src={backgroundColor}
                className="w-96 h-full"
                alt="bg-color"
              />
            </div>
          ) : modalId === "modal_positive_color" ? (
            <div className="flex justify-center items-center">
              <img
                src={positiveColor}
                className="w-96 h-full"
                alt="bg-color"
              />
            </div>
          ) : modalId === "modal_secondary_color" ? (
            <div className="flex justify-center items-center">
              <img
                src={secondaryColor}
                className="w-96 h-full"
                alt="bg-color"
              />
            </div>
          ) : modalId === "modal_text_color" ? (
            <div className="flex justify-center items-center">
              <img
                src={textColor}
                className="w-96 h-full"
                alt="bg-color"
              />
            </div>
          ) : modalId === "modal_card_color" ? (
            <div className="flex justify-center items-center">
              <img
                src={CardColor}
                className="w-96 h-full"
                alt="bg-color"
              />
            </div>
          ) : modalId === "modal_primary_color" ? (
            <div className="flex justify-center items-center">
              <img
                src={primaryColor}
                className="w-96 h-full"
                alt="bg-color"
              />
            </div>
          ) : modalId === "modal_stock_color" ? (
            <div className="flex justify-center items-center">
              <img
                src={stockColor}
                className="w-96 h-full"
                alt="bg-color"
              />
            </div>
          )  : (
            <div className="flex flex-col justify-center items-center mt-4 text-center">
                <h1 className="text-3xl font-bold">We are currently not using.</h1>
            </div>
          )}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DynamicPreviewModal;
