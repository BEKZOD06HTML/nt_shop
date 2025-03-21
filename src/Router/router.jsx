import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home/home';
import Profile from '../pages/profile/Profile';
import Login from '../pages/login/Login';
import PrivateRoute from './PrivateRoute';
import Register from '../pages/registor/registor';
import Groups from '../components/groups/groups'; // ✅ Groups sahifasini qo‘shdik

const Router = () => {
  return (
    <Routes>
      {/* Faqat login qilganlar kirishi mumkin */}
      <Route path="/" element={<PrivateRoute />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="groups" element={<Groups />} /> {/* ✅ Groups sahifasi qo‘shildi */}
      </Route>

      {/* Login va Register sahifalari */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Router;
