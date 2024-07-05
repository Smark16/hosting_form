import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';

function UpdateAdd() {
    const {user} = useContext(AuthContext)
    const retrieveAdditional = `http://127.0.0.1:8000/form/retrive_add/${user.user_id}`
    const postAdditional = `http://127.0.0.1:8000/form/update_add/${user.user_id}`;
  const navigate = useNavigate()
  const [submit, setSubmit] = useState(false);
  const [formData, setFormData] = useState({
    additionalComments: '',
    fullName: '',
    verified: false,
    organizationName: '',
    user:user.user_id
  });

  const fetchAdditional = async()=>{
    try{
      const response = await axios(retrieveAdditional)
      const data = response.data
      setFormData(data)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    fetchAdditional() 
  }, [])
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);

    try {
      const response = await axios.put(postAdditional, formData);
      console.log('Form submitted:', response.data); 
      ShowSuccessAlert("Update Completed");
      navigate("/institute/view_details")
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error, such as displaying an error message to the user
    } finally {
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


  // Determine if all required fields are filled
  const isFormValid =
    formData.additionalComments !== '' &&
    formData.fullName !== '' &&
    formData.verified &&
    formData.organizationName !== '';

  return (
    <div className="container col-md-6 col-sm-12">
      <p className='text-center reg_word'>ADDITIONAL INFORMATION</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="additionalComments" className="form-label">
            Additional Comments
          </label>
          <p className="form-label">
            Please, provide any additional information or comments relevant to the eligibility criteria, if any.
          </p>
          <textarea
            type="text"
            className="form-control"
            id="additionalComments"
            name="additionalComments"
            value={formData.additionalComments}
            onChange={handleChange}
            rows="3"
            style={{ whiteSpace: 'pre-wrap' }}
            required
          />
        </div>
        <div className="mb-3">
          <p className='whuu'>Declaration</p>
          <p>
            I, <input
                type="text"
                name="fullName"
                className="form-control"
                style={{ display: 'inline-block', width: '300px' }}
                value={formData.fullName}
                onChange={handleChange}
                required
            />, declare that the information provided above is true and accurate to the best of my knowledge.
          </p>
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="verified"
              name="verified"
              checked={formData.verified}
              onChange={handleChange}
              required
            />
            <label className="form-check-label" htmlFor="verified">
              I verify the above information
            </label>
          </div>
          <p>
            For and on behalf of (Industry Association/Enterprise) <input
                type="text"
                name="organizationName"
                className="form-control"
                style={{ display: 'inline-block', width: '300px' }}
                value={formData.organizationName}
                onChange={handleChange}
                required
            />
          </p>
        </div>
        <button
          className='text-white p-2 text-center w-100 btn-register bt'
          type='submit'
          disabled={!isFormValid || submit} // Disable button if form is invalid or submitting
        >
          {submit ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
}

export default UpdateAdd;
