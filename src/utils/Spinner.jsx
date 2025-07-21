import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

const Loader = ({
  loading = true,
  color = "#ffffff",
  size = 100,
  overrideStyles = {},
}) => {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    ...overrideStyles, // Allow overriding default styles
  };

  return (
    <PropagateLoader
      color={color}
      loading={loading}
      cssOverride={override}
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loader;
