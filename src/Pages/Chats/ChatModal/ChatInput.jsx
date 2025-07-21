import React from "react";
import { GrAttachment } from "react-icons/gr";
import { BsEmojiLaughing, BsThreeDots } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";

const ChatInput = () => {
  return (
    <div className="flex">
      <div className="w-[90%] mx-auto border-3 bg-white rounded-md flex justify-between p-3">
        {/* chat box and emojis */}
        <div className="w-full flex items-center border-3">
          <input
            placeholder="Want text-center the Al to take another direction? Give it some feedback instead"
            type="text"
            className="w-full border-none outline-none text-sm"
          />
        </div>
        <div className="flex">
          <div className="bg-green-100 rounded-md p-2 flex items-center justify-center mx-1">
            <GrAttachment color="green" size={20} />
          </div>
          <div className="bg-green-100 rounded-md p-2 flex items-center justify-center mx-1">
            <BsEmojiLaughing color="green" size={20} />
          </div>
          <div className="bg-green-100 p-2 rounded-md flex items-center justify-center mx-1">
            <BsThreeDots color="green" size={20} />
          </div>
        </div>
      </div>
      <div className="w-[5%] bg-violet-500 rounded-md shadow-2xl mx-auto flex items-center justify-center">
        {/* send icon here */}
        <FaTelegramPlane size={40} color="white" />
      </div>
    </div>
  );
};

export default ChatInput;
