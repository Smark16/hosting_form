import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const postTrade = 'https://institute-application-backend.onrender.com/form/post_trade'; // Update this URL to your actual endpoint
const apiEndpoints = {
  'Agriculture': 'http://127.0.0.1:8000/form/agriculture/',
  'Food and Agro-processing': 'http://127.0.0.1:8000/form/agro-processing/',
  'Creative and Performing Arts': 'http://127.0.0.1:8000/form/creative-performing-art/',
  'Hotel and Catering': 'http://127.0.0.1:8000/form/hotel-hospitality/',
  'Beauty and Cosmetology': 'http://127.0.0.1:8000/form/beauty-cosmetology/',
  'Manufacturing': 'http://127.0.0.1:8000/form/manufacturing/',
  'Construction': 'http://127.0.0.1:8000/form/construction/',
  'Food Processing': 'http://127.0.0.1:8000/form/food-processing/',
  'Social Services': 'http://127.0.0.1:8000/form/social-services/',
  'Professional Technical Services': 'http://127.0.0.1:8000/form/professional-technical-services/',
  'Engineering': 'http://127.0.0.1:8000/form/engineering/',
  'Tourism and Hospitality': 'http://127.0.0.1:8000/form/tourism-hospitality/',
  'Environment Protection': 'http://127.0.0.1:8000/form/environment-protection/',
  'Fishing': 'http://127.0.0.1:8000/form/fishing/',
  'ICT and Digital Media': 'http://127.0.0.1:8000/form/ict-digital-media/',
  'Trade Retail and Wholesale': 'http://127.0.0.1:8000/form/trade-retail-wholesale/',
  'Mechanical': 'http://127.0.0.1:8000/form/mechanical/',
  'Tailoring and Textiles': 'http://127.0.0.1:8000/form/tailoring-textiles/'
};

function Trade() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [skillsData, setSkillsData] = useState({});
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tradeData, setTradeData] = useState({
    targeted_trade: '',
    reason_for_partnership: '',
    enterprise_size: '',
    dev_stage: '',
    skills:[],
    track_record: '',
    expertise: '',
    staff_mentoring: '',
    infrastructure: '',
    sector_description: '',
    courses: [{ module_code: '', module_name: '', duration: '', user: user.user_id }],
    user: user.user_id
  });
  const [submit, setSubmit] = useState(false);
  const [errors, setErrors] = useState({});

  const fetchSkills = async (trade) => {
    const url = apiEndpoints[trade];
    if (url) {
      try {
        const response = await axios.get(url);
        setSkillsData(response.data);
        // Clear selected skills when trade changes
        setSelectedSkills([]);
        setTradeData(prevData => ({ ...prevData, skills: [] }));
      } catch (err) {
        console.error('Error fetching skills data:', err);
      }
    }
  };

  useEffect(() => {
    if (tradeData.targeted_trade) {
      fetchSkills(tradeData.targeted_trade);
    } else {
      setSkillsData([]);
    }
  }, [tradeData.targeted_trade]);

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

  
  const handleSelect = e => {
    const selectedTrade = e.target.value;
    setTradeData(prevData => ({
      ...prevData,
      targeted_trade: selectedTrade,
      skills: []
    }));
  };

  const handleSkillChange = e => {
    const { value, checked } = e.target;
    setSelectedSkills(prevSkills =>
      checked ? [...prevSkills, value] : prevSkills.filter(skill => skill !== value)
    );
    setTradeData({...tradeData, skills:selectedSkills})
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // if (type === 'checkbox' && name === 'skills') {
    //   const updatedSkills = checked
    //     ? [...tradeData.skills, value]
    //     : tradeData.skills.filter(skill => skill !== value);
    //   setTradeData(prevData => ({ ...prevData, skills: updatedSkills }));
    // } else {
      setTradeData(prevData => ({ ...prevData, [name]: value }));
    
  };
