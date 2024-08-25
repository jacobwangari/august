import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/Login';
import RegistrationForm from './components/Registration';
import ForgotPasswordForm from './components/ForgotPassword';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import $ from 'jquery';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
    </Router>
  );
};

export default App;
