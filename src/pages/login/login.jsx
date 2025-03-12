// Login.jsx
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loginMutation } = useAuth();

  // Token bor bo'lsa, profile sahifasiga o'tkazish
  if (localStorage.getItem('token')) {
    return <Navigate to='/profile' replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Username va passwordni kiriting!');
      return;
    }

    loginMutation.mutate({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <label>Username: 
        <input 
          type="text" 
          placeholder='Username' 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
      </label>
      <br />

      <label>Password: 
        <input 
          type="password" 
          placeholder='Password' 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </label>
      <br />

      <button type="submit">Login</button>

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
};

export default Login;