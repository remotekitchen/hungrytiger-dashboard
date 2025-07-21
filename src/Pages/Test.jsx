import React from "react";

const Test = () => {
  const handleModal = () => {
    window.my_modal_1.showModal();
  };
  return (
    <>
      {/*  <button className="btn" onClick={handleModal}>
        open test compo
      </button> */}
      <dialog
        id="my_modal_1"
        className="bg-transparent"
        style={{ zIndex: 1000 }}
      >
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button onClick={() => window.my_modal_1.close()} className="btn">
              Close
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default Test;
