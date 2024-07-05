import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const postCategory = 'https://institute-application-backend.onrender.com/form/post_cats';

function Category() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState({
    permanent_male: '',
    permanent_female: '',
    contract_male: '',
    contract_female: '',
    casual_male: '',
    casual_female: '',
    self_employed_male: '',
    self_employed_female: '',
    other_male: '',
    other_female: '',
    user:user.user_id
  });
  const [submit, setSubmit] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategories({ ...categories, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);

    axios.post(postCategory, categories)
      .then(response => {
        if (response.status === 201) {
          setSubmit(false);
          ShowSuccessAlert("Submitted Successfully");
          navigate("/institute/operation_sector")
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
      <div className="cat_container col-md-8 col-sm-12">
        <p className="text-center reg_word">CATEGORY OF EMPLOYEES</p>
        <form onSubmit={handleSubmit}>
         <div className="row cats">
           <div className="col-md-4">
           <p className='whuu'>Contract Workers</p>
           <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">contract_male</label>
          <input
            type="number"
            className="form-control"
            id="formGroupExampleInput"
            name='contract_male'
            value={categories.contract_male}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">contract_female</label>
          <input
            type="number"
            className="form-control"
            id="formGroupExampleInput"
            name='contract_female'
            value={categories.contract_female}
            onChange={handleChange}
            required
          />
        </div>
           </div>

           <div className="col-md-4">
           <p className='whuu'>Self Employed Workers</p>
           <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">self_employed Male</label>
          <input
            type="number"
            className="form-control"
            id="formGroupExampleInput"
            name='self_employed_male'
            value={categories.self_employed_male}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">self_employed Female</label>
          <input
            type="number"
            className="form-control"
            id="formGroupExampleInput"
            name='self_employed_female'
            value={categories.self_employed_female}
            onChange={handleChange}
            required
          />
        </div>
           </div>
         </div>

         <div className="row cats">
           <div className="col-md-4">
           <p className='whuu'>Casual Workers</p>
           <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">casual_male</label>
          <input
            type="number"
            className="form-control"
            id="formGroupExampleInput"
            name='casual_male'
            value={categories.casual_male}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">contract_female</label>
          <input
           type="number"
            className="form-control"
            id="formGroupExampleInput"
            name='casual_female'
            value={categories.casual_female}
            onChange={handleChange}
            required
          />
        </div>
           </div>

           <div className="col-md-4">
           <p className='whuu'>Permanent Workers</p>
           <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">permanent Male</label>
          <input
            type="number"
            className="form-control"
            id="formGroupExampleInput"
            name='permanent_male'
            value={categories.permanent_male}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">Permanent Female</label>
          <input
            type="number"
            className="form-control"
            id="formGroupExampleInput"
            name='permanent_female'
            value={categories.permanent_female}
            onChange={handleChange}
            required
          />
        </div>
           </div>
         </div>

         <div className="row cats">
           <div className="col-md-4">
           <p className='whuu'>Other Workers</p>
           <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">Other_male</label>
          <input
            type="number"
            className="form-control"
            id="formGroupExampleInput"
            name='other_male'
            value={categories.other_male}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">Other_female</label>
          <input
            type="number"
            className="form-control"
            id="formGroupExampleInput"
            name='other_female'
            value={categories.other_female}
            onChange={handleChange}
            required
          />
        </div>
           </div>
         </div>
          <button className="text-white p-2 text-center w-100 btn-register" type="submit">
            {submit ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </>
  );
}

export default Category;
