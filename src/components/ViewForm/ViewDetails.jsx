import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


function ViewDetails() {
  const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    const [basic, setBasic] = useState('')
    const [loading, setLoading] = useState(false)
    const [physical, setPhysical] = useState('')
    const [capacity, setCapacity] = useState('')
    const [education, setEducation] = useState('');
    const [categories, setCategories] = useState('');
    const [tradeData, setTradeData] = useState({
      targeted_trade: '',
      reason_for_partnership: '',
      enterprise_size: '',
      dev_stage: '',
      track_record: '',
      expertise: '',
      staff_mentoring: '',
      infrastructure: '',
      sector_description: '',
      courses: [{ module_code: '', module_name: '', duration: '', user: user.user_id }],
      user: user.user_id
    });
    const [formData, setFormData] = useState('');

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
      user:user.user_id
    });
  
  const [addData, setAddData] = useState('');
    // basic info urls
    const retrieveBasic = `https://institute-application-backend.onrender.com/form/retrieve_basic/${user.user_id}`
    
    // physical Address
     const retrievePhysical = `https://institute-application-backend.onrender.com/form/retrieve_physical/${user.user_id}`

    //  capacity url
    const retrieveCapacity = `https://institute-application-backend.onrender.com/form/retrieve_capacity/${user.user_id}`

    // education url
    const retrieveEducation = `https://institute-application-backend.onrender.com/form/retrieve_education/${user.user_id}`

    // employee category
    const retrieveCat = `https://institute-application-backend.onrender.com/form/retrieve_cat/${user.user_id}`

    // trade view
    const retrieveTrade = `https://institute-application-backend.onrender.com/form/retrieve_Trade/${user.user_id}`

    // hosting Apperentices
  const retrieveHosting = `https://institute-application-backend.onrender.com/form/retrieve_hosted/${user.user_id}`

  // environmetn
  const retrieveEnv = `https://institute-application-backend.onrender.com/form/retrieve_env/${user.user_id}`

  // additional info
  const retrieveAdditional = `https://institute-application-backend.onrender.com/form/retrive_add/${user.user_id}`


// fetch environment
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

    //  fetch basic
    const fetchBasic = async()=>{
        try{
          setLoading(true)
    const response = await axios(retrieveBasic)
    const data = response.data
    setBasic(data)
    setLoading(false)
        }catch(err){
            console.log(err)
        }
    }

    // fetch physical
const fetchPhysical =  async()=>{
  try{
    const response = await axios(retrievePhysical)
    const data = response.data
    setPhysical(data)
  }catch(err){
    console.log(err)
  }
}


// fetch capacity
const fetchCapacity = async()=>{
  try{
     const response = await axios(retrieveCapacity)
     const data = response.data
     console.log(data)
     setCapacity(data)
  }catch(err){
    console.log(err)
  }
}

// education levels
const fetchEducation = async()=>{
  try{
   const response = await axios(retrieveEducation)
   const data = response.data
  setEducation(data)
  }catch(err){
    console.log(err)
  }
}

// fetch categories
const fetchCats = async()=>{
  try{
   const response = await axios(retrieveCat)
   const data = response.data
   setCategories(data)
  }catch(err){
  console.log(err)
  }
}

// fetch Trade
const fetchTrade = async()=>{
  try{
  const response = await axios(retrieveTrade)
  const data = response.data
  setTradeData(data)
  }catch(err){
    console.log(err)
  }
}

const fetchHosting = async()=>{
  try{
  const response = await axios(retrieveHosting)
  const data = response.data
  setFormData(data)
  }catch(err){
    console.log(err)
  }
} 

