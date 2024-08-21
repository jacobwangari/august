import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { apiUrl } from '../services/config';

function Navbar() {

  const endPoint = '/auth/logout';
  const fullUrl = apiUrl + endPoint;

  const logout = async () => {
    try {
        const token = localStorage.getItem('authToken'); 
        if (!token) {
            console.error('No token found');
            return;
        }

        const response = await fetch(fullUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Logout failed');
        }

        localStorage.removeItem('authToken');
     
        console.log('Logged out successfully');
        window.location.href = '/login'; 

    } catch (error) {
        console.error('Error during logout:', error);
    }
};

  return (
    <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
      <div className="container-fluid justify-content-between">
        <a className="navbar-brand text-white" href="#">Logo</a>
        <ul className="navbar-nav  d-flex flex-row justify-content-end ">
          
          <li className="nav-item mx-2">
            <a className="nav-link text-white" href="#"><i className="fas fa-home mx-1"></i> Home</a>
          </li>
          <li className="nav-item mx-2">
            <a className="nav-link text-white" href="#"><i className="fas fa-chart-bar mx-1"></i> Summary</a>
          </li>
          <li className="nav-item mx-2">
            <a className="nav-link text-white" href="#"><i className="fas fa-check-circle mx-1"></i> Review</a>
          </li>
          <li className="nav-item mx-2">
            <a className="nav-link text-white" href="#"><i className="fas fa-calendar mx-1"></i> Calender</a>
          </li>
          <li className="nav-item mx-2">
            <a className="nav-link text-white" href="#"><i className="fas fa-cog mx-1"></i> Settings</a>
          </li>
          <li className="nav-item mx-2">
            <a className="nav-link text-white" href="#"><i className="fas fa-envelope mx-1"></i> Contact</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button"
              data-bs-toggle="dropdown" aria-expanded="false">
              <i className="fas fa-user mx-1"></i> Profile
            </a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item" href="#">My account</a></li>
              <li><button className="dropdown-item" onClick={logout}>Log out</button></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
