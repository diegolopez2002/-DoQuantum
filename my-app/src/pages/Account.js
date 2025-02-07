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
    const [resumeURL, setResumeURL] = useState(null); // Store file URL

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
            const fileURL = URL.createObjectURL(file); // Create a temporary URL for the file
            console.log('File uploaded:', file);
            setResumeUploaded(true);
            setResumeName(file.name);
            setResumeURL(fileURL);
        }
    };

    return (

        <div style={{ overflowY: "scroll" }}>

        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh', // Ensures the page takes at least full viewport height
            backgroundColor: '#100F1C',
        }}>
            <Header
                isLoggedIn={isLoggedIn}
                onLoginClick={() => navigate('/login')}
                onLogoutClick={handleLogoutClick}
                onRegisterClick={() => navigate('/register')}
                onDashboardClick={() => navigate('/Dashboard')}
            />

            <div style={{
                flexGrow: 1,  // Allows content to expand and take available space
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: '0.1rem',  // Reduced top padding to bring content closer to header
                paddingBottom: '2rem',  // Keep footer space
                fontFamily: '"Inter", system-ui, sans-serif',
                color: '#ffffff',
                textAlign: 'center',
                position: 'relative', // Relative positioning to make footer stay at the bottom
            }}>

            <section style={{ marginTop: '-4rem',
             }}>
                {/* Dashboard Title */}
                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    color: '#DC66FF',
                    textShadow: '2px 2px 6px rgba(220, 102, 255, 0.5)',
                    marginBottom: '1rem',
<<<<<<< Updated upstream
                    marginTop: '0',
                    display: 'flex',

=======
>>>>>>> Stashed changes
                }}>
                    Account
                </h1>
            </section>
        

                {/* Resume Upload Section */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '2rem' }}>
                    <label htmlFor="resumeUpload" style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '0.5rem' }}>
                        {resumeUploaded ? 'Update your resume (PDF):' : 'Upload your resume (PDF):'}
                    </label>

                    {/* Custom File Upload Button */}
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <input
                            type="file"
                            id="resumeUpload"
                            accept="application/pdf"
                            onChange={handleFileUpload}
                            style={{
                                position: 'absolute',
                                opacity: 0,
                                width: '100%',
                                height: '100%',
                                cursor: 'pointer',
                            }}
                        />
                        <button
                            style={{
                                backgroundColor: '#DC66FF',
                                color: 'white',
                                border: 'none',
                                padding: '0.5rem 1rem',
                                cursor: 'pointer',
                                borderRadius: '5px',
                                fontSize: '0.75rem',
                                width: '180px',
                            }}
                        >
                            {resumeUploaded ? "Change Resume" : "Choose File"}
                        </button>
                    </div>

                    {/* Show uploaded file name */}
                    {resumeUploaded && (
                        <p style={{ color: '#DC66FF', fontSize: '1rem', marginTop: '0.5rem' }}>
                            Uploaded: {resumeName}
                        </p>
                    )}

                    {/* View Resume Button */}
                    {resumeUploaded && resumeURL && (
                        <button
                            onClick={() => window.open(resumeURL, '_blank')}
                            style={{
                                backgroundColor: '#28A745', // Green color for visibility
                                color: 'white',
                                border: 'none',
                                padding: '0.5rem 1rem',
                                cursor: 'pointer',
                                borderRadius: '5px',
                                fontSize: '1rem',
                                width: '200px',
                                marginTop: '0.5rem',
                            }}
                        >
                            View Resume
                        </button>
                    )}
                </div>

                <section>
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#DC66FF',
                        textShadow: '2px 2px 6px rgba(220, 102, 255, 0.5)',
                        marginBottom: '1rem',
                        marginTop: '0',
                        display: 'flex',
                    }}> User Information : </h2>
                    <h3> Username: </h3>
                    <h3> Email: </h3>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h3 style={{ marginRight: '1rem' }}> Password: </h3>
                        <button style={{ 
                            backgroundColor: '#DC66FF',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            cursor: 'pointer',
                            borderRadius: '5px',
                            fontSize: '0.75rem',
                            width: '180px',
                            position: 'relative',
                        }}
                        onClick={() => window.location.href = '/dashboard'} // chnange route to change password make a compnent like login for that
                        > Change Password </button>
                    </div>
                </section>
                
                {/* Footer component */}
                <div style={{
                    position: 'absolute',   //Absolute positioning to make footer stay in place
                    bottom: '0',           //Position it at the bottom
                    width: '100%',         //Footer covers full width of the screen
                }}>
                    <Footer />
                </div>
                
            </div>
            </div>
        </div>
    );
};

export default Account;
