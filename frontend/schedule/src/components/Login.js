import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiUrl } from '../services/config';


const LoginForm = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const endPoint = '/auth/login';
  const fullUrl = apiUrl + endPoint;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Login Successful:', result);
        // Store the token in localStorage
        localStorage.setItem('authToken', result.token);
        // Redirect user to home page
        navigate('/home');
      } else {
        console.error('Login Failed:', result.message);
        setError(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
    }
  };
  

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
  <div className="row w-100">
    <div className="signin card p-4 shadow col-md-6 col-lg-4 mx-auto">
      <div className="content">
        <h2 className="text-center mb-4">Sign In</h2>
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
          <div className="d-flex justify-content-between mb-4">
            <Link to="/forgot-password" className="text-decoration-none">Forgot Password?</Link>
            <Link to="/register" className="text-decoration-none">Signup</Link>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Login"
              className="btn btn-primary w-100"
            />
          </div>
        </form>
        {error && <p className="text-danger text-center mt-3">{error}</p>}
      </div>
    </div>
  </div>
</div>

    </>
  );
  
};

export default LoginForm;