// additional info
const fetchAdditional = async()=>{
  try{
    const response = await axios(retrieveAdditional)
    const data = response.data
    setAddData(data)
  }catch(err){
    console.log(err)
  }
}
const handlePage = ()=>{
  navigate("/complete")
}

    useEffect(()=>{
      fetchCapacity()
        fetchBasic()
        fetchPhysical()
        fetchEducation()
        fetchCats()
        fetchTrade()
        fetchHosting()
        fetchAdditional()
        fetchEnv()
    },[])
  return (
    <>
    <p className='text-center reg_word text-success'>VIEW APPLICATION DETAILS</p>
    
     <div className="container col-sm-12 details">
     <div className="basicInfo mb-4 p-3 border rounded">
        <p className='whuu font-weight-bold' style={{ fontSize: '1.2rem', color: '#333' }}>Basic Information</p>
        <ul className="list-unstyled">
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>Name of The Enterprise/Industry:</h5>
                <span style={{ fontSize: '1rem', color: '#777' }}>{basic.NameOfTheIndustry}</span>
              </li>
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>Telephone Contact:</h5>
                <span style={{ fontSize: '1rem', color: '#777' }}>{basic.Telephone}</span>
              </li>
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>Contact Email:</h5>
                <span style={{ fontSize: '1rem', color: '#777' }}>{basic.ContactEmail}</span>
              </li>
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>Website Link:</h5>
                <span className="ellipsis" style={{ fontSize: '1rem', color: '#777' }}>{basic.WebsiteLink }</span>
              </li>
            </ul>
          
                <Link to={`/institute/update_bsic_infomation/${basic.id}`} className='text-white Link'>
                <button className='text-white p-2 text-center w-100 bg-success' type='submit' style={{ border: 'none', borderRadius: '4px' }}>
                Update Details
            </button>
                </Link>
     </div>

{/* physical address */}
     <div className="basicInfo mb-4 p-3 border rounded">
        <p className='whuu font-weight-bold' style={{ fontSize: '1.2rem', color: '#333' }}>Physical Address</p>
        <ul className="list-unstyled">
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>District:</h5>
                <span style={{ fontSize: '1rem', color: '#777' }}>{physical.District}</span>
              </li>
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>Constituency:</h5>
                <span style={{ fontSize: '1rem', color: '#777' }}>{physical.Constituency}</span>
              </li>
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>Sub_county:</h5>
                <span style={{ fontSize: '1rem', color: '#777' }}>{physical.Sub_county}</span>
              </li>
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>Parish:</h5>
                <span style={{ fontSize: '1rem', color: '#777' }}>{physical.Parish}</span>
              </li>

              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>Village:</h5>
                <span style={{ fontSize: '1rem', color: '#777' }}>{physical.Village}</span>
              </li>

              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>GPS_Points:</h5>
                <span style={{ fontSize: '1rem', color: '#777' }}>{physical.GPS_Points}</span>
              </li>
            </ul>
          
                <Link to={`/institute/update_physical_address/${physical.id}`} className='text-white Link'>
                <button className='text-white p-2 text-center w-100 bg-success' type='submit' style={{ border: 'none', borderRadius: '4px' }}>
                Update Details
            </button>
                </Link>
     </div>

     {/* capacity */}
     <div className="basicInfo mb-4 p-3 border rounded">
        <p className='whuu font-weight-bold' style={{ fontSize: '1.2rem', color: '#333' }}>Registration And Capacity</p>
        <ul className="list-unstyled">
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>Date_Of_Registration:</h5>
                <span style={{ fontSize: '1rem', color: '#777' }}>{capacity.Date_Of_Registration}</span>
              </li>

              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>Certificate:</h5>
                <span style={{ fontSize: '1rem', color: '#777' }}>{capacity.Certificate}</span>
              </li>

              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>Registration_Number:</h5>
                <span style={{ fontSize: '1rem', color: '#777' }}>{capacity.Registration_Number}</span>
              </li>
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>Name_Of_The_Contact_Person:</h5>
                <span style={{ fontSize: '1rem', color: '#777' }}>{capacity.Name_Of_The_Contact_Person}</span>
              </li>
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>TelNo_Of_The_Contact_Person:</h5>
                <span style={{ fontSize: '1rem', color: '#777' }}>{capacity.TelNo_Of_The_Contact_Person}</span>
              </li>

              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>Title_Of_The_Contact_Person:</h5>
                <span style={{ fontSize: '1rem', color: '#777' }}>{capacity.Title_Of_The_Contact_Person}</span>
              </li>

              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>reason:</h5>
                <span className="ellipsis" style={{ fontSize: '1rem', color: '#777' }}>{capacity.reason}</span>
              </li>
            </ul>
          
                <Link to={`/institute/update_registration_and_capacity/${capacity.id}`} className='text-white Link'>
                <button className='text-white p-2 text-center w-100 bg-success' type='submit' style={{ border: 'none', borderRadius: '4px' }}>
                Update Details
            </button>
                </Link>
     </div>

     {/* education count */}
     <div className="basicInfo mb-4 p-3 border rounded">
        <p className='whuu font-weight-bold' style={{ fontSize: '1.2rem', color: '#333' }}>Education Levels</p>
        <ul className="list-unstyled">
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>No_Formal_Education :</h5>
                <span style={{ fontSize: '1rem', color: '#777' }}>{education.No_Formal_Education}</span>
              </li>
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>PLE:</h5>
                <span style={{ fontSize: '1rem', color: '#777' }}>{education.PLE}</span>
              </li>
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>UCE:</h5>
                <span style={{ fontSize: '1rem', color: '#777' }}>{education.UCE}</span>
              </li>
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>UACE:</h5>
                <span style={{ fontSize: '1rem', color: '#777' }}>{education.UACE}</span>
              </li>

              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>Certificate :</h5>
                <span style={{ fontSize: '1rem', color: '#777' }}>{education.Certificate}</span>
              </li>

              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>Diploma:</h5>
                <span style={{ fontSize: '1rem', color: '#777' }}>{education.Diploma}</span>
              </li>

              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>Degree:</h5>
                <span style={{ fontSize: '1rem', color: '#777' }}>{education.Degree}</span>
              </li>

              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>Post_Graduate:</h5>
                <span style={{ fontSize: '1rem', color: '#777' }}>{education.Post_Graduate}</span>
              </li>

              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>Total:</h5>
                <span style={{ fontSize: '1rem', color: '#777' }}>{education.Total}</span>
              </li>
            </ul>
          
                <Link to={`/institute/update_education_level/${education.id}`} className='text-white Link'>
                <button className='text-white p-2 text-center w-100 bg-success' type='submit' style={{ border: 'none', borderRadius: '4px' }}>
                Update Details
            </button>
                </Link>
     </div>

     {/* categories */}
     <div className="basicInfo mb-4 p-3 border rounded">
        <p className='whuu font-weight-bold' style={{ fontSize: '1.2rem', color: '#333' }}>Employee Category</p>
        <ul className="list-unstyled">
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}> permanent_male :</h5>
                <span style={{ fontSize: '1rem', color: '#777' }}>{categories.permanent_male}</span>
              </li>
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>permanent_female:</h5>
                <span style={{ fontSize: '1rem', color: '#777' }}>{categories.permanent_female}</span>
              </li>
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>contract_male:</h5>
                <span style={{ fontSize: '1rem', color: '#777' }}>{categories.contract_male}</span>
              </li>
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>contract_female :</h5>
                <span style={{ fontSize: '1rem', color: '#777' }}>{categories.contract_female}</span>
              </li>

              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>casual_male  :</h5>
                <span style={{ fontSize: '1rem', color: '#777' }}>{categories.casual_male }</span>
              </li>

              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>casual_female :</h5>
                <span className="ellipsis" style={{ fontSize: '1rem', color: '#777' }}>{categories.casual_female}</span>
              </li>

              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>Male Consultants:</h5>
                <span className="ellipsis" style={{ fontSize: '1rem', color: '#777' }}>{categories.consultants_male}</span>
              </li>

              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>Female Consultants:</h5>
                <span className="ellipsis" style={{ fontSize: '1rem', color: '#777' }}>{categories.consultants_female}</span>
              </li>

            </ul>
          
                <Link to={`/institute/update_education_category/${categories.id}`} className='text-white Link'>
                <button className='text-white p-2 text-center w-100 bg-success' type='submit' style={{ border: 'none', borderRadius: '4px' }}>
                Update Details
            </button>
                </Link>
     </div>

