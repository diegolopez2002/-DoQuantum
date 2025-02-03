import React, { useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer';

const Account = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('authToken');

    // State to track uploaded resume
    const [resumeUploaded, setResumeUploaded] = useState(false);
    const [resumeName, setResumeName] = useState(""); // Store the uploaded file name

    const handleLogoutClick = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('authToken');
            localStorage.clear();
            navigate('/');
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log('File uploaded:', file);
            setResumeUploaded(true); // Show the "Change Resume" button
            setResumeName(file.name); // Display the uploaded file name
        }
    };

    return (
        <div style={{ position: 'relative', width: '100vw', minHeight: '100vh', backgroundColor: '#100F1C' }}>
            <Header
                isLoggedIn={isLoggedIn}
                onLoginClick={() => navigate('/login')}
                onLogoutClick={handleLogoutClick}
                onRegisterClick={() => navigate('/register')}
                onDashboardClick={() => navigate('/Dashboard')}
            />

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                fontFamily: '"Inter", system-ui, sans-serif',
                color: '#ffffff',
                textAlign: 'center',
            }}>
                {/* Dashboard Title */}
                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    color: '#DC66FF',
                    textShadow: '2px 2px 6px rgba(220, 102, 255, 0.5)',
                    marginBottom: '1rem',
                }}>
                    Account
                </h1>

                {/* Resume Upload Section */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <label htmlFor="resumeUpload" style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '0.5rem' }}>
                        {resumeUploaded ? 'Update your resume (PDF):' : 'Upload your resume (PDF):'}
                    </label>

                    {/* File Input (Always Visible) */}
                    <input
                        type="file"
                        id="resumeUpload"
                        accept="application/pdf"
                        onChange={handleFileUpload}
                        style={{ marginBottom: '1rem', color: '#ffffff' }}
                    />

                    {/* Show the uploaded file name */}
                    {resumeUploaded && (
                        <p style={{ color: '#DC66FF', fontSize: '1rem', marginTop: '0.5rem' }}>
                            Uploaded: {resumeName}
                        </p>
                    )}

                    {/* Show Change Resume Button After Upload */}
                    {resumeUploaded && (
                        <button
                            onClick={() => setResumeUploaded(false)}
                            style={{
                                backgroundColor: '#DC66FF',
                                color: 'white',
                                border: 'none',
                                padding: '0.5rem 1rem',
                                cursor: 'pointer',
                                borderRadius: '5px',
                                fontSize: '1rem',
                                marginTop: '0.5rem'
                            }}
                        >
                            Change Resume
                        </button>
                    )}
                    <div>
                        <span>

                        </span>
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
};

export default Account;
