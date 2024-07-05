import React, { useContext, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { AuthContext } from '../context/AuthContext';
import Grow from '../images/grow.png';

function Register() {
  const { RegisterUser, passwordError, usernameError } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [mobileError, setMobileError] = useState("");
  const [employer, setEmployer] = useState({
    email: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    mobile: "",
    password: "",
    confirm_password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployer({ ...employer, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setEmployer({ ...employer, mobile: value });
    setMobileError(""); // Reset mobile error on change
  };

  const handleSubmit = (e) => {
    setLoading(false);
    e.preventDefault();
if(RegisterUser){
  const { email, first_name, last_name, middle_name, mobile, password, confirm_password } = employer;
  
    // Mobile validation
    const phoneNumber = mobile.replace(/\D/g, ''); // Remove all non-numeric characters
    if (phoneNumber.length > 12) {
      setMobileError("Mobile number cannot exceed 12 digits.");
      return;
    }
  RegisterUser(email, first_name, last_name, middle_name, mobile, password, confirm_password);
}
   
    setLoading(true);
  };

  return (
    <div className="register_container container-fluid">
      <div className="grow_img">
        <img src={Grow} alt='grow_png' />
      </div>
      <span className="text-center reg_word">Register Now</span>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="firstName" className="form-label">First Name*</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="first_name"
            value={employer.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="lastName" className="form-label">Last Name*</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="last_name"
            value={employer.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="middleName" className="form-label">Middle Name</label>
          <input
            type="text"
            className="form-control"
            id="middleName"
            name="middle_name"
            value={employer.middle_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">Email*</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={employer.email}
            onChange={handleChange}
            required
          />
          {usernameError && usernameError.map((err, index) => (
            <p className="text-danger" key={index}>{err}</p>
          ))}
        </div>
        <div className="col-md-6">
          <label htmlFor="mobile" className="form-label">Mobile*</label>
          <PhoneInput
            country={'ug'}
            value={employer.mobile}
            onChange={handlePhoneChange}
            inputProps={{
              name: 'mobile',
              required: true,
              className: 'form-control',
            }}
            countryCodeEditable={false}
            required
          />
          {mobileError && <p className="text-danger">{mobileError}</p>}
        </div>
        <div className="col-md-6">
          <label htmlFor="password" className="form-label">Password*</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={employer.password}
            onChange={handleChange}
            required
          />
          {passwordError && passwordError.map((err, index) => (
            <p className="text-danger" key={index}>{err}</p>
          ))}
        </div>
        <div className="col-md-6">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password*</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirm_password"
            value={employer.confirm_password}
            onChange={handleChange}
            required
          />
          {passwordError && passwordError.map((err, index) => (
            <p className="text-danger" key={index}>{err}</p>
          ))}
        </div>
        <div className="col-12">
          <button className="btn-register text-white text-center p-2" type="submit">
            {loading ? 'Registering' : 'Register'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
