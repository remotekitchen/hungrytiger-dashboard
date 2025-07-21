import ButtonChatnow from "./ButtonChatnow";

const ChatwithCSM = () => {
  return (
    <section className="mx-auto rounded-lg flex flex-col p-10 box-border items-center justify-start gap-[20px] bg-sky-200 max-w-[1500px]">
      <div className="mx-auto font-bold lg:text-3xl text-center text-xl lg:text-3xl sm:text-2xl 2xl:text-3xl">
        <h2 className="m-0">ChatChef - Your Partner in Success </h2>
        <p className="m-0">Chat now with The Chatchef&apos;s Sales team</p>
      </div>

      <div className="flex flex-col items-center gap-y-5 gap-x-6">
        <div className="w-full">
          <label className="font-medium">First name</label>
          <input
            type="text"
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <div className="w-full">
          <label className="font-medium">Last name</label>
          <input
            type="text"
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>

        <div className="w-full">
          <label className="font-medium">Email</label>
          <input
            type="email"
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>

        <div className="w-full">
          <label className="font-medium">Restaurant Name</label>
          <input
            type="text"
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>

        <div className="w-full">
          <label className="font-medium">Restaurant Location</label>
          <input
            type="text"
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>

        <div className="w-full">
          <label className="font-medium">Phone number</label>
          <div className="relative mt-2">
            <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2">
              <select className="text-sm bg-white outline-none rounded-lg h-full">
                <option>US</option>
                <option>ES</option>
                <option>MR</option>
              </select>
            </div>
            <input
              type="number"
              placeholder="+1 (555) 000-000"
              required
              className="w-full pl-[4.5rem] pr-3 py-2 appearance-none bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
        </div>
      </div>

      <ButtonChatnow />
    </section>
  );
};

export default ChatwithCSM;
