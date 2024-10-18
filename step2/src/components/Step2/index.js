import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useLocation } from "react-router-dom"; // Hook to access URL params

import { ButtonArrow } from "shared-components";

import "./Step2.css"; // Assuming styles are defined similarly

const Step2 = () => {
  const location = useLocation();

  const [formData, setFormData] = useState({
    contactPerson: "",
    relationship: "",
    contactNumber: "",
    emergencyEmail: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [backendId, setBackendId] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Extract userId from localStorage
    let localStorageUserId = localStorage.getItem("userId");

    // If userId is not available in localStorage, fallback to URL parameter
    if (!localStorageUserId) {
      const queryParams = new URLSearchParams(location.search);
      const urlUserId = queryParams.get("userId");

      if (urlUserId) {
        localStorage.setItem("userId", urlUserId); // Save it in localStorage for further steps
        setUserId(urlUserId);
      }
    } else {
      setUserId(localStorageUserId);
    }
  }, [location]);

  // Define Yup validation schema for Step 2
  const validationSchema = Yup.object({
    contactPerson: Yup.string().required("Contact Person is required"),
    relationship: Yup.string().required("Relationship is required"),
    contactNumber: Yup.string()
      .matches(/^[0-9]+$/, "Contact number must be a number")
      .required("Contact number is required"),
    emergencyEmail: Yup.string()
      .email("Invalid email format")
      .required("Emergency email is required"),
    notes: Yup.string().required("Notes are required"),
  });

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Validate form data and set errors
  const validateForm = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((validationError) => {
        newErrors[validationError.path] = validationError.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    const isValid = await validateForm();
    if (!isValid) return;

    try {
      // Mocking the backend API call (replace this with your actual API endpoint)
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/saveData`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, userId, step: 2 }), // Include userId and step number
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      } else {
        const urlWithUserId = `${process.env.REACT_APP_STEP3_URL}/step3?userId=${userId}`;
        window.location.href = urlWithUserId;
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionStatus("failure");
    }
  };

  const handleDialogClose = () => {
    if (submissionStatus === "success") {
      // Reset form for a new registration
      setFormData({
        contactPerson: "",
        relationship: "",
        contactNumber: "",
        emergencyEmail: "",
        notes: "",
      });
      setBackendId(null);
      window.location.href = "http://localhost:3003/step3"; // Navigate to Step 3
      return;
    }
    setSubmissionStatus(null);
  };

  return (
    <div className="wrapper">
      <div className="step2-container">
        <div className="form-head">
          <h2>STEP 2: Contact Information</h2>
        </div>

        <div className="form-row">
          <div className="form-label">
            <label htmlFor="contactPerson">Contact Person</label>
          </div>
          <div className="form-input">
            <input
              type="text"
              id="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              placeholder="Contact Person"
            />
            {errors.contactPerson && (
              <div className="error">{errors.contactPerson}</div>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">
            <label htmlFor="relationship">Relationship</label>
          </div>
          <div className="form-input">
            <input
              type="text"
              id="relationship"
              value={formData.relationship}
              onChange={handleChange}
              placeholder="Relationship"
            />
            {errors.relationship && (
              <div className="error">{errors.relationship}</div>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">
            <label htmlFor="contactNumber">Contact Number</label>
          </div>
          <div className="form-input">
            <input
              type="text"
              id="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Contact Number"
            />
            {errors.contactNumber && (
              <div className="error">{errors.contactNumber}</div>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">
            <label htmlFor="emergencyEmail">Emergency Email</label>
          </div>
          <div className="form-input">
            <input
              type="email"
              id="emergencyEmail"
              value={formData.emergencyEmail}
              onChange={handleChange}
              placeholder="Emergency Email"
            />
            {errors.emergencyEmail && (
              <div className="error">{errors.emergencyEmail}</div>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">
            <label htmlFor="notes">Notes</label>
          </div>
          <div className="form-input">
            <textarea
              id="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any additional details?"
            />
            {errors.notes && <div className="error">{errors.notes}</div>}
          </div>
        </div>

        <div className="form-head">
          <ButtonArrow label="Next" onClick={handleSubmit} />
        </div>

        {/* Show dialog based on submission status */}
        {submissionStatus && (
          <div className="dialog-overlay">
            <div className="dialog-box">
              {submissionStatus === "success" ? (
                <>
                  <h3>Registration Success</h3>
                  <p>Your registration ID is: {backendId}</p>
                  <button onClick={handleDialogClose}>OK</button>
                </>
              ) : (
                <>
                  <h3>Submission Failed</h3>
                  <p>There was an error submitting your registration.</p>
                  <button onClick={handleDialogClose}>Try Again</button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step2;