{/* trade platform */}
     <div className="basicInfo mb-4 p-3 border rounded">
        <p className='whuu font-weight-bold' style={{ fontSize: '1.2rem', color: '#333' }}>Operation Sector</p>
        <ul className="list-unstyled">
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>targeted_trade :</h5>
                <span className="ellipsis" style={{ fontSize: '1rem', color: '#777' }}>{tradeData.targeted_trade}</span>
              </li>
               
              <p className='whuu'>Courses Description</p>
               <table class="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Code</th>
      <th scope="col">Module Name</th>
      <th scope="col">Duration</th>
    </tr>
  </thead>
  <tbody>
    {tradeData.courses.map((course, index) =>{
      const {module_code, module_name, duration} = course
      return (
        <>
        <tr>
      <th scope="row">{index + 1}</th>
      <td>{module_code}</td>
      <td>{module_name}</td>
      <td>{duration} days</td>
    </tr>
        </>
      )
    })}
    
  </tbody>
</table>

              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}> reason_for_partnership:</h5>
                <span className="ellipsis" style={{ fontSize: '1rem', color: '#777' }}>{tradeData.reason_for_partnership}</span>
              </li>
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}> enterprise_size:</h5>
                <span className="ellipsis" style={{ fontSize: '1rem', color: '#777' }}>{tradeData.enterprise_size}</span>
              </li>
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}> dev_stage:</h5>
                <span className="ellipsis" style={{ fontSize: '1rem', color: '#777' }}>{tradeData.dev_stage}</span>
              </li>

              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}> track_record :</h5>
                <span className="ellipsis" style={{ fontSize: '1rem', color: '#777' }}>{tradeData.track_record}</span>
              </li>

              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>expertise :</h5>
                <span className="ellipsis" style={{ fontSize: '1rem', color: '#777' }}>{tradeData.expertise}</span>
              </li>

              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}> staff_mentoring :</h5>
                <span className="ellipsis" style={{ fontSize: '1rem', color: '#777' }}>{tradeData.staff_mentoring}</span>
              </li>

              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>infrastructure:</h5>
                <span className="ellipsis" style={{ fontSize: '1rem', color: '#777' }}>{tradeData.infrastructure}</span>
              </li>

            </ul>
          
                <Link to={`/institute/update_trade_operation/${tradeData.id}`} className='text-white Link'>
                <button className='text-white p-2 text-center w-100 bg-success' type='submit' style={{ border: 'none', borderRadius: '4px' }}>
                Update Details
            </button>
                </Link>
     </div>

