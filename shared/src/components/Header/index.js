import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Header.css"; // Import the CSS file for the Header component
import "./Animation.css"; // Import the CSS file for the animation

const steps = ["Step 1", "Step 2", "Step 3"];

function Header() {
  const location = useLocation();
  const [stepNumber, setStepNumber] = useState(1);
  const [visitedSteps, setVisitedSteps] = useState([1]); // Track visited steps
  const [isSliding, setIsSliding] = useState(false); // Track slide state

  useEffect(() => {
    // Update step number based on current path
    let currentStep = 1;
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
      setVisitedSteps([...visitedSteps, currentStep]);
    }
  }, [location.pathname, visitedSteps]);

  // Function to handle step click and trigger slide animation
  const handleStepClick = (index) => {
    if (index + 1 === stepNumber) return; // Prevent animation and navigation if already on the current step

    setIsSliding(true); // Trigger slide animation

    // After animation duration, navigate to the new step
    setTimeout(() => {
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
  const activeColor = (index) =>
    index < stepNumber
      ? "visited-step"
      : index === stepNumber
      ? "active-step"
      : "inactive-step";
  const isFinalStep = (index) => index === steps.length - 1;

  return (
    <div className={`header ${isSliding ? "slide-out" : "slide-in"}`}>
      {/* Red box logo */}
      <div className="logo-container">
        <div className="logo-box">RAKBANK USER</div>
      </div>

      {/* Step number */}
      <div className="step-number">STEP {stepNumber}</div>

      {/* Step progress */}
      <div className="step-progress flex items-center">
        {steps.map((label, index) => (
          <React.Fragment key={index}>
            <div
              className="step-with-label"
              onClick={() => handleStepClick(index)}
            >
              <div className={`circle ${activeColor(index + 1)}`}>
                {index + 1}
              </div>
              <div className="label-text">{label}</div>
            </div>
            {!isFinalStep(index) && (
              <div className={`connector ${activeColor(index + 1)}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Header;
