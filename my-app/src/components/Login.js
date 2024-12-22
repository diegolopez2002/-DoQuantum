import React, { useState } from 'react';

import Button from './Button';

const Login = ({ onLogin, onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      if (username === 'admin' && password === 'pass') {
        onLogin(true);
      } else {
        setError('Invalid username or password');
      }
    };
  
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '1rem',
        justifyContent: 'center',
        backgroundColor: '#100F1C',
        color: '#ffffff',
      }}>
        <form onSubmit={handleSubmit} style={{
          background: 'rgba(99, 102, 241, 0.1)',
          padding: '3rem',
          borderRadius: '1rem',
          textAlign: 'center',
          width: '350px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}>
          <h2 style={{ color: '#ffffff' }}>Login with UMD Account</h2>
          {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}
          <div style={{ marginBottom: '1rem' }}>           
            
            <label style={{
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: '100%',
              margin: '0 auto',
              textAlign: 'left', 
              }}>Directory ID</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                fontSize: '1rem',
                width: 'calc(100% - 1rem - 2px)',
                alignItems: 'center',
                padding: '0.5rem',
                marginTop: '0.5rem',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: '100%',
              margin: '0 auto',
              textAlign: 'left', 
            }}>Passphrase</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                fontSize: '1rem',
                width: 'calc(100% - 1rem - 2px)',
                alignItems: 'center',
                padding: '0.5rem',
                marginTop: '0.5rem',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
          </div>
          <Button label="Login" type="submit" style={{ width: '100%' }} />
          <Button label="Close" onClick={onClose} style={{ width: '100%' }} />
        </form>
      </div>
    );
  };


  export default Login;