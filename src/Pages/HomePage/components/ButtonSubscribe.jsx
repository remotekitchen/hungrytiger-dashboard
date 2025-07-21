const ButtonSubscribe = () => {
  return (
    <div className="flex flex-col gap-2 sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
      <input
        type="text"
        placeholder="Type your e-mail Here"
        className="input input-bordered w-full max-w-xs"
      />
      <button
        name="subscribe"
        className="btn glass text-white font-bold text-xl bg-sky-400 hover:text-black hover:bg-sky-200"
      >
        Subscribe Today
      </button>
    </div>
  );
};

export default ButtonSubscribe;
