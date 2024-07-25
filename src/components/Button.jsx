import PropTypes from "prop-types";

function Button({
  children,
  type = "button",
  bgColor = "bg-customBlue",
  textColor = "text-white",
  width = "w-6/12",
  className = "",
  ...props
}) {
  return (
    <button
      className={`p-2 rounded-lg ${width} ${bgColor} ${textColor} ${className}`}
      type={`${type}`}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
};

export default Button;
