import { NavLink } from "react-router-dom";
import Sec1Img from "../HomePageImages/aboutChatchefImg.webp";
import ScrollToTop from "../../ScrollToTop";

const DigitalMenu = () => {
  return (
    <>
      <ScrollToTop />
      <section className="mx-auto mt-10 flex flex-col items-center justify-center lg:box-border md:flex-row md:box-border sm:flex-row sm:box-border">
      <img
          className="w-[500px] h-[500px] object-contain"
          src={Sec1Img}
          alt="community"
          height={200}
          width={200}
        />
        <div className="bg-gray rounded-xl overflow-hidden flex flex-col py-5 px-5 box-border items-start justify-start max-w-[500px]">
          <h2 className="text-3xl my-6 font-bold ">
            Free Digital Menu for Restaurant
          </h2>
          <div className="flex flex-col items-start justify-start gap-2">
            <div className="flex flex-row py-0 px-1 items-center justify-start gap-[10px]">
              <div className="bg-sky-400 rounded-xl w-3.5 h-3.5"></div>
              <b className="text-2xl">Easy-to-Use Interface</b>
            </div>
            <div className="text-sm leading-[20px] text-dimgray">
              <p className="m-0 text-2xl">
                Simplify the ordering process for your customers with our
                intuitive digital menu.
              </p>
              <p className="m-0">&nbsp;</p>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <div className="flex flex-row py-0 px-1 items-center justify-start gap-[10px]">
              <div className="bg-sky-400 rounded-xl w-3.5 h-3.5"></div>
              <b className="text-2xl">Real-Time Updates</b>
            </div>
            <div className="text-sm leading-[20px] text-dimgray">
              <p className="m-0 text-2xl">
                Instantly update menu items, prices, and specials without the
                need for reprinting.
              </p>
              <p className="m-0">&nbsp;</p>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <div className="flex flex-row py-0 px-1 items-center justify-start gap-[10px]">
              <div className="bg-sky-400 rounded-xl w-3.5 h-3.5"></div>
              <b className="text-2xl">Enhanced Customer Experience</b>
            </div>
            <div className="text-sm leading-[20px] text-dimgray">
              <p className="m-0 text-2xl">
                Allow customers to view detailed descriptions and images, making
                their dining experience memorable.
              </p>
              <p className="m-0">&nbsp;</p>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <div className="flex flex-row py-0 px-1 items-center justify-start gap-[10px]">
              <div className="bg-sky-400 rounded-xl w-3.5 h-3.5"></div>
              <b className="text-2xl">Cost-Effective</b>
            </div>
            <div className="text-sm leading-[20px] text-dimgray">
              <p className="m-0 text-2xl">
                Eliminate the costs of printing and updating traditional menus,
                while also being eco-friendly.
              </p>
              <p className="m-0">&nbsp;</p>
            </div>
          </div>
          <NavLink
            to="/free-digital-menu"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Get Free Digital Menu
          </NavLink>
        </div>
      </section>
    </>
  );
};

export default DigitalMenu;
