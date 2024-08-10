import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordForm = () => {
  return (
    <section>
      {Array.from({ length: 200 }).map((_, index) => (
        <span key={index}></span>
      ))}
      <div className="forgotpassword">
        <div className="content">
          <h2>Forgot Password</h2>
          <div className="form">
            <div className="inputBox">
              <input type="email" required />
              <i>Email</i>
            </div>
            <div className="inputBox">
              <input type="submit" value="Send Password Reset Link" />
            </div>
            <div className="links">
              <Link to="/login" className="link-button">Back to Login</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordForm;
