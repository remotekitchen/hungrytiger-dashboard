import React from "react";
import ChatMainBody from "./ChatMainBody";

const ChatModal = () => {
  return (
    <>
      <input type="checkbox" id="chatModal" className="modal-toggle" />
      <label htmlFor="chatModal" className="modal cursor-pointer">
        <label
          className="modal-box relative w-11/12 max-w-full p-0 rounded-lg h-full"
          htmlFor=""
        >
          {/* form  */}
          <form>
            {/* <h1 className="text-2xl mb-6 font-bold font-sans">Add An Item</h1> */}
            <div className="form-control w-full">
              {/* chat main body */}
              <ChatMainBody />
            </div>
          </form>
        </label>
      </label>
    </>
  );
};

export default ChatModal;
