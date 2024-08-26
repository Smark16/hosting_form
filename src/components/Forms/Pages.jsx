import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import GrowProfile from '../images/profile.jpg';
import { AuthContext } from '../context/AuthContext';

function Pages() {
  const {user} = useContext(AuthContext)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  const location = useLocation()
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setMenu(!menu);
  };

  return (
    <>
        <Link to='/institute/profile' className='text-white Links'>
      <div className="profile_div">
        <ul>
          <li>
          <i className="bi bi-person-circle"></i>
          <span className='text-white'>
            {user.username}
          </span>
          </li>
        </ul>
       
      </div>
        </Link>

      <ul className="sidelists">
        <li className='side_list'>
          <div className={`dropdown ${dropdownOpen ? 'open' : ''}`}>
            <div className="lite d-flex" onClick={toggleDropdown}>
              <span>
                <i className="bi bi-activity"></i>
                <p className="text-white">Institution Information</p>
              </span>
              <i className={`bi bi-chevron-down ${dropdownOpen ? 'rotate' : ''}`}></i>
            </div>
            <div className="dropdown-content">
              <ul>
                <li className='sublink'>
                  <p><Link to='/institute/information' className='text-white Link'>Basic Infomation</Link></p>
                </li>
                <li className='sublink'>
                  <p><Link to='/institute/physical_Address' className='text-white Link'>Physical Address</Link></p>
                </li>
              </ul>
            </div>
          </div>
        </li>

        <li className={location.pathname === '/institute/registration_and_capacity' ? 'side_list activeLink' : 'side_list'}>
          <i className="bi bi-menu-button-wide"></i>
          <p><Link to='/institute/registration_and_capacity' className='text-white Link'>Registration And Capacity</Link></p>
        </li>

        <li className='side_list'>
          <div className={`dropdown ${menu ? 'open' : ''}`}>
            <div className="lite" onClick={toggleMenu}>
              <span>
                <i className="bi bi-bag-dash-fill"></i>
                <p className='text-white'>Employees</p>
              </span>
              <i className={`bi bi-chevron-down ${menu ? 'rotate' : ''}`}></i>
            </div>
            <div className="dropdown-content">
              <ul>
                <li className='sublink'>
                  <p><Link to='/institute/education_level' className='text-white Link'>Education Level</Link></p>
                </li>
                <li className='sublink'>
                  <p><Link to='/institute/category' className='text-white Link'>Category</Link></p>
                </li>
              </ul>
            </div>
          </div>
        </li>

        <li className={location.pathname === '/institute/operation_sector' ? 'side_list activeLink' : 'side_list'}>
        <i class="bi bi-bank"></i>
          <p><Link to='/institute/operation_sector' className='text-white Link'>Sector Of Operation</Link></p>
        </li>

        <li className={location.pathname === '/institute/hosting_apprentices' ? 'side_list activeLink' : 'side_list'}>
        <i class="bi bi-backpack4-fill"></i>
          <p><Link to='/institute/hosting_apprentices' className='text-white Link'>Hosting Apprentices</Link></p>
        </li>

          <li className={location.pathname === '/institute/environment_questions' ? 'side_list activeLink' : 'side_list'}>
          <i className="bi bi-tree-fill"></i>
          <p><Link to='/institute/environment_questions' className='text-white Link'>Environment</Link></p>
        </li>

        <li className={location.pathname === '/institute/additional_info' ? 'side_list activeLink' : 'side_list'}>
        <i class="bi bi-info-square-fill"></i>
          <p><Link to='/institute/additional_info' className='text-white Link'>Additional Information</Link></p>
        </li>

        {/* <li className={location.pathname === '/institute/view_details' ? 'side_list activeLink' : 'side_list'}>
          <i className="bi bi-person-circle"></i>
          <p><Link to='/institute/view_details' className='text-white Link'>Additional Information</Link></p>
        </li> */}
      </ul>

      <ul className="logout">
        <li>
          <i className="bi bi-box-arrow-right"></i>
          <p><Link to='logout' className='text-white Link'>Logout</Link></p>
        </li>
      </ul>
    </>
  );
}

export default Pages;
