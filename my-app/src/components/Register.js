import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear previous error messages

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email }),
      });

      const data = await response.json();

      if (response.ok) {
        // If registration is successful
        onRegister && onRegister(true); // Update login state
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        // Handle specific error messages
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Something went wrong. Please try again later.');
    }
  };

  const handleClose = () => {
    navigate('/'); // Navigate back to the home screen
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
        <h2 style={{ color: '#ffffff' }}>Register New Account</h2>
        
        {/* Display error messages */}
        {error && <p style={{ color: '#ff6b6b', marginBottom: '1rem' }}>{error}</p>}

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
            Email
          </label>
          <input
            type="email"
            value={email}
            required
            onKeyDown={(e) => {
              // Prevent the user from pressing the spacebar
              if (e.key === ' ') e.preventDefault();
            }}
            onChange={(e) => {
              // Remove any spaces (in case of copy/paste)
              const noSpaces = e.target.value.replace(/\s+/g, '');
              setEmail(noSpaces);
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
          <label style={{ 
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '90%',
            margin: '0 auto',
            textAlign: 'left', 
          }}>
            Password
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

        <Button label="Register" type="submit" style={{ width: '100%' }} />
        <Button label="Close" onClick={handleClose} style={{ width: '100%' }} />
      </form>
    </div>
  );
};

export default Register;
