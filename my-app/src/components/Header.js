import React from 'react';
import Button from './Button';

const Header = ({
  isLoggedIn,
  onLoginClick,
  onLogoutClick,
  onRegisterClick,
  onDashboardClick,
}) => {
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
        padding: '0 1rem',
        boxSizing: 'border-box',
      }}
    >
      {/* Logo / Home Link */}
      <a
        href="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
        }}
      >
        <img
          src="/FullLogo_Transparent_NoBuffer.png"
          alt="Do Quantum Logo"
          style={{
            height: '3.5rem',
            cursor: 'pointer',
          }}
        />
      </a>

      {/* Right-Side Buttons */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        {isLoggedIn ? (
          // If user is logged in
          <>
            <Button
              label="Logout"
              onClick={onLogoutClick}
              style={{
                padding: '0.5rem 1rem',
                fontSize: '1rem',
              }}
            />

             { /* Account Button */}
             {/* <button
                onClick={() => (window.location.href = '/account')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <img
                  src="icons8-contact-info-48.png"
                  alt="Account Icon"
                  backgroundColor="#DC66FF"
                  style={{
                    height: '2rem', // Adjust size as needed
                    width: '2rem',
                  }}
                />
              </button>  */}
          </>


        ) : (
          // If user is NOT logged in, show Login & Register
          <>
            <Button
              label="Login"
              onClick={onLoginClick}
              style={{
                padding: '0.5rem 1rem',
                fontSize: '1rem',
              }}
            />
            <Button
              label="Register"
              onClick={onRegisterClick}
              style={{
                padding: '0.5rem 1rem',
                fontSize: '1rem',
              }}
            />
            <Button
              label="Dashboard"
              onClick={onDashboardClick}
              style={{
                padding: '0.5rem 1rem',
                fontSize: '1rem',
              }}
            />
            {/* Image as a Button */}
            <button
                onClick={() => (window.location.href = '/account')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  paddingTop: '0.5rem',
                }}
              >
                <img
                  src="icons8-admin-settings-male-50.png"
                  alt="Account Icon"
                  backgroundColor="#DC66FF"
                  color='white'
                  style={{
                    height: '2rem', // Adjust size as needed
                    width: '2rem',
                    backgroundColor: '#DC66FF',
                    borderRadius: '50%',
                    padding: '0.5rem 0.5rem',
                    fontSize: '1rem',

                  }}
                />
              </button>

          </>
        )}
      </div>

    </header>
  );
};

export default Header;
