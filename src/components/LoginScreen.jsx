

import React, { useState } from 'react';
import { loginUser } from '../services/api';


const DEFAULT_USERNAME = 'admin';
const DEFAULT_PASSWORD = '1234';

const LoginScreen = ({ onLogin }) => { 
  const [username, setUsername] = useState(DEFAULT_USERNAME);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      
      await loginUser(username, password);
      
      
      onLogin(); 
      
    } catch (err) {
      setError(err.message || 'Login failed. Check your credentials.');
    }
  };

  return (
    <div className="login-container"> 
      <div className="login-form-card">
        <div className="login-logo">RT</div>
        <h2 style={{marginBottom: '2rem'}}>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
          <div className="row">
            <label>Username</label>
            <input
              className="input"
              type="text"
              name="username"
              
              defaultValue={DEFAULT_USERNAME}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="row" style={{marginBottom: '2rem'}}>
            <label>Password</label>
            <input
              className="input"
              type="password"
              name="password"
              
              defaultValue={DEFAULT_PASSWORD}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="row actions-row">
            <button className="btn btn-orange" type="submit" style={{width: '100%'}}>Log In</button>
          </div>
          {/* PLACEHOLDER DISPLAY */}
          <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem', color: '#888' }}>
              Test Credentials: <strong>admin</strong> / <strong>1234</strong>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;