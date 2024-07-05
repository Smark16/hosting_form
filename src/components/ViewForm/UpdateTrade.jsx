import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {AuthContext} from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';


function UpdateTrade() {
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    const retrieveTrade = `https://institute-application-backend.onrender.com/form/retrieve_Trade/${user.user_id}`
    const postTrade = `https://institute-application-backend.onrender.com/form/update_trade/${user.user_id}`; // Update this URL to your actual endpoint
  const [tradeData, setTradeData] = useState({
    targeted_trade: '',
    reason_for_partnership: '',
    enterprise_size: '',
    dev_stage: '',
    track_record: '',
    expertise: '',
    staff_mentoring: '',
    infrastructure: '',
    user:user.user_id
  });
  const fetchTrade = async()=>{
    try{
    const response = await axios(retrieveTrade)
    const data = response.data
    setTradeData(data)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    fetchTrade()
  },[])
  const [submit, setSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (name === 'targeted_trade' || name === 'enterprise_size' || name === 'dev_stage') {
        setTradeData({ ...tradeData, [name]: checked ? value : '' });
      } else {
        setTradeData({ ...tradeData, [name]: checked });
      }
    } else {
      setTradeData({ ...tradeData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);

    axios.put(postTrade, tradeData)
      .then(response => {
        if (response.status === 200) {
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
          navigate("/institute/view_details");
        }
      })
      .catch(err => {
        console.error(err);
        setSubmit(false);
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
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3 label_form">
            <p className='whuu'>Trade/Sector of Operation</p>
            <label htmlFor="targeted_trade" className="form-label">
              Choose targeted priority trades Enterprise/Industry is involved in?
            </label>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="targeted_trade"
                  value="Hotel and Hospitality"
                  checked={tradeData.targeted_trade === "Hotel and Hospitality"}
                  onChange={handleChange}
                />
                Hotel and Hospitality
              </label>
              <label>
                <input
                  type="checkbox"
                  name="targeted_trade"
                  value="Food and agro-processing"
                  checked={tradeData.targeted_trade === "Food and agro-processing"}
                  onChange={handleChange}
                />
                Food and agro-processing
              </label>
              <label>
                <input
                  type="checkbox"
                  name="targeted_trade"
                  value="Cosmetology"
                  checked={tradeData.targeted_trade === "Cosmetology"}
                  onChange={handleChange}
                />
                Cosmetology
              </label>
              <label>
                <input
                  type="checkbox"
                  name="targeted_trade"
                  value="Tailoring and textiles"
                  checked={tradeData.targeted_trade === "Tailoring and textiles"}
                  onChange={handleChange}
                />
                Tailoring and textiles
              </label>
              <label>
                <input
                  type="checkbox"
                  name="targeted_trade"
                  value="Welding and Metal fabrication"
                  checked={tradeData.targeted_trade === "Welding and Metal fabrication"}
                  onChange={handleChange}
                />
                Welding and Metal fabrication
              </label>
              <label>
                <input
                  type="checkbox"
                  name="targeted_trade"
                  value="Electrical and electronics"
                  checked={tradeData.targeted_trade === "Electrical and electronics"}
                  onChange={handleChange}
                />
                Electrical and electronics
              </label>
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
            />
          </div>

          <div className="mb-3 label_form">
            <p className='whuu'>Bussiness Size and Stage</p>
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
            />
          </div>

          <button className="text-white p-2 text-center w-100 btn-register" type="submit">
            {submit ? 'Updating...' : 'Update'}
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdateTrade;



