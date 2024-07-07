import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const postEdu = 'https://institute-application-backend.onrender.com/form/post_edu';

function EducationLevel() {
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    const [education, setEducation] = useState({
        No_Formal_Education: "",
        PLE: "",
        UCE: "",
        UACE: "",
        Certificate: "",
        Diploma: "",
        Degree: "",
        Post_Graduate: "",
        Total: "",
        user:user.user_id
    });
    const [submit, setSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEducation({ ...education, [name]: value });
    };

    useEffect(() => {
        const sumOfValues = Object.entries(education)
            .filter(([key, value]) => key !== 'Total' && key !== 'user')
            .map(([key, value]) => parseFloat(value) || 0)
            .reduce((sum, total) => sum + total, 0)
            .toFixed(2);

        setEducation((prevEducation) => ({
            ...prevEducation,
            Total: sumOfValues
        }));
    }, [education.No_Formal_Education, education.PLE, education.UCE, education.UACE, education.Certificate, education.Diploma, education.Degree, education.Post_Graduate]);

    const handleSubmit = (e) => {
        setSubmit(true);
        e.preventDefault();

        const formData = new FormData();
        Object.entries(education).forEach(([key, value]) => {
            formData.append(key, value);
        });

        axios.post(postEdu, formData)
            .then(response => {
                if (response.status === 201) {
                    setSubmit(false);
                    ShowSuccessAlert("Submitting Completed");
                    navigate("/institute/category")
                }
            })
            .catch(err => {
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

    return (
        <>
            <div className="container">
                <p className='text-center reg_word'>EDUCATIONAL LEVEL COUNT</p>
                <span>Here you will provide total number of employees with such qualifications</span>
                <form onSubmit={handleSubmit}>
                    <>
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput" className="form-label">
                                No_Formal_Education
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="formGroupExampleInput"
                                name='No_Formal_Education'
                                value={education.No_Formal_Education}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput2" className="form-label">
                                PLE
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="formGroupExampleInput2"
                                name='PLE'
                                value={education.PLE}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput2" className="form-label">
                                UCE
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="formGroupExampleInput2"
                                name='UCE'
                                value={education.UCE}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput2" className="form-label">
                                UACE
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="formGroupExampleInput2"
                                name='UACE'
                                value={education.UACE}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput2" className="form-label">
                                Certificate
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="formGroupExampleInput2"
                                name='Certificate'
                                value={education.Certificate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput2" className="form-label">
                                Diploma
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="formGroupExampleInput2"
                                name='Diploma'
                                value={education.Diploma}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput2" className="form-label">
                                Degree
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="formGroupExampleInput2"
                                name='Degree'
                                value={education.Degree}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput2" className="form-label">
                                Post_Graduate
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="formGroupExampleInput2"
                                name='Post_Graduate'
                                value={education.Post_Graduate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput2" className="form-label">
                                Total
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="formGroupExampleInput2"
                                name='Total'
                                value={education.Total}
                                required
                            />
                        </div>
                    </>
                    <button className='text-white p-2 text-center w-100 btn-register' type='submit'>
                        {submit ? 'Submitting...' : 'Submit and continue'}
                    </button>
                </form>
            </div>
        </>
    );
}

export default EducationLevel;
