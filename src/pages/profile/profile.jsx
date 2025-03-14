import React from 'react';
import Header from '../../components/header/header';
import Siderbar from '../../components/sidebar/sidebar';
import './profile.css';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className='all'>
      <Header />
      <Siderbar />
      <div className="profile-container">
      <h2>Your Profile</h2>
        <div className="profile-card">
          
          <img src={user.avatar || '/default-avatar.png'} alt="avatar" className="avatar" />
          <div className="profile-info">
            <h3>{user.username || 'Guest'}</h3>
            <p>{user.name || 'No name'}</p>
            <span className="status">Active</span>
          </div>
          {/* <div className="profile-actions">
            <button className="logout-btn" onClick={handleLogout}>
               <img src="./assets/icon/logout.png" alt="" />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
