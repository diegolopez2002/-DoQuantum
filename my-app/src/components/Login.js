import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        if (data.token) {
          localStorage.setItem('authToken', data.token);
        }
        navigate('/dashboard'); 
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again later.');
    }
  };

  const handleClose = () => {
    navigate('/'); 
  };

  const handleRegister = () => {
    navigate('/register'); 
  };

  const handleGoogleLogin = () => {
    window.location.href = 'https://do-quantum-web-app.vercel.app/auth/google/';
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '1rem',
        justifyContent: 'center',
        backgroundColor: '#100F1C',
        color: '#ffffff',
        margin: '3rem auto',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: 'rgba(99, 102, 241, 0.1)',
          padding: '3rem',
          borderRadius: '1rem',
          textAlign: 'center',
          width: '350px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ color: '#ffffff' }}>Login to Account</h2>

        {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}

        <div style={{ marginBottom: '1rem' }}>
          <label
            style={{
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: '90%',
              margin: '0 auto',
              textAlign: 'left',
            }}
          >
            Username
          </label>
          <input
            type="text"
            value={username}
            required
            onKeyDown={(e) => {
              // Prevent the user from pressing the spacebar
              if (e.key === ' ') e.preventDefault();
            }}
            onChange={(e) => {
              // Remove any spaces (in case of copy/paste)
              const noSpaces = e.target.value.replace(/\s+/g, '');
              setUsername(noSpaces);
            }}
            style={{
              fontSize: '1rem',
              width: 'calc(90% - 1rem - 2px)',
              padding: '0.5rem',
              marginTop: '0.5rem',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label
            style={{
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: '90%',
              margin: '0 auto',
              textAlign: 'left',
            }}
          >
            Passphrase
          </label>
          <input
            type="password"
            value={password}
            required
            onKeyDown={(e) => {
              // Prevent the user from pressing the spacebar
              if (e.key === ' ') e.preventDefault();
            }}
            onChange={(e) => {
              // Remove any spaces (in case of copy/paste)
              const noSpaces = e.target.value.replace(/\s+/g, '');
              setPassword(noSpaces);
            }}
            style={{
              fontSize: '1rem',
              width: 'calc(90% - 1rem - 2px)',
              padding: '0.5rem',
              marginTop: '0.5rem',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        <Button label="Login" type="submit" style={{ width: '100%' }} />
        <Button label="Close" type="button" onClick={handleClose} style={{ width: '100%' }} />
        
        <Button
          label="Login with Google"
          type="button"
          onClick={handleGoogleLogin}
          style={{ width: '100%', marginTop: '1rem' }}
        />

        <p style={{ marginTop: '1rem', color: '#a5b4fc' }}>
          Don’t have an account?{' '}
          <span
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={handleRegister}
          >
            Register here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
