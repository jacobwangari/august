import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiUrl } from '../data/config.js';

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
    <section>
      {Array.from({ length: 200 }).map((_, index) => (
        <span key={index}></span>
      ))}
      <div className="signin">
        <div className="content">
          <h2>Sign Up</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="inputBox">
              <input 
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required 
              />
              <i>Username</i>
            </div>
            <div className="inputBox">
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required 
              />
              <i>Email</i>
            </div>
            <div className="inputBox">
              <input 
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required 
              />
              <i>Password</i>
            </div>
            <div className="inputBox">
              <input 
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required 
              />
              <i>Confirm Password</i>
            </div>
            <div className="links">
              <Link to="/login" className="link-button">Already have an account?</Link>
            </div>
            <div className="inputBox">
              <input type="submit" value={loading ? "Registering..." : "Register"} disabled={loading} />
            </div>
          </form>
          {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
          {success && <p className="success" style={{ color: 'green' }}>{success}</p>}
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
