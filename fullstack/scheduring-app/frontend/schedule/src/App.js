import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/Login';
import RegistrationForm from './components/Registration';
import ForgotPasswordForm from './components/ForgotPassword';
import HomeAdmin from './components/Home-Admin';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<HomeAdmin />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
