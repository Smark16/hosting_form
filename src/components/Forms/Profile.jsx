import React, { useContext, useEffect, useState } from 'react';
import ProfileImg from '../images/profile.jpg'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import UseAxios from '../context/UseAxios';

const changePassword = 'https://institute-application-backend.onrender.com/form/change-password/';

function Profile() {
  const { user } = useContext(AuthContext);
  const axiosInstance = UseAxios();
  const headTeacher = `https://institute-application-backend.onrender.com/form/get_user/${user.user_id}`;
  const head = `https://institute-application-backend.onrender.com/form/update_user/${user.user_id}`;
  const [loggedUser, setLoggedUser] = useState({ username: "", email: "" , first_name:"", last_name:"", date_joined:""});
  const [status, setStatus] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await axios.get(headTeacher);
      setLoggedUser(response.data);
    } catch (err) {
      console.log('There is an error', err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoggedUser({ ...loggedUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", loggedUser.username);
    formData.append("email", loggedUser.email);
    formData.append("first_name", loggedUser.first_name)
    formData.append("last_name", loggedUser.last_name)
    formData.append("date_joined", loggedUser.date_joined)

    try {
      const res = await axiosInstance.put(head, formData);
      if (res.status === 200) {
        showSuccessAlert("Profile Updated");
      }
    } catch (err) {
      console.log('There is an error', err);
    }
  };

  const showSuccessAlert = (message) => {
    Swal.fire({
      title: message,
      icon: "success",
      timer: 2000,
    });
  };

  const handlePassword = async (e) => {
    setStatus(true)
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      setStatus(false)
      return;
    }

    const formData = new FormData();
    formData.append("old_password", oldPassword);
    formData.append("password", newPassword);
    formData.append("password2", confirmPassword);

    try {
      const response = await axiosInstance.put(changePassword, formData);
      setMessage(response.data.message);
      setStatus(false)
    } catch (error) {
      const errorMsg = error.response.data;
      if (errorMsg.old_password) {
        setMessage(errorMsg.old_password);
      } else {
        setMessage("An error occurred. Please try again.");
      }
      setStatus(false)
    }
  };

  return (
    <>
      <h4 className='text-center mt-3'>VIEW YOUR PROFILE</h4>
      <div className="row studProfile">
        <div className="col-md-4 col-sm-12 pror">
          <img src={ProfileImg} alt="Profile" className='profile_img'/> {/* Changed the variable name */}
          <ul>
            <li>
              <h5>Username: </h5>
              <span>{loggedUser.username}</span>
            </li>
            <li>
              <h5>Email: </h5>
              <span>{loggedUser.email}</span>
            </li>

            <li>
              <h5>first_name: </h5>
              <span>{loggedUser.first_name}</span>
            </li>

            <li>
              <h5>last_name: </h5>
              <span>{loggedUser.last_name}</span>
            </li>

            <li>
              <h5>date_joined: </h5>
              <span>{loggedUser.date_joined}</span>
            </li>
          </ul>
        </div>
        <div className="col-md-7 col-sm-12 container cotty">
          <form onSubmit={handleSubmit}>
            <h4>Edit Profile</h4>
            <div className="row mb-3">
              <label htmlFor="inputUsername" className="col-sm-2 col-form-label">
                Username
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputUsername"
                  name='username'
                  value={loggedUser.username}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  name='email'
                  value={loggedUser.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
                First Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail"
                  name='first_name'
                  value={loggedUser.first_name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
                Last Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail"
                  name='last_name'
                  value={loggedUser.last_name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="pro_btns">
              <button type="submit" className="btn btn-primary">
                Update Profile
              </button>
              <button type="button" className="btn bg-black text-white" onClick={() => setShowModal(true)}>
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Custom Modal */}
      {showModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <div className="custom-modal-header">
              <h5 className="custom-modal-title">Change Password</h5>
              <button type="button" className="close" onClick={() => setShowModal(false)}>
                &times;
              </button>
            </div>
            <div className="custom-modal-body">
              <form onSubmit={handlePassword}>
                <div className="mb-3">
                  <label htmlFor="oldPassword" className="form-label">Old Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="oldPassword"
                    name='oldPassword'
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    name='newPassword'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  {status ? 'reseting...' : 'Update Password'}
              
                  </button>
                {message && <div className="alert alert-info mt-3">{message}</div>}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
