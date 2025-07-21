import { IoCaretBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Working() {
  return (
    <section
      style={{
        backgroundImage: `url("https://img.freepik.com/free-photo/vivid-blurred-colorful-wallpaper-background_58702-3798.jpg?w=740&t=st=1705430826~exp=1705431426~hmac=f7edf1f1676823e62798a7fe4c3c77befc3b5bb931152f1d6879ff0a348d310b")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-screen grid place-items-center"
    >
      <div className="grid place-items-center w-3/5 h-3/5 bg-opacity-30 bg-white backdrop-blur-[8.5px] border-[1px] border-opacity-20 border-white rounded-2xl p-3 shadow-lg">
        <div>
          <h1 className="w-full grid place-items-center text-4xl font-bold text-[#270657]">
            We Apologize For The Inconvenience.
          </h1>
          <p className="py-5 text-xl px-16 text-center">
            We are actively working on this feature. Please check back later, or
            stay tuned for updates!
          </p>
          <div className="grid place-items-center">
            <Link to="/dashboard/dashboard-overviews">
              <button className="px-5 py-2 border-2 flex items-center border-[#270657] rounded text-xl font-medium">
                <IoCaretBackOutline className="text-2xl" /> Go Back To The
                Homepage
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
