import React, { useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const postTrade = 'https://institute-application-backend.onrender.com/form/post_trade'; // Update this URL to your actual endpoint

function Trade() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [tradeData, setTradeData] = useState({
    targeted_trade: '',
    reason_for_partnership: '',
    enterprise_size: '',
    dev_stage: '',
    track_record: '',
    expertise: '',
    staff_mentoring: '',
    infrastructure: '',
    user: user.user_id
  });
  const [submit, setSubmit] = useState(false);

  const handleSelect = (e)=>{
    const selected = e.target.value
    setTradeData({...tradeData,  targeted_trade:selected})
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTradeData({ ...tradeData, [name]: value });
    // if (type === 'checkbox') {
    //   setTradeData({ ...tradeData, [name]: checked ? value : '' });
    // } else {
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);

    axios.post(postTrade, tradeData)
      .then(response => {
        if (response.status === 201) {
          setSubmit(false);
          ShowSuccessAlert("Trade Data Submitted Successfully");
          setTradeData({
            targeted_trade: '',
            reason_for_partnership: '',
            enterprise_size: '',
            dev_stage: '',
            track_record: '',
            expertise: '',
            staff_mentoring: '',
            infrastructure: ''
          });
          navigate("/institute/hosting_apprentices");
        }
      })
      .catch(err => {
        console.error(err);
        setSubmit(false);
        const errorData = err.response?.data;
        if (errorData) {
          ShowErrorAlert("Submission failed. Please check your input and try again.", errorData);
        } else {
          ShowErrorAlert("Submission failed due to an unknown error. Please try again later.");
        }
      });
  };

  const ShowErrorAlert = (message, errorData = null) => {
    let errorMessage = message;

    if (errorData) {
      errorMessage += '\nDetails:\n';
      Object.entries(errorData).forEach(([key, value]) => {
        errorMessage += `\n${key}: ${Array.isArray(value) ? value.join(', ') : value}`;
      });
    }

    Swal.fire({
      title: 'Error',
      html: `<pre>${errorMessage}</pre>`,
      icon: 'error',
      timer: 6000,
      toast: true,
      position: 'top',
      timerProgressBar: true,
      showConfirmButton: true
    });
  };

  const ShowSuccessAlert = (message) => {
    Swal.fire({
      title: message,
      icon: 'success',
      timer: 6000,
      toast: true,
      position: 'top',
      timerProgressBar: true,
      showConfirmButton: true
    });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3 label_form">
          <p className='whuu'>Trade/Sector of Operation</p>
          <label htmlFor="targeted_trade" className="form-label">
            Choose targeted priority trades Enterprise/Industry is involved in?
          </label>
          <div>
            <select onChange={handleSelect} className="form-control">
              <option>Choose Enterprize</option>
              <option value="Hotel and Hospitality">Hotel and Hospitality</option>
              <option value="Food and agro-processing">Food and agro-processing</option>
              <option value="Cosmetology">Cosmetology</option>
              <option value="Tailoring and textiles">Tailoring and textiles</option>
              <option value="Welding and Metal fabrication">Welding and Metal fabrication</option>
              <option value="Electrical and electronics">Electrical and electronics</option>
              <option value="Performing Arts">Performing Arts</option>
              <option value="Construction">Construction</option>
              <option value="Mechanical">Mechanical</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <p className='whuu'>Partnership and Willingness</p>
          <label htmlFor="reason_for_partnership" className="form-label">
            Why Does your Industry association/Enterprise want to partner with the Ministry of Gender, Labour and Social Development and Grow project for work placement program?
          </label>
          <textarea
            name="reason_for_partnership"
            className="form-control"
            value={tradeData.reason_for_partnership}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3 label_form">
          <p className='whuu'>Business Size and Stage</p>
          <label htmlFor="enterprise_size" className="form-label">
            Size of the enterprise
          </label>
          <div>
            <label>
              <input
                type="checkbox"
                name="enterprise_size"
                value="Micro"
                checked={tradeData.enterprise_size === "Micro"}
                onChange={handleChange}
              />
              Micro (1-4 employees)
            </label>
            <label>
              <input
                type="checkbox"
                name="enterprise_size"
                value="Small"
                checked={tradeData.enterprise_size === "Small"}
                onChange={handleChange}
              />
              Small (5-49 employees)
            </label>
            <label>
              <input
                type="checkbox"
                name="enterprise_size"
                value="Medium"
                checked={tradeData.enterprise_size === "Medium"}
                onChange={handleChange}
              />
              Medium (50-100 employees)
            </label>
            <label>
              <input
                type="checkbox"
                name="enterprise_size"
                value="Large"
                checked={tradeData.enterprise_size === "Large"}
                onChange={handleChange}
              />
              Large (100 and above employees)
            </label>
          </div>
        </div>

        <div className="mb-3 stage">
          <label htmlFor="dev_stage" className="form-label">
            Stage of Development of the enterprise
          </label>
          <div>
            <label>
              <input
                type="checkbox"
                name="dev_stage"
                value="Early-stage"
                checked={tradeData.dev_stage === "Early-stage"}
                onChange={handleChange}
              />
              Early-stage
            </label>
            <label>
              <input
                type="checkbox"
                name="dev_stage"
                value="Growth-stage"
                checked={tradeData.dev_stage === "Growth-stage"}
                onChange={handleChange}
              />
              Growth-stage
            </label>
            <label>
              <input
                type="checkbox"
                name="dev_stage"
                value="Mature-stage"
                checked={tradeData.dev_stage === "Mature-stage"}
                onChange={handleChange}
              />
              Mature-stage
            </label>
          </div>
        </div>

        <div className="mb-3">
          <p className='whuu'>Business Success Record</p>
          <label htmlFor="track_record" className="form-label">
            Provide Brief Overview of the enterprise's track record of business growth
          </label>
          <textarea
            name="track_record"
            className="form-control"
            value={tradeData.track_record}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <p className='whuu'>Industry Expertise</p>
          <label htmlFor="expertise" className="form-label">
            Describe the enterprise's expertise in the relevant field selected in (Trade/sector of Operation) section
          </label>
          <textarea
            name="expertise"
            className="form-control"
            value={tradeData.expertise}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <p className='whuu'>Mentorship Capacity</p>
          <label htmlFor="staff_mentoring" className="form-label">
            Describe the adequacy of competent and experienced staff to guide and mentor apprentices in your enterprise
          </label>
          <textarea
            name="staff_mentoring"
            className="form-control"
            value={tradeData.staff_mentoring}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <p className='whuu'>Infrastructure</p>
          <label htmlFor="infrastructure" className="form-label">
            Describe the infrastructure, facilities, and tools available for hands-on learning
          </label>
          <textarea
            name="infrastructure"
            className="form-control"
            value={tradeData.infrastructure}
            onChange={handleChange}
            required
          />
        </div>

        <button className="text-white p-2 text-center w-100 btn-register" type="submit">
          {submit ? 'Submitting...' : 'Submit and continue'}
        </button>
      </form>
    </div>
  );
}

export default Trade;
