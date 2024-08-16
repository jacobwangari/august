import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/Login';
import RegistrationForm from './components/Registration';
import ForgotPasswordForm from './components/ForgotPassword';
import Activity from './components/Activity';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Activity/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
    </Router>
  );
};

export default App;
