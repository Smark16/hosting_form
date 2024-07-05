import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function UpdatePhysical() {
    const navigate = useNavigate()
const {user} = useContext(AuthContext)
    const [address, setAddress] = useState({ District:"", Constituency:"", Sub_county:"", Parish:"", Village:"", GPS_Points:"" })
    const [submit, setSubmit] = useState(false)
 const retrievePhysical = `http://127.0.0.1:8000/form/retrieve_physical/${user.user_id}`
 const post_address = `http://127.0.0.1:8000/form/update_physical/${user.user_id}`
    const fetchPhysical =  async()=>{
        try{
          const response = await axios(retrievePhysical)
          const data = response.data
          setAddress(data)
        }catch(err){
          console.log(err)
        }
      }

      useEffect(()=>{
        fetchPhysical() 
      },[])
      
    const handleChange =(e)=>{
        const {name,value} = e.target
        setAddress({...address, [name]:value})
    }

    const handleSubmit =(e)=>{
        setSubmit(true)
       e.preventDefault()
       const formData = new FormData()
       formData.append("District", address.District)
       formData.append("Constituency", address.Constituency)
       formData.append("Sub_county", address.Sub_county)
       formData.append("Parish", address.Parish)
       formData.append("Village", address.Village)
       formData.append("GPS_Points", address.GPS_Points)
       formData.append("user", user.user_id)

       axios.put(post_address, formData)
       .then(response =>{
        console.log(response)
        if(response.status === 200){
            setSubmit(false)
            ShowSuccessAlert("Updated Successfully")
            navigate("/institute/view_details")
        }
       }).catch(err =>{
        console.log(err)
       })
       
    }
    const  ShowSuccessAlert = (message) => {
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
    <p className='text-center reg_word'>PHYSICAL ADDRESS</p>
        <form onSubmit={handleSubmit}>
        <>
  <div className="mb-3">
    <label htmlFor="formGroupExampleInput" className="form-label">
      District
    </label>
    <input
      type="text"
      className="form-control"
      id="formGroupExampleInput"
      name='District'
      value={address.District}
      onChange={handleChange}
      required
    />
  </div>
  <div className="mb-3">
    <label htmlFor="formGroupExampleInput2" className="form-label">
    Constituency 
    </label>
    <input
      type="text"
      className="form-control"
      id="formGroupExampleInput2"
      name='Constituency'
      value={address.Constituency}
      onChange={handleChange}
      required
    />
  </div>

  <div className="mb-3">
    <label htmlFor="formGroupExampleInput2" className="form-label">
    Sub_county
    </label>
    <input
      type="text"
      className="form-control"
      id="formGroupExampleInput2"
      name='Sub_county'
      value={address.Sub_county}
      onChange={handleChange}
      required
    />
  </div>

  <div className="mb-3">
    <label htmlFor="formGroupExampleInput2" className="form-label">
    Parish
    </label>
    <input
      type="text"
      className="form-control"
      id="formGroupExampleInput2"
      name='Parish'
      value={address.Parish}
      onChange={handleChange}
      required
    />
  </div>

  <div className="mb-3">
    <label htmlFor="formGroupExampleInput2" className="form-label">
    Village
    </label>
    <input
      type="text"
      className="form-control"
      id="formGroupExampleInput2"
      name='Village'
      value={address.Village}
      onChange={handleChange}
      required
    />
  </div>

  <div className="mb-3">
    <label htmlFor="formGroupExampleInput2" className="form-label">
    GPS_Points
    </label>
    <input
      type="text"
      className="form-control"
      id="formGroupExampleInput2"
      name='GPS_Points'
      value={address.GPS_Points}
      onChange={handleChange}
      required
    />
  </div>
</>
<button className='text-white p-2 text-center w-100 btn-register' type='submit'>
    {submit ? 'Updating...' : 'Update'}
    </button>
        </form>
    </div>
  )
}

export default UpdatePhysical



