import React from 'react';

const Button = ({ label, onClick, style, type }) => (
  <button
    type={type}
    onClick={onClick}
    style={{
        marginTop: '1rem',
        backgroundColor: '#DC66FF',
        color: '#ffffff',
        fontSize: '1rem',
        border: 'none',
        padding: '0.8rem 1.5rem',
        borderRadius: '8px',
        cursor: 'pointer',
        width: 'auto',
        ...style,
    }}
  >
    {label}
  </button>
);

export default Button;