{/* hosting Apperentices */}
     <div className="basicInfo mb-4 p-3 border rounded">
        <p className='whuu font-weight-bold' style={{ fontSize: '1.2rem', color: '#333' }}>Experience in hosting apprentices</p>
        <ul className="list-unstyled">
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}> has_hosted_apprentices :</h5>
                <span className="ellipsis" style={{ fontSize: '1rem', color: '#777' }}>{formData.has_hosted_apprentices}</span>
              </li>
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>experience_details:</h5>
                <span className="ellipsis" style={{ fontSize: '1rem', color: '#777' }}>{formData.experience_details}</span>
              </li>
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>max_apprentices:</h5>
                <span className="ellipsis" style={{ fontSize: '1rem', color: '#777' }}>{formData.max_apprentices}</span>
              </li>
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>support_description:</h5>
                <span className="ellipsis" style={{ fontSize: '1rem', color: '#777' }}>{formData.support_description}</span>
              </li>

            </ul>
                <Link to={`/institute/update_hosting_apperentices/${formData.id}`} className='text-white Link'>
                <button className='text-white p-2 text-center w-100 bg-success' type='submit' style={{ border: 'none', borderRadius: '4px' }}>
                Update Details
            </button>
                </Link>
     </div>

{/* Additional information */}
     <div className="basicInfo mb-4 p-3 border rounded">
        <p className='whuu font-weight-bold' style={{ fontSize: '1.2rem', color: '#333' }}>Additional Information</p>
        <ul className="list-unstyled">
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>additionalComments :</h5>
                <span className="ellipsis" style={{ fontSize: '1rem', color: '#777' }}>{addData.additionalComments}</span>
              </li>
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>fullName:</h5>
                <span className="ellipsis" style={{ fontSize: '1rem', color: '#777' }}>{addData.fullName}</span>
              </li>
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}> verified:</h5>
                <span className="ellipsis" style={{ fontSize: '1rem', color: '#777' }}>{addData.verified}</span>
              </li>
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>organizationName:</h5>
                <span className="ellipsis" style={{ fontSize: '1rem', color: '#777' }}>{addData.organizationName}</span>
              </li>

            </ul>
          
                <Link to={`/institute/update_additional_info/${addData.id}`} className='text-white Link'>
                <button className='text-white p-2 text-center w-100 bg-success' type='submit' style={{ border: 'none', borderRadius: '4px' }}>
                Update Details
            </button>
                </Link>

     </div>

