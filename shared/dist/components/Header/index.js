"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
require("./Header.css");
require("./Animation.css");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } // Import the CSS file for the Header component
// Import the CSS file for the animation

var steps = ["Step 1", "Step 2", "Step 3"];
function Header() {
  var location = (0, _reactRouterDom.useLocation)();
  var _useState = (0, _react.useState)(1),
    _useState2 = _slicedToArray(_useState, 2),
    stepNumber = _useState2[0],
    setStepNumber = _useState2[1];
  var _useState3 = (0, _react.useState)([1]),
    _useState4 = _slicedToArray(_useState3, 2),
    visitedSteps = _useState4[0],
    setVisitedSteps = _useState4[1]; // Track visited steps
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isSliding = _useState6[0],
    setIsSliding = _useState6[1]; // Track slide state

  (0, _react.useEffect)(function () {
    // Update step number based on current path
    var currentStep = 1;
    switch (location.pathname) {
      case "/step1":
        currentStep = 1;
        break;
      case "/step2":
        currentStep = 2;
        break;
      case "/step3":
        currentStep = 3;
        break;
      default:
        currentStep = 1;
    }
    setStepNumber(currentStep);

    // Add the current step to the visited steps if it's not already in the array
    if (!visitedSteps.includes(currentStep)) {
      setVisitedSteps([].concat(_toConsumableArray(visitedSteps), [currentStep]));
    }
  }, [location.pathname, visitedSteps]);

  // Function to handle step click and trigger slide animation
  var handleStepClick = function handleStepClick(index) {
    if (index + 1 === stepNumber) return; // Prevent animation and navigation if already on the current step

    setIsSliding(true); // Trigger slide animation

    // After animation duration, navigate to the new step
    setTimeout(function () {
      switch (index) {
        case 0:
          window.location.href = "http://localhost:3001/step1";
          break;
        case 1:
          window.location.href = "http://localhost:3002/step2";
          break;
        case 2:
          window.location.href = "http://localhost:3003/step3";
          break;
        default:
          window.location.href = "http://localhost:3001/step1";
          break;
      }
    }, 500); // Duration matches the CSS animation duration
  };

  // Determine the color class for each step based on the active step
  var activeColor = function activeColor(index) {
    return index < stepNumber ? "visited-step" : index === stepNumber ? "active-step" : "inactive-step";
  };
  var isFinalStep = function isFinalStep(index) {
    return index === steps.length - 1;
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "header ".concat(isSliding ? "slide-out" : "slide-in")
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "logo-container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "logo-box"
  }, "RAKBANK USER")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "step-number"
  }, "STEP ", stepNumber), /*#__PURE__*/_react["default"].createElement("div", {
    className: "step-progress flex items-center"
  }, steps.map(function (label, index) {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, {
      key: index
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "step-with-label",
      onClick: function onClick() {
        return handleStepClick(index);
      }
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "circle ".concat(activeColor(index + 1))
    }, index + 1), /*#__PURE__*/_react["default"].createElement("div", {
      className: "label-text"
    }, label)), !isFinalStep(index) && /*#__PURE__*/_react["default"].createElement("div", {
      className: "connector ".concat(activeColor(index + 1))
    }));
  })));
}
var _default = exports["default"] = Header;