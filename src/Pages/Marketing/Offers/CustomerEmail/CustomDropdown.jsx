import React, { useEffect, useRef } from "react";

const CustomDropdown = ({
  options,
  loading,
  onLoadMore,
  onSelect,
  selectedRewardId,
}) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (dropdownRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = dropdownRef.current;
        if (scrollHeight - scrollTop <= clientHeight + 10) {
          onLoadMore();
        }
      }
    };

    // console.log("options",options);

    const currentDropdown = dropdownRef.current;
    currentDropdown.addEventListener("scroll", handleScroll);

    return () => {
      currentDropdown.removeEventListener("scroll", handleScroll);
    };
  }, [loading, onLoadMore]);

  return (
    <div
      ref={dropdownRef}
      className="custom-dropdown"
      style={{ height: "200px", overflowY: "auto", border: "1px solid #ccc" }}
    >
      {options.length === 0 && <p>No options available</p>}
      {options.map((option) => (
        <div
          key={option.id}
          className={`option-item ${
            option.id === selectedRewardId ? "bg-primary" : ""
          }`}
          onClick={() => onSelect(option.id)}
          style={{ padding: "10px", cursor: "pointer" }}
        >
          {option.reward_group_name}
        </div>
      ))}
      {loading && <p>Loading more...</p>}
    </div>
  );
};

export default CustomDropdown;
