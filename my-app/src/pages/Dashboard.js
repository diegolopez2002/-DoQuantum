import React from 'react';

import Header from '../components/Header';
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer';

const Dashboard = () => {

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
        <div
            style={{
            position: 'relative',
            width: '100vw',
            minHeight: '100vh',
            backgroundColor: '#100F1C',
            }}
        >
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
                <h1>Dashboard</h1>
                <p>Welcome to the Dashboard!</p>
                <div>
                    <Footer />
                </div>
            </div>

        </div>

    );
}

export default Dashboard;