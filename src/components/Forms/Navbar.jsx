import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Grow from '../images/grow.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


function Navbar() {
  const { handleDisplay, user } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container-fluid">
        {user && (
          <>
          
          <i className="bi bi-list p-2" onClick={handleDisplay}></i>
        
          <div className="nav_img">
            <img src={Grow} alt="grow_logo" className="nav-logo" />
          </div>
          </>
        )}
        {!user && (
  <Link to="/" className="navbar-brand">
  <div className="nouser_img">
    <img src={Grow} alt="grow_logo" className="nav-logo" />
  </div>
  </Link>
        )}
      
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            {user ? (
              <>
                <li className="nav-item text-center p-2">
                  <p className="welcome-text">Welcome back, {user.first_name} {user.last_name}! 👋</p>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item text-center p-2">
                  <Link to="/register" className="btn btn_reg me-2">Apply Now</Link>
                </li>
                <li className="nav-item text-center p-2">
                  <Link to="/" className="btn btn-success">Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
