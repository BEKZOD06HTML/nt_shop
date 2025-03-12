import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import useGroups from '../../hooks/usegroup';

const Header = () => {
  const [group, setGroup] = useState("");

  const { groups, groupsLoading, groupsError } = useGroups(group);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/login" className="logo-text">b</Link>
      </div>

      <nav className="nav-links">
        <button className="new-button">+ New</button>
      </nav>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        />
      </div>

      {group.length > 0 && (
        <div className="search-content">
          <h1>Group</h1>
          {groups?.map((user) => (
            <div key={user.id} className="search-item">
              <div className="search-item-left">
                <p>{user.name}</p>
                <p>created by ubaydulloh</p>
              </div>
              <div className="search-item-right">
                <button>Join</button>
              </div>
            </div>
          ))}
          {groupsLoading && <p>Loading...</p>}
        </div>
      )}

      <button className="out">logout</button>
    </header>
  );
};

export default Header;
