import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const PasswordChanger = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Password changed successfully');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError(data.message || 'Password change failed');
      }
    } catch (err) {
      console.error('Password change error:', err);
      setError('Something went wrong. Please try again later.');
    }
  };

  const handleClose = () => {
    navigate('/');
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
      margin: '3rem auto',
    }}>
      <form onSubmit={handleSubmit} style={{
        background: 'rgba(99, 102, 241, 0.1)',
        padding: '3rem',
        borderRadius: '1rem',
        textAlign: 'center',
        width: '350px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}>
        <h2 style={{ color: '#ffffff' }}>Change Password</h2>

        {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}
        {success && <p style={{ color: '#4CAF50' }}>{success}</p>}

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ color: '#ffffff', display: 'block', textAlign: 'left' }}>Old Password</label>
          <input type="password" value={oldPassword} required onChange={(e) => setOldPassword(e.target.value)} style={inputStyle} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ color: '#ffffff', display: 'block', textAlign: 'left' }}>New Password</label>
          <input type="password" value={newPassword} required onChange={(e) => setNewPassword(e.target.value)} style={inputStyle} />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ color: '#ffffff', display: 'block', textAlign: 'left' }}>Confirm New Password</label>
          <input type="password" value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)} style={inputStyle} />
        </div>

        <Button label="Change Password" type="submit" style={{ width: '100%' }} />
        <Button label="Close" type="button" onClick={handleClose} style={{ width: '100%' }} />
      </form>
    </div>
  );
};

const inputStyle = {
  fontSize: '1rem',
  width: 'calc(90% - 1rem - 2px)',
  padding: '0.5rem',
  marginTop: '0.5rem',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

export default PasswordChanger;