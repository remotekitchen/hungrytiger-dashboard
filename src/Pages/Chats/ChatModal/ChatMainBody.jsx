import React from "react";
import { BiDotsVerticalRounded, BiChevronDown } from "react-icons/bi";
import { AiOutlineDown } from "react-icons/ai";
import ChatInput from "./ChatInput";
const ChatMainBody = () => {
  return (
    <div className="px-0">
      {/* chat header */}
      <div className="bg-orange-400 flex justify-between items-center text-white p-3">
        <div className="flex">
          {/* avatar, name, active status */}
          {/* avatar here */}
          <div className="avatar mx-4">
            <div className="w-12 rounded-full">
              <img
                alt="platform stock"
                src="/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div>
            <span>User Name</span>
            <br />
            <span className="italic">online</span>
          </div>
        </div>
        <div className="flex items-center">
          {/* options */}
          <BiDotsVerticalRounded size={26} className="mx-2" />
          <BiChevronDown size={40} className="" />
        </div>
      </div>

      {/* chat input goes here */}
      <div className="fixed bottom-0 left-0 right-0 my-3">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatMainBody;
