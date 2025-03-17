import React, { useEffect, useState } from 'react';
import Header from '../../components/header/header';
import Sidebar from '../../components/sidebar/sidebar';
import API from '../../utils/API';
import './profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
 const response = await API.get('/auth/');
        setUser(response.data);
      } catch (err) {
        setError('eroor');
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className='all'>
      <Header />
      <Sidebar />
      <div className="profile-container">
        <h2>Your Profile</h2>
        <div className="profile-card">
         <img className="avatar" src="../assets/icon/user.png" alt="" />
          <div className="profile-info">
            <h3>{user.username}</h3>
            <p>{user.name}</p>
            <span className="status">Active</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
