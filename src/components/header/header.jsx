import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import useGroups from '../../hooks/usegroup';
import API from '../../utils/API';

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const [group, setGroup] = useState('');
  const { groups, groupsLoading } = useGroups(group);

  const joinGroup = async (groupId) => {
    if (!groupId) {
      alert('');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('');
        return;
      }

      const response = await API.post(
        `/groups/${groupId}/join/`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(`Siz "${response.data.name}"`);
    } catch (error) {
      console.error('', error.response?.data || error.message);
      alert(error.response?.data?.message || '');
    }
  };

  return (
    <header className="header">
      <div className="logo_team">
        <div className="logo">
          <Link to="/login" className="logo-text">
            <img src="./assets/icon/teamwork.png" alt="Teamwork Logo" />
          </Link>
        </div>

        <nav className="nav-links">
          <button className="new-button">+ New</button>
        </nav>
      </div>

      <div className="search-container">
        <img className="lup" src="./assets/icon/loupe.png" alt="Search" />
        <input
          type="text"
          placeholder="Search"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          className="search-input"
        />
      </div>

      {group.length > 0 && (
        <div className="search-content">
          <h1>Groups</h1>
          {groupsLoading ? (
            <p>Loading...</p>
          ) : (
            groups?.map((g) => (
              <div key={g.id} className="search-item">
                <div className="search-item-left">
                  <p className="group">
                    <span>
                      <img src="./assets/icon/teamwork.png" alt="" />
                    </span>
                    <span>{g.name}</span>
                  </p>
                </div>
                <div className="search-item-right">
                  <button className="join" onClick={() => joinGroup(g.id)}>
                    Join
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <div className="btns">
        <button className="out" onClick={handleLogout}>
          <img src="./assets/icon/logout.png" alt="Logout" />
        </button>
      </div>
    </header>
  );
};

export default Header;
