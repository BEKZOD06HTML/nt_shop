import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Profile from '../pages/profile/profile'  
import Login from '../pages/login/login'
import PrivateRoute from './PrivateRoute'
import Register from '../pages/registor/registor'
import Groups from '../components/groups/groups'

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/groups' element={<Groups/>}/>  
      </Route>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
  )
}

export default Router;