console.log(tradeData)

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

    const validationErrors = {};
    tradeData.courses.forEach((course, index) => {
      if (!course.module_code || !course.module_name || !course.duration) {
        validationErrors[`course_${index}`] = 'Please fill out all course fields.';
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmit(false);
      return;
    }

    axios.post(postTrade, tradeData)
      .then(response => {
        if (response.status === 201) {
          setSubmit(false);
          ShowSuccessAlert("Trade Data Submitted Successfully");
          setTradeData({
            targeted_trade: '',
            reason_for_partnership: '',
            enterprise_size: '',
            skills:"",
            dev_stage: '',
            track_record: '',
            expertise: '',
            staff_mentoring: '',
            infrastructure: '',
            sector_description: '',
            courses: [{ module_code: '', module_name: '', duration: '', user: user.user_id }],
            user: user.user_id
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
          <label htmlFor="targeted_trade">Choose targeted priority trades Enterprise/Industry is involved in?*</label>
          <select name="targeted_trade" value={tradeData.targeted_trade} onChange={handleSelect} className="form-control" required>
            <option value="">Select a sector</option>
            {Object.keys(apiEndpoints).map(trade => (
              <option key={trade} value={trade}>{trade}</option>
            ))}
          </select>
          </div>
        
        {tradeData.targeted_trade && (
          <>
          <div className="mb-3">
            <label htmlFor="sector_description" className="form-label">
              Describe more on the <b>{tradeData.targeted_trade}</b> sector(s) being offered*
            </label>
            <textarea
              name="sector_description"
              className="form-control"
              value={tradeData.sector_description}
              onChange={handleChange}
              required
            />
          </div>
          </>
        )}

{tradeData.targeted_trade && skillsData.length > 0 && (
          <div className="mb-3 label_form">
            <p>Choose skills in <b>{tradeData.targeted_trade}</b> below</p>
            {skillsData.map(skill => (
              <div key={skill.id} className='label'>
                <input
                  type="checkbox"
                  id={`skill-${skill.name}`}
                  value={skill.name}
                  checked={selectedSkills.includes(skill.name)}
                  onChange={handleSkillChange}
                />
                <label htmlFor={`skill-${skill.name}`}>{skill.name}</label>
              </div>
            ))}
          </div>
        )}

        {tradeData.courses.map((course, index) => (
          <div key={index} className="mb-3">
            <p className='whuu'>Work Placement/apprenticeship Courses to offer*</p>
            <div className='mt-3'>
              <label htmlFor={`module_code_${index}`} className="form-label">
                <b>Module Code (Optional)</b>
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
                <b>Module/Activity*</b>
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
                <b>Duration*</b>
              </label>
              <div className="dates">
                start date
                <input
                  type="date"
                  placeholder='Start Date'
                  onChange={(e) => setStartDate(e.target.value)}
                  className='form-control'
                  required
                />
                End date
                <input
                  type="date"
                  placeholder='End Date'
                  onChange={(e) => setEndDate(e.target.value)}
                  className='form-control'
                  required
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

        <button type="button" onClick={addCourse} className='btn btn-primary'>
          Add Module
        </button>
        {errors.addCourse && <span className="text-danger">{errors.addCourse}</span>}

        <div className="mb-3">
          <p className='whuu'>Partnership and Willingness</p>
          <label htmlFor="reason_for_partnership" className="form-label">
            Why Does your Industry association/Enterprise want to partner with the Ministry of Gender, Labour and Social Development and Grow project for work placement program?*
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
            Size of the enterprise*
          </label>
          <div>
            <label>
              <input
                type="radio"
                name="enterprise_size"
                value="Micro"
                checked={tradeData.enterprise_size === "Micro"}
                onChange={handleChange}
              />
              Micro (1-4 employees)
            </label>
            <label>
              <input
                type="radio"
                name="enterprise_size"
                value="Small"
                checked={tradeData.enterprise_size === "Small"}
                onChange={handleChange}
              />
              Small (5-49 employees)
            </label>
            <label>
              <input
                type="radio"
                name="enterprise_size"
                value="Medium"
                checked={tradeData.enterprise_size === "Medium"}
                onChange={handleChange}
              />
              Medium (50-100 employees)
            </label>
            <label>
              <input
                type="radio"
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
            Stage of Development of the enterprise*
          </label>
          <div>
            <label>
              <input
                type="radio"
                name="dev_stage"
                value="Early-stage"
                checked={tradeData.dev_stage === "Early-stage"}
                onChange={handleChange}
              />
              Early-stage
            </label>
            <label>
              <input
                type="radio"
                name="dev_stage"
                value="Growth-stage"
                checked={tradeData.dev_stage === "Growth-stage"}
                onChange={handleChange}
              />
              Growth-stage
            </label>
            <label>
              <input
                type="radio"
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
            Provide Brief Overview of the enterprise's track record of business growth*
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
            Describe the enterprise's expertise in the relevant field selected in (Trade/sector of Operation) section*
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
            Describe the adequacy of competent and experienced staff to guide and mentor apprentices in your enterprise*
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
            Describe the infrastructure, facilities, and tools available for hands-on learning*
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
