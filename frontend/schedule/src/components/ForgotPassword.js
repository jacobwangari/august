import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordForm = () => {
  return (
    <>
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow w-75" style={{ maxWidth: '500px' }}>
        <div className="container">
          <h2 className="text-center mb-4">Forgot Password</h2>
          <div className="form">
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                className="form-control" 
                required 
              />
            </div>
            <div className="form-group">
              <input 
                type="submit" 
                value="Send Password Reset Link" 
                className="btn btn-primary w-100" 
              />
            </div>
            <div className="d-flex justify-content-center mt-4">
              <Link to="/login" className="text-decoration-none">Back to Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  
  );
};

export default ForgotPasswordForm;
