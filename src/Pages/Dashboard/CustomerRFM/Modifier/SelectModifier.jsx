const SelectModifier = () => {
  return (
    <div>
      <form>
        <div className="flex items-center gap-3">
          <select className="select select-bordered select-sm w-auto bg-white">
            <option selected>Top modifiers</option>
            <option>Item One</option>
            <option>Item Two</option>
            <option>Item Three</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default SelectModifier;
