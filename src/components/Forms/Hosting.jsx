import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Hosting() {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext);
      const retrieveHosting = `http://127.0.0.1:8000/form/retrieve_hosted/${user.user_id}`
    const [submit, setSubmit] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        has_hosted_apprentices: '',
        experience_details: '',
        max_apprentices: '',
        courses: [{ sn: '', course_name: '', duration: '', user: user.user_id }],
        support_description: '',
        user: user.user_id
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const handleCourseChange = (index, e) => {
        const { name, value } = e.target;
        const newCourses = [...formData.courses];
        newCourses[index][name] = value;
        setFormData({
            ...formData,
            courses: newCourses
        });
        setErrors({
            ...errors,
            [`course_${index}`]: ''
        });
    };

    const addCourse = () => {
        const newCourse = { sn: '', course_name: '', duration: '', user: user.user_id };
        if (formData.courses.some(course => Object.values(course).some(value => !value))) {
            setErrors({
                ...errors,
                addCourse: 'Please fill out all course fields before adding a new one.'
            });
        } else {
            setFormData({
                ...formData,
                courses: [...formData.courses, newCourse]
            });
            setErrors({
                ...errors,
                addCourse: ''
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true);

        const validationErrors = {};
        if (!formData.has_hosted_apprentices) {
            validationErrors.has_hosted_apprentices = 'Please select an option.';
        }
        formData.courses.forEach((course, index) => {
            if (!course.sn || !course.course_name || !course.duration) {
                validationErrors[`course_${index}`] = 'Please fill out all course fields.';
            }
        });

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSubmit(false);
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/form/all_hosting', formData);
            if(response.status === 201){
                setSubmit(false);
               ShowSuccessAlert("Submitting Completed");
               navigate("/institute/additional_info")
            }
            
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
        <div className="container">
            <p className='text-center reg_word'>EXPERIENCE IN HOSTING APPRENTICES</p>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="has_hosted_apprentices" className="form-label">
                        Has the enterprise hosted apprentices, interns or industrial trainees before?
                    </label>
                    <ul>
                        <li>
                            <input
                                type="radio"
                                name="has_hosted_apprentices"
                                value="YES"
                                onChange={handleChange}
                                required
                            />
                            <span>YES</span>
                        </li>
                        <li>
                            <input
                                type="radio"
                                name="has_hosted_apprentices"
                                value="NO"
                                onChange={handleChange}
                                required
                            />
                            <span>NO</span>
                        </li>
                    </ul>
                    {errors.has_hosted_apprentices && <span className="text-danger">{errors.has_hosted_apprentices}</span>}
                </div>

                {formData.has_hosted_apprentices === 'YES' && (
                    <div className="mb-3">
                        <label htmlFor="experience_details" className="form-label">
                            Details of the experience
                        </label>
                        <textarea
                            name="experience_details"
                            className="form-control"
                            value={formData.experience_details}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}

                <div className="mb-3">
                    <label htmlFor="max_apprentices" className="form-label">
                        Maximum Number Of Apperentices that can be taken at the moment
                    </label>
                    <input
                        type="number"
                        name="max_apprentices"
                        className="form-control"
                        value={formData.max_apprentices}
                        onChange={handleChange}
                        required
                    />
                </div>

                {formData.courses.map((course, index) => (
                    <div key={index} className="mb-3">
                        <p className='whuu'>Work Placement/apprenticeship Courses to offer</p>
                        <div>
                            <label htmlFor={`sn_${index}`} className="form-label">
                                SN
                            </label>
                            <input
                                type="text"
                                name="sn"
                                className="form-control"
                                value={course.sn}
                                onChange={(e) => handleCourseChange(index, e)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor={`course_name_${index}`} className="form-label">
                                Course
                            </label>
                            <input
                                type="text"
                                name="course_name"
                                className="form-control"
                                value={course.course_name}
                                onChange={(e) => handleCourseChange(index, e)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor={`duration_${index}`} className="form-label">
                                Duration
                            </label>
                            <input
                                type="text"
                                name="duration"
                                className="form-control"
                                value={course.duration}
                                onChange={(e) => handleCourseChange(index, e)}
                                required
                            />
                        </div>
                        {errors[`course_${index}`] && <span className="text-danger">{errors[`course_${index}`]}</span>}
                    </div>
                ))}

                <button type="button" onClick={addCourse}>
                    Add Course
                </button>
                {errors.addCourse && <span className="text-danger">{errors.addCourse}</span>}

                <div className="mb-3">
                    <label htmlFor="support_description" className="form-label">
                        Describe the form of support and associated payment you require per apprentice
                    </label>
                    <textarea
                        name="support_description"
                        className="form-control"
                        value={formData.support_description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button className='text-white p-2 text-center w-100 btn-register' type='submit'>
                    {submit ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
}

export default Hosting;
