import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function UpdateBasic() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const updateBasicsUrl = `http://127.0.0.1:8000/form/update_basic/${user.user_id}`;
  const retrieveBasicUrl = `http://127.0.0.1:8000/form/retrieve_basic/${user.user_id}`;
  const [basic, setBasic] = useState({ NameOfTheIndustry: "", Telephone: "", WebsiteLink: "", ContactEmail: "" });
  const [submit, setSubmit] = useState(false);
  const [showWebsiteLink, setShowWebsiteLink] = useState(false);
  const navigate = useNavigate();

  const fetchBasic = async () => {
    try {
      const response = await axios.get(retrieveBasicUrl);
      const data = response.data;
      setBasic(data);
      setShowWebsiteLink(data.WebsiteLink ? true : false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBasic();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBasic({ ...basic, [name]: value });
  };

  const handleSubmit = (e) => {
    setSubmit(true);
    e.preventDefault();

    axios.put(updateBasicsUrl, basic)
      .then(response => {
        if (response.status === 200) {
          setSubmit(false);
          ShowSuccessAlert("Update Completed");
          navigate("/institute/view_details");
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

  const handleWebsiteLinkOption = (option) => {
    setShowWebsiteLink(option === 'yes');
  };

  return (
    <div className="container">
      <p className='text-center reg_word'>BASIC INFORMATION</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">Name Of The Enterprize/Industry</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            name='NameOfTheIndustry'
            value={basic.NameOfTheIndustry}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">Telephone Contact</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            name='Telephone'
            value={basic.Telephone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">Does Your Business Have Website Link</label>
          <ul>
            <li>
              <input
                type="radio"
                name='websiteOption'
                value='yes'
                checked={showWebsiteLink === true}
                onChange={() => handleWebsiteLinkOption('yes')}
              />
              <span>YES</span>
            </li>
            <li>
              <input
                type="radio"
                name='websiteOption'
                value='no'
                checked={showWebsiteLink === false}
                onChange={() => handleWebsiteLinkOption('no')}
              />
              <span>NO</span>
            </li>
          </ul>
        </div>
        {showWebsiteLink && (
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">Website Link</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              name='WebsiteLink'
              value={basic.WebsiteLink}
              onChange={handleChange}
            />
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">Contact Email</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            name='ContactEmail'
            value={basic.ContactEmail}
            onChange={handleChange}
          />
        </div>
        <button className='text-white p-2 text-center w-100 btn-register' type='submit'>
          {submit ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
}

export default UpdateBasic;
