import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from '../Forms/Navbar'
import Login from '../Authenticate/Login'
import Register from '../Authenticate/Register'
import PrivateRoute from '../Forms/PrivateRoute'
import Pages from '../Forms/Pages'
import { AuthContext } from '../context/AuthContext'
import BasicInfo from '../Forms/BasicInfo'
import PhysicalAdress from '../Forms/PhysicalAdress'
import Capacity from '../Forms/Capacity'
import EducationLevel from '../Forms/EducationLevel'
import Category from '../Forms/Category'
import Trade from '../Forms/Trade'
import Hosting from '../Forms/Hosting'
import Additional from '../Forms/Additional'
import ViewDetails from '../ViewForm/ViewDetails'
import UpdateBasic from '../ViewForm/UpdateBasic'
import UpdatePhysical from '../ViewForm/UpdatePhysical'
import UpdateCapacity from '../ViewForm/UpdateCapacity'
import UpdateEducation from '../ViewForm/UpdateEducation'
import UpdateCategories from '../ViewForm/UpdateCategories'
import UpdateTrade from '../ViewForm/UpdateTrade'
import UpdateHost from '../ViewForm/UpdateHost'
import UpdateAdd from '../ViewForm/UpdateAdd'
import Logout from '../Authenticate/Logout'
import Profile from '../Forms/Profile'
import Complete from '../ViewForm/Complete'

function Show() {
  const { display } = useContext(AuthContext)

  return (
    <>
      <Navbar/>

      <Routes>
        {/* public routes */}
        <Route path='/' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}/>

        {/* private Routes */}
        <Route path='/institute/*'
          element={
            <PrivateRoute>
              <div className="sidebar">
                <div className={`sides ${display ? 'show' : ''}`}>
                  <Pages/>
                </div>
                <div className="routes">
                  <Routes>
                    <Route path='information' element={<BasicInfo/>}></Route>
                    <Route path='physical_Address' element={<PhysicalAdress/>}/>
                    <Route path="logout" element={<Logout/>}/>
                    <Route path='registration_and_capacity' element={<Capacity/>}/>
                    <Route path='education_level' element={<EducationLevel/>}/>
                    <Route path='category' element={<Category/>}/>
                    <Route path='operation_sector' element={<Trade/>}/>
                    <Route path='hosting_apprentices' element={<Hosting/>}/>
                    <Route path='additional_info' element={<Additional/>}/>
                    <Route path='view_details' element={<ViewDetails/>}/>
                    <Route path='update_bsic_infomation/:id' element={<UpdateBasic/>}/>
                    <Route path='update_physical_address/:id' element={<UpdatePhysical/>}/>
                    <Route path='update_registration_and_capacity/:id' element={<UpdateCapacity/>}/>
                    <Route path='update_education_level/:id' element={<UpdateEducation/>}/>
                    <Route path='update_education_category/:id' element={<UpdateCategories/>}/>
                    <Route path="update_trade_operation/:id" element={<UpdateTrade/>}/>
                    <Route path='update_hosting_apperentices/:id' element={<UpdateHost/>}/>
                    <Route path="update_additional_info/:id" element={<UpdateAdd/>}/>
                    <Route path='profile' element={<Profile/>}/>
                  </Routes>
                </div>
              </div>
            </PrivateRoute>
          }
        />
                    <Route path='/complete' element={<Complete/>}/>
      </Routes>
    </>
  )
}

export default Show
