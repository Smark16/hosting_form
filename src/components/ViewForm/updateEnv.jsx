import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UpdateEnv = () => {
    const { user } = useContext(AuthContext);
    const updateQtns = `https://institute-application-backend.onrender.com/form/update_env/${user.user_id}`;
    const retrieveEnv = `https://institute-application-backend.onrender.com/form/retrieve_env/${user.user_id}`

    const [submit, setSubmit] = useState(false);
    const navigate = useNavigate();
    const [QtnsEnv, setQtnsEnv] = useState({
        environmentalWasteManagement: '',
        environmentalConservation: '',
        socialCommunityEngagement: '',
        socialLocalSuppliers: '',
        socialCSRInitiatives: '',
        safetyHealthPolicy: '',
        safetyCommunication: '',
        safetyEmergencyProcedures: '',
        safetySafeEnvironment: '',
        healthHygieneSanitation: '',
        healthWellnessPrograms: '',
        user: user.user_id
    });

    const fetchEnv =  async()=>{
        try{
          const response = await axios(retrieveEnv)
          const data = response.data
          console.log(data)
          setQtnsEnv(data)
        }catch(err){
          console.log(err)
        }
      }

      useEffect(()=>{
        fetchEnv()
      },[])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQtnsEnv({
            ...QtnsEnv,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true);
        try {
            const response = await axios.put(updateQtns, QtnsEnv, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                setSubmit(false);
                ShowSuccessAlert("Update completed successfully.");
                navigate("/institute/view_details");
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
                console.error(err);
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
            <h2 className="mb-4 text-center">Environmental, Social, Safety, and Health Questions</h2>
            <form onSubmit={handleSubmit}>
                {/* Environmental Practices */}
                <div className="mb-4">
                    <label className="form-label">How does your enterprise/company manage waste, including recycling and disposal of hazardous materials?</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        name="environmentalWasteManagement"
                        value={QtnsEnv.environmentalWasteManagement}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">What measures do you have in place to conserve energy and water within your facilities?</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        name="environmentalConservation"
                        value={QtnsEnv.environmentalConservation}
                        onChange={handleChange}
                    />
                </div>

                {/* Social Responsibility */}
                <div className="mb-4">
                    <label className="form-label">How does your enterprise engage with and support the local community?</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        name="socialCommunityEngagement"
                        value={QtnsEnv.socialCommunityEngagement}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">Does your enterprise prioritize sourcing from local suppliers? Please provide examples.</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        name="socialLocalSuppliers"
                        value={QtnsEnv.socialLocalSuppliers}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">Describe any Corporate Social Responsibility (CSR) initiatives your enterprise/company is involved in, particularly those benefiting women and vulnerable groups.</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        name="socialCSRInitiatives"
                        value={QtnsEnv.socialCSRInitiatives}
                        onChange={handleChange}
                    />
                </div>

                {/* Safety Practices */}
                <div className="mb-4">
                    <label className="form-label">Does your enterprise have a health and safety policy?</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        name="safetyHealthPolicy"
                        value={QtnsEnv.safetyHealthPolicy}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">If yes, how is it communicated and enforced among Women Entrepreneurs intending to take on work placement/apprenticeship program?</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        name="safetyCommunication"
                        value={QtnsEnv.safetyCommunication}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">What procedures are in place for emergency situations, such as fires, medical emergencies, or natural disasters?</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        name="safetyEmergencyProcedures"
                        value={QtnsEnv.safetyEmergencyProcedures}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">What specific measures do you take to ensure a safe working environment for the Women Entrepreneurs under work placement program?</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        name="safetySafeEnvironment"
                        value={QtnsEnv.safetySafeEnvironment}
                        onChange={handleChange}
                    />
                </div>

                {/* Health Standards */}
                <div className="mb-4">
                    <label className="form-label">What are your policies and practices regarding hygiene and sanitation, particularly in the areas where women Entrepreneurs will be mentored?</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        name="healthHygieneSanitation"
                        value={QtnsEnv.healthHygieneSanitation}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">Are there any health and wellness programs available for women entrepreneurs, such as mental health support, fitness programs, or health education?</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        name="healthWellnessPrograms"
                        value={QtnsEnv.healthWellnessPrograms}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="text-center text-white p-2 btn-register">
                    {submit ? 'Updating...' : 'Update'}
                </button>
            </form>
        </div>
    );
};

export default UpdateEnv;
