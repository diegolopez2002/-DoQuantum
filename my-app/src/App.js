import React from 'react';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import necessary components from react-router-dom

import Home from './pages/Home'; // Import the Home page component
import Dashboard from './pages/Dashboard'; // Import the Dashboard page component
import Login from './components/Login'; // Import the Login component
import Register from './components/Register'; // Import the Register component
import Account from './pages/Account'; // Import the Account page component

// Define the main App component, which handles routing
const App = () => {
  return (
    <Router> {/* Use BrowserRouter for routing */}
    <div style={{
        display : "flex",
        flexDirection: "column",
        minHeight: "100vh"}}>
      <main style = {{ flex: 1 }}>
      <Routes> {/* Use Routes to define the different routes */}
        <Route path="/" element={<Home />} /> {/* Route for the home page ("/") */}

        <Route path="/login" element={<Login />} /> {/* Route for the login page ("/login") */}
        <Route path="/register" element={<Register />} /> {/* Route for the register page ("/register") */}

        <Route path="/Dashboard" element={<Dashboard />} /> {/* Route for the dashboard page ("/Dashboard") */}
        <Route path="/account" element={<Account />} /> {/* Route for the account page ("/account") */}

        {/* Catch-all route for any unmatched paths */}
        {/* This will display a 404 message if the user tries to access a page that doesn't exist */}
        <Route path="*" element={<h1 style={{ color: '#ffffff' }}>404 Not Found</h1>} /> 
      </Routes>
          </main>
          <Footer/>
          </div>
    </Router>
  );
}

export default App;
