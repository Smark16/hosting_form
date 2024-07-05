import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


function UpdateCategories() {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext);
    const retrieveCat = `https://institute-application-backend.onrender.com/form/retrieve_cat/${user.user_id}`
    const postCategory = `https://institute-application-backend.onrender.com/form/update_cats/${user.user_id}`;
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
  const fetchCats = async()=>{
    try{
     const response = await axios(retrieveCat)
     const data = response.data
     setCategories(data)
    }catch(err){
    console.log(err)
    }
  }
  useEffect(()=>{
    fetchCats() 
  },[])
  const [submit, setSubmit] = useState(false);

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategories({ ...categories, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);

    axios.put(postCategory, categories)
      .then(response => {
        if (response.status === 200) {
          setSubmit(false);
          ShowSuccessAlert("Updated Successfully");
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
            {submit ? 'Updating...' : 'Update'}
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdateCategories;


