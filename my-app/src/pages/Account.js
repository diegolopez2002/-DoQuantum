import React from 'react';

import Header from '../components/Header';
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer';



const Account = () => {

    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('authToken');

    const handleLogoutClick = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('authToken');
            localStorage.clear();
            navigate('/');
        }
    };


    return (
                                    // Update  this page to show users login information 
        <div>
            <div
                style={{
                position: 'relative',
                width: '100vw',
                minHeight: '100vh',
                backgroundColor: '#100F1C',
                }}
            ></div>

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
                height: '100vh',
                color: '#ffffff',
                fontFamily: '"Inter", system-ui, sans-serif',
            }}>
                <h1 style={{
                    color: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                }}> Account </h1>


                <form method='post' action='http://localhost:5000/account' style={{ }}>
                    <input type='file' name='resume' placeholder='ResumeUploader' />
                    <button type="submit">Upload</button>
                </form>

    
            <div>
                <Footer />
            </div>
            

            </div>
        </div>
    );



}

export default Account;