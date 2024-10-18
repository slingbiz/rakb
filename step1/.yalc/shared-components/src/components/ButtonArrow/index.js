// shared/components/ButtonArrow.js
import React from "react";
import PropTypes from "prop-types";
import "./ButtonArrow.css"; // Import the CSS for the button

const ButtonArrow = ({ label, onClick, disabled, className }) => {
  return (
    <button
      className={`next-button ${className || ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

ButtonArrow.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

ButtonArrow.defaultProps = {
  disabled: false,
  className: "",
};

export default ButtonArrow;
