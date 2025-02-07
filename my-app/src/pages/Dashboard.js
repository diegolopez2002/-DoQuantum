import React from 'react';
import Header from '../components/Header';
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer';

const Dashboard = () => {

    const navigate = useNavigate();
    // Check if a token exists in local storage to determine login status
    const isLoggedIn = !!localStorage.getItem('authToken');

    const handleLogoutClick = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            // Remove the authentication token from local storage
            localStorage.removeItem('authToken');
            // Clear all items from local storage (optional, you might want to keep some)
            localStorage.clear();
            // Redirect the user to the home page
            navigate('/');
        }
    };

    return (
        // Main container for the dashboard
        <div
            style={{
                position: 'relative',
                width: '100vw', // Full viewport width
                minHeight: '100vh', // Minimum viewport height (allows content to expand)
                backgroundColor: '#100F1C', // Dark background color
            }}
        >
            {/* Header component */}
            <Header
                isLoggedIn={isLoggedIn} // Pass login status to the header
                onLoginClick={() => navigate('/login')} // Navigation handlers
                onLogoutClick={handleLogoutClick}
                onRegisterClick={() => navigate('/register')}
                onDashboardClick={() => navigate('/Dashboard')}
            />

            {/* Dashboard content container */}
            <div style={{
                display: 'flex',
                flexDirection: 'column', // Arrange items vertically
                justifyContent: 'center', // Center vertically
                alignItems: 'center',   // Center horizontally
                minHeight: '100vh',  // Ensure full viewport height or more
                color: '#ffffff',      // White text color
                fontFamily: '"Inter", system-ui, sans-serif', // Use the Inter font
            }}>
                {/* Dashboard title */}
                <h1>Dashboard</h1>
                {/* Welcome message */}
                <p>Welcome to the Dashboard!</p>

                {/*  Content area for the dashboard */}
                {/*  This is where you would add the main content of your dashboard. */}
                {/*  For example, you might display charts, graphs, user data, etc. */}
                {/*  You can fetch data using useEffect and useState, similar to the Account page example. */}
                <div>
                    {/* Example: Displaying some data (replace with your actual data) */}
                    {/* <p>User ID: {userId}</p>
                    <p>Some other data: {someData}</p> */}
                    <p>Dashboard content goes here.</p> {/* Placeholder text */}
                </div>


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

    );
}

export default Dashboard;