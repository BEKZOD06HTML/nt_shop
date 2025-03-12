import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const { registerMutation } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(registerMutation); // ✅ registerMutation obyektini tekshirish
    registerMutation.mutate(
      { username, password, name },
      {
        onSuccess: (data) => {
          console.log('Registration successful!', data);
        },
        onError: (error) => {
          console.error('Error registering:', error);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />

      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />

      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />

      <button type="submit">Register</button>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
};

export default Register;
