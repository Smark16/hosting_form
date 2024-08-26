import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
const finish = "https://institute-application-backend.onrender.com/form/finished"

function Complete() {
const {user} = useContext(AuthContext)
const [loading, setLoading] = useState(false)
const [comp, setComp] = useState([])

const fetchFinish = async()=>{
  try{
    setLoading(true)
    const response = await axios(finish)
    const data = response.data
    setComp(data)
    setLoading(false)
  }catch(err){
    console.log(err)
  }
}

useEffect(()=>{
  fetchFinish()
},[])
  return (
    <>
    {loading ? (<div className='loader'></div>) : (
      
    <div className='finish'>
        <span className="text-success d-flex text-center alert alert-success">
        <i className="bi bi-check2-circle"></i> Completed
        </span>

        {comp.map(res =>{
          const {name} = res
          return(
            <p>{name}</p>
          )
        })}
        
<Link to='/' className='text-center'>Back to Login</Link> 

    </div>
    )}
    </>
  )
}

export default Complete
