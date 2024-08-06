import React, { useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const postQnts = 'https://institute-application-backend.onrender.com/form/post_env';

const QuestionsForm = () => {
    const {user} = useContext(AuthContext)
    const [submit, setSubmit] = useState(false)
    const navigate = useNavigate()
  const [QtnsEnv, setQtnsEnv] = useState({
   Harrasment_Prevention: '',
   provided_PPES: '',
  Available_channels: '',
    user:user.user_id
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQtnsEnv({
      ...QtnsEnv,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  setSubmit(true)
    try {
      const response = await axios.post(postQnts, QtnsEnv, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if(response.status === 201){
        setSubmit(false)
        ShowSuccessAlert("Submitting Completed")
        navigate("/institute/additional_info")
    }
      setQtnsEnv({
        Harrasment_Prevention: '',
   provided_PPES: '',
  Available_channels: '',
      });
    } catch (err) {
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
            console.log(err);
          }
          setSubmit(false);
    }
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
  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Environmental, social, safety and Healthy questions</h2>
      <form onSubmit={handleSubmit}>
        {/* Environmental Practices */}
        <div className="mb-4">
          <label className="form-label">How do you address and
prevent harassment or
discrimination in the
workplace?*</label>
          <textarea
            className="form-control"
            rows="3"
            name="Harrasment_Prevention"
            value={QtnsEnv.Harrasment_Prevention}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">What Personal Protective Equipments (PPEs) will be provided to
          apprentice?*</label>
          <textarea
            className="form-control"
            rows="3"
            name="provided_PPES"
            value={QtnsEnv.provided_PPES}
            onChange={handleChange}
            required
          />
        </div>

        {/* Social Responsibility */}
        <div className="mb-4">
          <label className="form-label">What channels are available for
apprentices to report on
grievances and provide
feedback regarding any issues?*</label>
          <textarea
            className="form-control"
            rows="3"
            name="Available_channels"
            value={QtnsEnv.Available_channels}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="text-center text-white p-2 btn-register">
        {submit ? 'Submitting...' : 'Submit and continue'}
        </button>
      </form>
    </div>
  );
};

export default QuestionsForm;
