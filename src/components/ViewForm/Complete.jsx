import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'

function Complete() {
const {user} = useContext(AuthContext)
  return (
    <div className='finish'>
        <span className="text-success d-flex text-center alert alert-success">
        <i className="bi bi-check2-circle"></i> Completed
        </span>
        
      <p>This message is to confirm that your application for the Grow Host Instutions vacancy has been received successfully.
A confirmation e-mail has been sent to:{user.email} Regards,
GROW Team</p>
<Link to='/' className='text-center'>Back to Login</Link> 

    </div>
  )
}

export default Complete
