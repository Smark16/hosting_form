import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Hosting() {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext);
      const retrieveHosting = `https://institute-application-backend.onrender.com/form/retrieve_hosted/${user.user_id}`
    const [submit, setSubmit] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        has_hosted_apprentices: '',
        experience_details: '',
        max_apprentices: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true);

        const validationErrors = {};
        if (!formData.has_hosted_apprentices) {
            validationErrors.has_hosted_apprentices = 'Please select an option.';
        }
       
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSubmit(false);
            return;
        }

        try {
            const response = await axios.post('https://institute-application-backend.onrender.com/form/all_hosting', formData);
            if(response.status === 201){
                setSubmit(false);
               ShowSuccessAlert("Submitting Completed");
               navigate("/institute/environment_questions")
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
                        Has the enterprise hosted apprentices, interns or industrial trainees before?*
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
                            Details of the experience*
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
                    What is the maximum number
of apprentices that can be
taken up at a time?*
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

                <div className="mb-3">
                    <label htmlFor="support_description" className="form-label">
                    State and describe the form of
support you require per
apprentice in order to provide
the apprenticeship services*
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
                    {submit ? 'Submitting...' : 'Submit and continue'}
                </button>
            </form>
        </div>
    );
}

export default Hosting;
