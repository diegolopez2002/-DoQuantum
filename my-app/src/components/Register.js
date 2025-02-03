import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button'; // Assuming you have a custom Button component

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState(''); // State for username input
  const [password, setPassword] = useState(''); // State for password input
  const [email, setEmail] = useState('');   // State for email input
  const [error, setError] = useState('');   // State for error messages
  const navigate = useNavigate();          // Hook for navigation

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form from full page reload
    setError(''); // Clear any previous error messages

    try {
      const response = await fetch('http://localhost:5000/register', { // Send registration data to server
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email }), // Convert data to JSON
      });

      const data = await response.json(); // Parse the JSON response from the server

      if (response.ok) { // Check if the response indicates success (status code in the 200-299 range)
        onRegister && onRegister(true); // Call the onRegister callback (if provided) to update login state in parent component
        navigate('/dashboard'); // Redirect to the dashboard after successful registration
      } else {
        // Handle registration errors from the server
        setError(data.message || 'Registration failed'); // Display the error message from the server or a generic message
      }
    } catch (err) {
      console.error('Registration error:', err); // Log any network or other errors
      setError('Something went wrong. Please try again later.'); // Display a generic error message to the user
    }
  };

  const handleClose = () => {
    navigate('/'); // Navigate back to the home screen
  };

  return (
    // Main container for the registration form
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // Center the form horizontally
      borderRadius: '1rem',
      justifyContent: 'center', // Center the form vertically
      backgroundColor: '#100F1C', // Dark background
      color: '#ffffff',        // White text color
      margin: '3rem auto',    // Center the container on the page
    }}>
      <form 
        onSubmit={handleSubmit} // Handle form submission
        style={{
          background: 'rgba(99, 102, 241, 0.1)', // Light purple background for the form
          padding: '3rem',
          borderRadius: '1rem',
          textAlign: 'center',
          width: '350px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
        }}
      >
        <h2 style={{ color: '#ffffff' }}>Register New Account</h2>

        {/* Display error messages if any */}
        {error && <p style={{ color: '#ff6b6b', marginBottom: '1rem' }}>{error}</p>}

        {/* Username input field */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{  // Styling for labels
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column', // Place label above input
            alignItems: 'flex-start', // Align label to the left
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
            onKeyDown={(e) => { if (e.key === ' ') e.preventDefault(); }} // Prevent spaces
            onChange={(e) => { setUsername(e.target.value.replace(/\s+/g, '')); }} // Remove spaces on change
            style={{ // Styling for input fields
              fontSize: '1rem',
              width: 'calc(90% - 1rem - 2px)', // Adjust width for padding and border
              padding: '0.5rem',
              marginTop: '0.5rem',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        {/* Email input field */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ // Styling for labels (repeated for consistency)
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
            onKeyDown={(e) => { if (e.key === ' ') e.preventDefault(); }} // Prevent spaces
            onChange={(e) => { setEmail(e.target.value.replace(/\s+/g, '')); }} // Remove spaces on change
            style={{ // Styling for input fields (repeated for consistency)
              fontSize: '1rem',
              width: 'calc(90% - 1rem - 2px)',
              padding: '0.5rem',
              marginTop: '0.5rem',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        {/* Password input field */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ // Styling for labels (repeated for consistency)
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
            onKeyDown={(e) => { if (e.key === ' ') e.preventDefault(); }} // Prevent spaces
            onChange={(e) => { setPassword(e.target.value.replace(/\s+/g, '')); }} // Remove spaces on change
            style={{ // Styling for input fields (repeated for consistency)
              fontSize: '1rem',
              width: 'calc(90% - 1rem - 2px)',
              padding: '0.5rem',
              marginTop: '0.5rem',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        {/* Register button */}
        <Button label="Register" type="submit" style={{ width: '100%' }} />
        {/* Close button */}
        <Button label="Close" onClick={handleClose} style={{ width: '100%' }} />
      </form>
    </div>
  );
};

export default Register;
