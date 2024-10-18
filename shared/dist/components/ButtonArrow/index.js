"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
require("./ButtonArrow.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// shared/components/ButtonArrow.js

// Import the CSS for the button

var ButtonArrow = function ButtonArrow(_ref) {
  var label = _ref.label,
    onClick = _ref.onClick,
    disabled = _ref.disabled,
    className = _ref.className;
  return /*#__PURE__*/_react["default"].createElement("button", {
    className: "next-button ".concat(className || ""),
    onClick: onClick,
    disabled: disabled
  }, label);
};
ButtonArrow.propTypes = {
  label: _propTypes["default"].string.isRequired,
  onClick: _propTypes["default"].func.isRequired,
  disabled: _propTypes["default"].bool,
  className: _propTypes["default"].string
};
ButtonArrow.defaultProps = {
  disabled: false,
  className: ""
};
var _default = exports["default"] = ButtonArrow;