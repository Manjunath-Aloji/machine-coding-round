import PropTypes from "prop-types";
import React from "react";

const Input = React.forwardRef(function Input(
  { type = "text", className = "", ...props },
  ref
) {
  return (
    // <div className="w-full">
      <input
        type={type}
        className={`p-4 rounded-lg bg-customInputBg ${className}`}
        {...props}
        ref={ref}
      />
    // </div>
  );
});

Input.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
};

export default Input;
