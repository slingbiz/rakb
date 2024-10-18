import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useLocation } from "react-router-dom"; // Hook to access URL params

import { ButtonArrow } from "shared-components";

import "./Step3.css";

const Step3 = () => {
  const location = useLocation();

  const [formData, setFormData] = useState({
    occupation: "",
    employer: "",
    yearsOfExperience: "",
    salary: "",
    additionalNotes: "",
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
  
  // Define Yup validation schema
  const validationSchema = Yup.object({
    occupation: Yup.string().required("Occupation is required"),
    employer: Yup.string().required("Employer is required"),
    yearsOfExperience: Yup.number()
      .typeError("Years of experience must be a number")
      .required("Years of experience is required"),
    salary: Yup.number()
      .typeError("Salary must be a number")
      .required("Salary is required"),
    additionalNotes: Yup.string().required("Additional notes are required"),
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
          body: JSON.stringify({ ...formData, userId, step: 3 }), // Include userId and step number
        }
      );

      if (response.ok) {
        const result = await response.json();
        setBackendId(result.id); // Assuming the backend returns an `id`
        setSubmissionStatus("success");
      } else {
        throw new Error("Failed to submit form");
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
        occupation: "",
        employer: "",
        yearsOfExperience: "",
        salary: "",
        additionalNotes: "",
      });
      setBackendId(null);
      window.location.href = "http://localhost:3001/step1"; // Navigate to Step2

      return;
    }
    setSubmissionStatus(null);
  };

  return (
    <div className="wrapper">
      <div className="step3-container">
        <div className="form-head">
          <h2>STEP 3: Employment Details</h2>
        </div>

        <div className="form-row">
          <div className="form-label">
            <label htmlFor="occupation">Occupation</label>
          </div>
          <div className="form-input">
            <input
              type="text"
              id="occupation"
              value={formData.occupation}
              onChange={handleChange}
              placeholder="Occupation"
            />
            {errors.occupation && (
              <div className="error">{errors.occupation}</div>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">
            <label htmlFor="employer">Employer</label>
          </div>
          <div className="form-input">
            <input
              type="text"
              id="employer"
              value={formData.employer}
              onChange={handleChange}
              placeholder="Employer"
            />
            {errors.employer && <div className="error">{errors.employer}</div>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">
            <label htmlFor="yearsOfExperience">Years of Experience</label>
          </div>
          <div className="form-input">
            <input
              type="text"
              id="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleChange}
              placeholder="Years of Experience"
            />
            {errors.yearsOfExperience && (
              <div className="error">{errors.yearsOfExperience}</div>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">
            <label htmlFor="salary">Current Salary</label>
          </div>
          <div className="form-input">
            <input
              type="text"
              id="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Salary"
            />
            {errors.salary && <div className="error">{errors.salary}</div>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">
            <label htmlFor="additionalNotes">Additional Notes</label>
          </div>
          <div className="form-input">
            <textarea
              id="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              placeholder="Any additional details?"
            />
            {errors.additionalNotes && (
              <div className="error">{errors.additionalNotes}</div>
            )}
          </div>
        </div>

        <div className="form-head">
          {/* <button className="next-button" onClick={handleSubmit}>
            Submit
          </button> */}
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

export default Step3;
