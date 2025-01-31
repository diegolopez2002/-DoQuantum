import React from 'react';

import Header from '../components/Header';
import { useNavigate } from "react-router-dom";


const Account = () => {

    const navigate = useNavigate();

    // Example usage of navigate

    const handleLogoutClick = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('authToken');
            localStorage.clear();
            navigate('/');
        }
    };

    return (

        <div>
            <Header />
            <button onClick={handleLogoutClick}>Logout</button>
        </div>
    );



}

export default Account;