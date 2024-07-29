import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function UpdateTrade() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const retrieveTrade = `https://institute-application-backend.onrender.com/form/retrieve_Trade/${user.user_id}`;
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
    sector_description:'',
    courses: [{ module_code: '', module_name: '', duration: '', user: user.user_id }],
    user: user.user_id
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (startDate && endDate) {
      const totalDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
      setTradeData((prevData) => {
        const newCourses = prevData.courses.map((course) => ({
          ...course,
          duration: totalDays
        }));
        return { ...prevData, courses: newCourses };
      });
    }
  }, [startDate, endDate]);
  
  const fetchTrade = async () => {
    try {
      const response = await axios(retrieveTrade);
      const data = response.data;
      setTradeData(data);
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    fetchTrade();
  }, []);
  
  const [submit, setSubmit] = useState(false);

  const handleSelect = (e) => {
    const selected = e.target.value;
    setTradeData({ ...tradeData, targeted_trade: selected });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTradeData({ ...tradeData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleCourseChange = (index, e) => {
    const { name, value } = e.target;
    const newCourses = [...tradeData.courses];
    newCourses[index][name] = value;
    setTradeData({ ...tradeData, courses: newCourses });
    setErrors({ ...errors, [`course_${index}`]: '' });
  };

  const addCourse = () => {
    const newCourse = { module_code: '', module_name: '', duration: '', user: user.user_id };
    if (tradeData.courses.some(course => Object.values(course).some(value => !value))) {
      setErrors({ ...errors, addCourse: 'Please fill out all course fields before adding a new one.' });
    } else {
      setTradeData({ ...tradeData, courses: [...tradeData.courses, newCourse] });
      setErrors({ ...errors, addCourse: '' });
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
            sector_description: '',
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
              <select onChange={handleSelect} className="form-control" value={tradeData.targeted_trade}>
                <option>Choose Enterprise</option>
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

          {tradeData.targeted_trade && (
          <div className="mb-3">
            <label htmlFor="sector_description" className="form-label">
              Describe more on the <b>{tradeData.targeted_trade}</b> sector(s) being offered
            </label>
            <textarea
              name="sector_description"
              className="form-control"
              value={tradeData.sector_description}
              onChange={handleChange}
              required
            />
          </div>
        )}

{tradeData.courses.map((course, index) => (
          <div key={index} className="mb-3">
            <p className='whuu'>Work Placement/apprenticeship Courses to offer</p>
            <div className='mt-3'>
              <label htmlFor={`module_code_${index}`} className="form-label">
                <b>Module Code</b>
              </label>
              <input
                type="text"
                name="module_code"
                className="form-control"
                value={course.module_code}
                onChange={(e) => handleCourseChange(index, e)}
                required
              />
            </div>

            <div className='mt-3'>
              <label htmlFor={`module_name_${index}`} className="form-label">
                <b>Module/Activity</b>
              </label>
              <input
                type="text"
                name="module_name"
                className="form-control"
                value={course.module_name}
                onChange={(e) => handleCourseChange(index, e)}
                required
              />
            </div>

            <div className='mt-3'>
              <label htmlFor={`duration_${index}`} className="form-label">
                <b>Duration</b>
              </label>
              <div className="dates">
                start date
                <input
                  type="date"
                  placeholder='Start Date'
                  onChange={(e) => setStartDate(e.target.value)}
                  className='form-control'
                />
                End date
                <input
                  type="date"
                  placeholder='End Date'
                  onChange={(e) => setEndDate(e.target.value)}
                  className='form-control'
                />
              
                <input
                  type="text"
                  name="duration"
                  className="form-control mt-2"
                  value={course.duration}
                  onChange={(e) => handleCourseChange(index, e)}
                  readOnly
                  placeholder='totalDays'
                  required
                />
                
              </div>
            </div>
            {errors[`course_${index}`] && <span className="text-danger">{errors[`course_${index}`]}</span>}
          </div>
        ))}

        <button type="button" onClick={addCourse}>
          Add Module
        </button>
        {errors.addCourse && <span className="text-danger">{errors.addCourse}</span>}
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