{/* Environment Qntns */}
     <div className="basicInfo mb-4 p-3 border rounded">
        <p className='whuu font-weight-bold' style={{ fontSize: '1.2rem', color: '#333' }}>Environmental, social, safety and Healthy questions</p>
        <ul className="list-unstyled">
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}> environmental WasteManagement :</h5>
                <span className="ellipsis" style={{ fontSize: '1rem', color: '#777' }}>{QtnsEnv.environmentalWasteManagement}</span>
              </li>
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>environmental Conservation:</h5>
                <span className="ellipsis" style={{ fontSize: '1rem', color: '#777' }}>{QtnsEnv.environmentalConservation}</span>
              </li>
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>socialCommunity Engagement:</h5>
                <span className="ellipsis" style={{ fontSize: '1rem', color: '#777' }}>{QtnsEnv.socialCommunityEngagement}</span>
              </li>
              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>socialLocal Suppliers:</h5>
                <span className="ellipsis" style={{ fontSize: '1rem', color: '#777' }}>{QtnsEnv.socialLocalSuppliers}</span>
              </li>

              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>social CSR Initiatives:</h5>
                <span className="ellipsis" style={{ fontSize: '1rem', color: '#777' }}>{QtnsEnv.socialCSRInitiatives}</span>
              </li>

              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>safety HealthPolicy:</h5>
                <span className="ellipsis" style={{ fontSize: '1rem', color: '#777' }}>{QtnsEnv.safetyHealthPolicy}</span>
              </li>

              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>safety Communication:</h5>
                <span className="ellipsis" style={{ fontSize: '1rem', color: '#777' }}>{QtnsEnv.safetyCommunication}</span>
              </li>

              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>safety Emergency Procedures:</h5>
                <span className="ellipsis" style={{ fontSize: '1rem', color: '#777' }}>{QtnsEnv.safetyEmergencyProcedures}</span>
              </li>

              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>health HygieneSanitation:</h5>
                <span className="ellipsis" style={{ fontSize: '1rem', color: '#777' }}>{QtnsEnv.healthHygieneSanitation}</span>
              </li>

              <li className="mb-2">
                <h5 style={{ fontSize: '1rem', color: '#555' }}>health WellnessPrograms:</h5>
                <span className="ellipsis" style={{ fontSize: '1rem', color: '#777' }}>{QtnsEnv.healthWellnessPrograms}</span>
              </li>

            </ul>
                <Link to={`/institute/update_env/${QtnsEnv.id}`} className='text-white Link'>
                <button className='text-white p-2 text-center w-100 bg-success' type='submit' style={{ border: 'none', borderRadius: '4px' }}>
                Update Details
            </button>
                </Link>
     </div>
                <button className='btn btn-primary text-center' onClick={handlePage}>Finish Application</button>
   </div>
    </>
  
  )
}

export default ViewDetails
