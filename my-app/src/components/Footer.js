import React from "react";

const Footer = () => {
    return (
        <footer style={{
            position: 'relative',
            bottom: 0,
            zIndex: 99,
            width: '100%',
            padding: '1rem 0 1rem 0',
            backgroundColor: 'rgba(16, 15, 28, 1)', // Solid background
            color: '#ffffff',
            textAlign: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)', // Optional border
            fontFamily: '"Inter", system-ui, sans-serif',
            }}>
            <p>
                Call or Text us: 
                <a href="tel:+19083071999" style={{
                color: '#DC66FF',
                textDecoration: 'none',
                marginLeft: '0.5rem',
                }}>+1 (908) 307-1999</a>
            </p>
            <p>
                Email us: <a href="mailto:doquantumresearch@gmail.com" style={{
                color: '#DC66FF',
                textDecoration: 'none',
                cursor: 'pointer',
                }}>doquantumresearch@gmail.com</a>
            </p>
        </footer>
    );
};

export default Footer;