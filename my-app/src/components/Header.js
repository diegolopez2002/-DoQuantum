import React from 'react';
import Button from './Button';

const Header = ({ isLoggedIn, onLoginClick, onLogoutClick }) => {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '5rem',
        backgroundColor: 'rgba(16, 15, 28, 0.9)', // Semi-transparent background
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 99, // Ensure it's above other elements
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Optional shadow for separation
      }}
    >
      <a
        href="doquantum.org"
        style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          marginLeft: '1rem',
        }}
      >
        <img
          src="/FullLogo_Transparent_NoBuffer.png"
          alt="Do Quantum Logo"
          style={{
            height: '3.5rem', // Adjust logo size
            cursor: 'pointer',
          }}
        />
      </a>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isLoggedIn ? (
          <Button
            label="Logout"
            onClick={onLogoutClick}
            style={{
              marginRight: '1rem',
              padding: '0.5rem 1rem',
              fontSize: '1rem', // Adjust for smaller screens
            }}
          />
        ) : (
          <Button
            label="Login"
            onClick={onLoginClick}
            style={{
              marginRight: '1rem',
              padding: '0.5rem 1rem',
              fontSize: '1rem', // Adjust for smaller screens
            }}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
