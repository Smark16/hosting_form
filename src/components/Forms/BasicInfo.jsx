import React, { useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { AuthContext } from '../context/AuthContext';

const postBasics = 'https://institute-application-backend.onrender.com/form/post_basics';

function BasicInfo() {
  const { user } = useContext(AuthContext);
  const [basic, setBasic] = useState({
    NameOfTheIndustry: "",
    Telephone: "",
    WebsiteLink: "",
    ContactEmail: ""
  });
  const [submit, setSubmit] = useState(false);
  const [showWebsiteLink, setShowWebsiteLink] = useState(false);
  const [mobileErrors, setMobileErrors] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBasic({ ...basic, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setBasic({ ...basic, Telephone: value });
  };

  const handleSubmit = (e) => {
    setSubmit(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("NameOfTheIndustry", basic.NameOfTheIndustry);
    formData.append("Telephone", basic.Telephone);
    formData.append("WebsiteLink", basic.WebsiteLink);
    formData.append("ContactEmail", basic.ContactEmail);
    formData.append("user", user.user_id);

    axios.post(postBasics, formData)
      .then(response => {
        if (response.status === 201) {
          setSubmit(false);
          ShowSuccessAlert("Submitting Completed");
          navigate("/institute/physical_Address");
        }
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 400 && err.response.data.error) {
            Swal.fire({
              title: err.response.data.error,
              icon: "error",
              timer: 6000,
              toast: true,
              position: 'top',
              timerProgressBar: true,
              showConfirmButton: true,
            });
          } else if (err.response.data.mobile) {
            setMobileErrors(err.response.data.mobile);
          }
        } else {
          console.log(err);
        }
        setSubmit(false);
      });
  };

  const ShowSuccessAlert = (message) => {
    Swal.fire({
      title: message,
      icon: "success",
      timer: 6000,
      toast: true,
      position: 'top',
      timerProgressBar: true,
      showConfirmButton: true,
    });
  };

  const handleWebsiteLinkOption = (option) => {
    setShowWebsiteLink(option === 'yes');
  };

  return (
    <div className="container">
      <p className="text-center reg_word">BASIC INFORMATION</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">Name Of The Enterprise/Industry</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            name="NameOfTheIndustry"
            value={basic.NameOfTheIndustry}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">Telephone Contact</label>
          <PhoneInput
            country="ug"
            value={basic.Telephone}
            onChange={handlePhoneChange}
            inputProps={{
              name: 'Telephone',
              required: true,
              autoFocus: true
            }}
            containerClass="form-control p-0"
            inputClass="w-100 border-0"
          />
          {mobileErrors && mobileErrors.map((err, index) => (
            <p key={index} className="text-danger">Enter valid phone number</p>
          ))}
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">Does Your Business Have Website Link</label>
          <ul>
            <li>
              <input
                type="radio"
                name="websiteOption"
                value="yes"
                onChange={() => handleWebsiteLinkOption('yes')}
                required
              />
              <span>YES</span>
            </li>
            <li>
              <input
                type="radio"
                name="websiteOption"
                value="no"
                onChange={() => handleWebsiteLinkOption('no')}
                required
              />
              <span>NO</span>
            </li>
          </ul>
        </div>
        {showWebsiteLink && (
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">Website Link</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              name="WebsiteLink"
              value={basic.WebsiteLink}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">Institute Email</label>
          <input
            type="email"
            className="form-control"
            id="formGroupExampleInput2"
            name="ContactEmail"
            value={basic.ContactEmail}
            onChange={handleChange}
            required
          />
        </div>
        <button className="text-white p-2 text-center w-100 btn-register" type="submit" disabled={submit}>
          {submit ? 'Submitting...' : 'Submit and continue'}
        </button>
      </form>
    </div>
  );
}

export default BasicInfo;
