import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


function UpdateCapacity() {
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    const post_capacity = `http://127.0.0.1:8000/form/update_capacity/${user.user_id}`;
  const [phoneValide, setPhoneValidate] = useState([])
  const retrieveCapacity = `http://127.0.0.1:8000/form/retrieve_capacity/${user.user_id}`

  const [capacity, setCapacity] = useState({
      Date_Of_Registration: "",
      Registration_Number: "",
      Name_Of_The_Contact_Person: "",
      TelNo_Of_The_Contact_Person: "",
      Title_Of_The_Contact_Person: "",
      reason: ""
    });
    const fetchCapacity = async()=>{
      try{
         const response = await axios(retrieveCapacity)
         const data = response.data
         setCapacity(data)
      }catch(err){
        console.log(err)
      }
    }
    useEffect(()=>{
      fetchCapacity()
    },[])

  const [submit, setSubmit] = useState(false);
  const [isRegistered, setIsRegistered] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCapacity({ ...capacity, [name]: value });
  };

  const handleSubmit = (e) => {
    setSubmit(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("Date_Of_Registration", capacity.Date_Of_Registration);
    formData.append("Registration_Number", capacity.Registration_Number);
    formData.append("Name_Of_The_Contact_Person", capacity.Name_Of_The_Contact_Person);
    formData.append("TelNo_Of_The_Contact_Person", capacity.TelNo_Of_The_Contact_Person);
    formData.append("Title_Of_The_Contact_Person", capacity.Title_Of_The_Contact_Person);
    formData.append("reason", capacity.reason);
    formData.append("user", user.user_id)

    axios.put(post_capacity, formData)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          setSubmit(false);
          ShowSuccessAlert("Updated Successfully");
          navigate("/institute/view_details");
        }
      }).catch(err => {
        console.log(err);
        if(err.response.data.TelNo_Of_The_Contact_Person && err.response.status === 400){
         setPhoneValidate(err.response.data.TelNo_Of_The_Contact_Person)
        }
        setSubmit(false)
      });

  };
console.log(phoneValide)
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

  const handleRegistrationChange = (option) => {
    setIsRegistered(option === 'yes');
  };

  return (
    <>
      <div className="container">
        <p className='text-center reg_word'>REGISTRATION AND CAPACITY</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">
              Is The Enterprise/Company Registered?
            </label>
            <ul>
              <li>
                <input
                  type="radio"
                  name='registered'
                  value='yes'
                  checked = {isRegistered === true}
                  onChange={()=>handleRegistrationChange('yes')}
                  required
                />
                <span>YES</span>
              </li>
              <li>
                <input
                  type="radio"
                  name='registered'
                  value='no'
                  checked ={isRegistered === false}
                  onChange={()=>handleRegistrationChange('no')}
                  required
                />
                <span>NO</span>
              </li>
            </ul>
          </div>

          {!isRegistered && (
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput2" className="form-label">
                Enter Reason
              </label>
              <textarea
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                name='reason'
                value={capacity.reason}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {isRegistered && (
            <>
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">
                  Date Of Registration
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="formGroupExampleInput2"
                  name='Date_Of_Registration'
                  value={capacity.Date_Of_Registration}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">
                  Registration Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput2"
                  name='Registration_Number'
                  value={capacity.Registration_Number}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">
                  Name Of The Contact Person
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput2"
                  name='Name_Of_The_Contact_Person'
                  value={capacity.Name_Of_The_Contact_Person}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">
                  Tel-No Of The Contact Person
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="formGroupExampleInput2"
                  name='TelNo_Of_The_Contact_Person'
                  value={capacity.TelNo_Of_The_Contact_Person}
                  onChange={handleChange}
                  required
                />
                {phoneValide.map(rule =>{
                  return (
                    <p className='text-danger'>{rule}</p>
                  )
                })}
              </div>

              <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">
                  Title Of The Contact Person
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput2"
                  name='Title_Of_The_Contact_Person'
                  value={capacity.Title_Of_The_Contact_Person}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <button className='text-white p-2 text-center w-100 btn-register' type='submit'>
            {submit ? 'Updating...' : 'Update'}
          </button>
        </form>
      </div>
    </>
  );
}
export default UpdateCapacity;

