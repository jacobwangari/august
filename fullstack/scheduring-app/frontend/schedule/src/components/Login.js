import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });


  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Login Successful:', result);
        // Store the token in the state
        setToken(result.token);
        // Redirect user to home page
        navigate('/');
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
    <section>
      {Array.from({ length: 200 }).map((_, index) => (
        <span key={index}></span>
      ))}
      <div className="signin">
        <div className="content">
          <h2>Sign In</h2>
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
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <i>Password</i>
            </div>
            <div className="links">
              <Link to="/forgot-password" className="link-button">Forgot Password</Link>
              <Link to="/register" className="link-button">Signup</Link>
            </div>
            <div className="inputBox">
              <input type="submit" value="Login" />
            </div>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
