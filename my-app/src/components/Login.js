import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Button from './Button';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

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
        navigate('/dashboard'); // Redirect to dashboard on successful login
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again later.');
    }
  };

  const handleClose = () => {
    navigate('/'); // Navigate back to the home screen
  };

  const handleRegister = () => {
    navigate('/register'); // Navigate to the register page
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
        <h2 style={{ color: '#ffffff' }}>Login with UMD Account</h2>
        
        {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}

        <div style={{ marginBottom: '1rem' }}>
          <label style={{
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '90%',
            margin: '0 auto',
            textAlign: 'left', 
          }}>
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
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
          <label style={{ 
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '90%',
            margin: '0 auto',
            textAlign: 'left', 
          }}>
            Passphrase
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
