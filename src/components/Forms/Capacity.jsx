import React, { useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const post_capacity = 'https://institute-application-backend.onrender.com/form/post_capacity';

function Capacity() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [phoneValide, setPhoneValidate] = useState([]);
  const [capacity, setCapacity] = useState({
    Date_Of_Registration: "",
    Registration_Number: "",
    certificate: null,
    Name_Of_The_Contact_Person: "",
    TelNo_Of_The_Contact_Person: "",
    Title_Of_The_Contact_Person: "",
    reason: ""
  });
  const [submit, setSubmit] = useState(false);
  const [isRegistered, setIsRegistered] = useState('');

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if(type === 'file'){
      setCapacity({ ...capacity, [name]: files[0] });
    } else {
      setCapacity({ ...capacity, [name]: value });
    }
  };

  const handlePhoneChange = (value) => {
    setCapacity({ ...capacity, TelNo_Of_The_Contact_Person: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    
    const formData = new FormData();
    formData.append("Date_Of_Registration", capacity.Date_Of_Registration);
    formData.append("Registration_Number", capacity.Registration_Number);
    formData.append("certificate", capacity.certificate);
    formData.append("Name_Of_The_Contact_Person", capacity.Name_Of_The_Contact_Person);
    formData.append("TelNo_Of_The_Contact_Person", capacity.TelNo_Of_The_Contact_Person);
    formData.append("Title_Of_The_Contact_Person", capacity.Title_Of_The_Contact_Person);
    formData.append("reason", capacity.reason);
    formData.append("user", user.user_id);

    axios.post(post_capacity, formData)
      .then(response => {
        if (response.status === 201) {
          setSubmit(false);
          ShowSuccessAlert("Submitting Completed");
          navigate("/institute/education_level");
        }
      }).catch(err => {
        if (err.response?.data?.TelNo_Of_The_Contact_Person) {
          setPhoneValidate(err.response.data.TelNo_Of_The_Contact_Person);
        }
        if (err.response && err.response.status === 400 && err.response.data.error) {
          Swal.fire({
            title: err.response.data.error,
            icon: "error",
            timer: 6000,
            toast: true,
            position: 'top',
            timerProgressBar: true,
            showConfirmButton: true,
          });
        } else {
          console.error(err);
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

  const handleRegistrationChange = (e) => {
    setIsRegistered(e.target.value);
  };

  return (
    <div className="container">
      <p className='text-center reg_word'>REGISTRATION AND CAPACITY</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            Is The Enterprise/Company Registered?
          </label>
          <ul>
            <li>
              <input
                type="radio"
                name='registered'
                value='yes'
                onChange={handleRegistrationChange}
                required
              />
              <span>YES</span>
            </li>
            <li>
              <input
                type="radio"
                name='registered'
                value='no'
                onChange={handleRegistrationChange}
                required
              />
              <span>NO</span>
            </li>
          </ul>
        </div>

        {isRegistered === 'no' && (
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Enter Reason
            </label>
            <textarea
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              name='reason'
              value={capacity.reason}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {isRegistered === 'yes' && (
          <>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput2" className="form-label">
                Date Of Registration
              </label>
              <input
                type="date"
                className="form-control"
                id="formGroupExampleInput2"
                name='Date_Of_Registration'
                value={capacity.Date_Of_Registration}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="formGroupExampleInput2" className="form-label">
                Certificate of Registration
              </label>
              <input
                type="file"
                className="form-control"
                id="formGroupExampleInput2"
                name='certificate'
                accept=".pdf, .docx, .zip"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="formGroupExampleInput2" className="form-label">
                Registration Number
              </label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                name='Registration_Number'
                value={capacity.Registration_Number}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="formGroupExampleInput2" className="form-label">
                Name Of The Contact Person
              </label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                name='Name_Of_The_Contact_Person'
                value={capacity.Name_Of_The_Contact_Person}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="formGroupExampleInput2" className="form-label">
                Tel-No Of The Contact Person
              </label>
              <PhoneInput
                country={'ug'}
                value={capacity.TelNo_Of_The_Contact_Person}
                onChange={handlePhoneChange}
                inputProps={{
                  name: 'TelNo_Of_The_Contact_Person',
                  required: true,
                  autoFocus: true
                }}
                containerClass="form-control p-0"
                inputClass="w-100 border-0"
              />
              {phoneValide.map(rule => (
                <p className='text-danger' key={rule}>{rule}</p>
              ))}
            </div>

            <div className="mb-3">
              <label htmlFor="formGroupExampleInput2" className="form-label">
                Title Of The Contact Person
              </label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                name='Title_Of_The_Contact_Person'
                value={capacity.Title_Of_The_Contact_Person}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        <button className='text-white p-2 text-center w-100 btn-register bt' type='submit' disabled={isRegistered === ''}>
          {submit ? 'Submitting...' : 'Submit and continue'}
        </button>
      </form>
    </div>
  );
}

export default Capacity;
