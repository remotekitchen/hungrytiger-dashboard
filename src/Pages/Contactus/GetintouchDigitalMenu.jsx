import { Helmet } from "react-helmet";
import FooterHome from "../HomePage/components/FooterHome";
const GetInTouchDigitalMenu = () => {
  return (
    <>
      <Helmet>
        <title>ChatChef Digital Menu: Modernize Your Dining Experience</title>
        <meta
          name="description"
          content="Discover ChatChef digital menu solutions. Elevate your restaurant's ordering process, offer interactive menu displays, and enhance customer engagement."
        />
        <meta name="keywords" content="ChatChef, Career, restaurants" />
      </Helmet>
      <main className="py-14">
        <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
          <div className="max-w-lg mx-auto space-y-3 sm:text-center">
            <p className="text-gray-800 text-5xl font-bold sm:text-6xl">
              Free Digital Menu
            </p>
            <p>Let&apos;s Create YOUR Free Digital Menu with QR Scan Code!</p>
          </div>
          <div className="mt-12 max-w-lg mx-auto">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
                <div>
                  <label className="font-medium">First name</label>
                  <input
                    type="text"
                    required
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-medium">Last name</label>
                  <input
                    type="text"
                    required
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">Phone number</label>
                <div className="relative mt-2">
                  <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2">
                    <select className="text-sm bg-transparent outline-none rounded-lg h-full">
                      <option>US</option>
                      <option>CA</option>
                    </select>
                  </div>
                  <input
                    type="number"
                    placeholder="+1 (555) 000-000"
                    required
                    className="w-full pl-[4.5rem] pr-3 py-2 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="font-medium">Restaurant name</label>
                <input
                  type="text"
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">Restaurant Address</label>
                <textarea
                  required
                  className="w-full mt-2 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                ></textarea>
              </div>
              <button
                name="submit-btn"
                className="btn glass btn-lg text-white font-bold text-xl bg-sky-400 hover:text-black hover:bg-sky-200"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>
      <FooterHome />
    </>
  );
};

export default GetInTouchDigitalMenu;
