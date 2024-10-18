import React, { useState } from "react";
import * as Yup from "yup";
import { ButtonArrow } from "shared-components";
import { v4 as uuidv4 } from "uuid"; // UUID for generating unique IDs

import "./Step1.css"; // Assuming styles are defined similarly

const Step1 = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [backendId, setBackendId] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

  // Define Yup validation schema for Step 1
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must be a number")
      .required("Phone number is required"),
    address: Yup.string().required("Address is required"),
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

    // If no userId exists, generate one and store it
    if (!userId) {
      const generatedId = uuidv4();
      localStorage.setItem("userId", generatedId);
      setUserId(generatedId);
    }
    try {
      // Mocking the backend API call (replace this with your actual API endpoint)
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/saveData`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }else{
        const urlWithUserId = `${process.env.REACT_APP_STEP2_URL}/step2?userId=${userId}`;
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
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
      });
      setBackendId(null);

      return;
    }
    setSubmissionStatus(null);
  };

  return (
    <div className="wrapper">
      <div className="step1-container">
        <div className="form-head">
          <h2>STEP 1: Personal Information</h2>
        </div>

        <div className="form-row">
          <div className="form-label">
            <label htmlFor="firstName">First Name</label>
          </div>
          <div className="form-input">
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
            {errors.firstName && (
              <div className="error">{errors.firstName}</div>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">
            <label htmlFor="lastName">Last Name</label>
          </div>
          <div className="form-input">
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
            {errors.lastName && <div className="error">{errors.lastName}</div>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-input">
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">
            <label htmlFor="phoneNumber">Phone Number</label>
          </div>
          <div className="form-input">
            <input
              type="text"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
            />
            {errors.phoneNumber && (
              <div className="error">{errors.phoneNumber}</div>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">
            <label htmlFor="address">Address</label>
          </div>
          <div className="form-input">
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
            />
            {errors.address && <div className="error">{errors.address}</div>}
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

export default Step1;
