import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Profile from '../pages/profile/profile'  
import Login from '../pages/login/login'
import PrivateRoute from './PrivateRoute'
import Register from '../pages/registor/registor'
const router = () => {
  return <Routes>
    <Route path='/' element={<PrivateRoute/>}>
    <Route path='/profile' element={<Profile/>}/>
    </Route>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
  </Routes>
}

export default router 
