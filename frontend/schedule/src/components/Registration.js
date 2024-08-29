import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiUrl } from '../services/config.js';

const RegistrationForm = () => {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });

  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [token, setToken] = useState(null); // Define token state

  const navigate = useNavigate();
  const endPoint = "/register";
  const fullUrl = apiUrl + endPoint;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);   // Reset error state
    setSuccess(null); // Reset success state

    if (formData.password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true); // Indicate loading state

    try {
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess("Registration successful! Redirecting to login...");
        setToken(result.token); // Set token received from server
        setTimeout(() => navigate('/login'), 2000); // Delay redirect for user to see success message
      } else {
        setError(result.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <>
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
  <div className="signin card p-4 shadow w-75" style={{ maxWidth: '500px' }}>
    <div className="content">
      <h2 className="text-center mb-4">Sign Up</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form-control"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>
        <div className="d-flex justify-content-center mb-4">
          <Link to="/login" className="text-decoration-none">Already have an account?</Link>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value={loading ? "Registering..." : "Register"}
            className="btn btn-primary w-100"
            disabled={loading}
          />
        </div>
      </form>
      {error && <p className="text-danger text-center mt-3">{error}</p>}
      {success && <p className="text-success text-center mt-3">{success}</p>}
    </div>
  </div>
</div>

    </>
      
  );
};

export default RegistrationForm;
