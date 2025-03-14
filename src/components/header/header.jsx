import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import useGroups from '../../hooks/usegroup';

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const [group, setGroup] = useState("");

  const { groups, groupsLoading, groupsError } = useGroups(group);

  return (
    <header className="header">
     <div className='logo_team'>
     <div className="logo">
        <Link to="/login"  className="logo-text"><img src="./assets/icon/teamwork.png" alt="" /></Link>
      </div>

      <nav className="nav-links">
        <button className="new-button">+ New</button>
      </nav>

     </div>
      <div className="search-container">
        <img className='lup' src="./assets/icon/loupe.png" alt="" />
        <input
          type="text"
          placeholder="Search"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          className='search-input'
        />
      </div>

      {group.length > 0 && (
        <div className="search-content">
          <h1>Groups</h1>
          {groups?.map((user) => (
            <div key={user.id} className="search-item">
              <div className="search-item-left">
                
                <p className='group'>
                  <span><img src="./assets/icon/teamwork.png" alt="" /></span>
                  <span>{user.name}</span></p>
              </div>
              <div className="search-item-right">
                <button className='join'>Join</button>
              </div>
            </div>
          ))}
          {groupsLoading && <p>Loading...</p>}
        </div>
      )}
  <div className='btns'>
      
  <button className="out" onClick={handleLogout} ><img src="./assets/icon/logout.png" alt="" /></button>
  </div>
    </header>
  );
};

export default Header;
