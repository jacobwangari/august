import React from 'react';
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
  return (
    <section>
      {Array.from({ length: 200 }).map((_, index) => (
        <span key={index}></span>
      ))}
      <div className="signin">
        <div className="content">
          <h2>Sign Up</h2>
          <div className="form">
            <div className="inputBox">
              <input type="text" required />
              <i>Username</i>
            </div>
            <div className="inputBox">
              <input type="email" required />
              <i>Email</i>
            </div>
            <div className="inputBox">
              <input type="password" required />
              <i>Password</i>
            </div>
            <div className="inputBox">
              <input type="password" required />
              <i>Confirm Password</i>
            </div>
            <div className="links">
              <Link to="/login" className="link-button">Already have an account?</Link>
            </div>
            <div className="inputBox">
              <input type="submit" value="Register" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
