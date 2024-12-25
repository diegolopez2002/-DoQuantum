import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="*" element={<h1 style={{color: '#ffffff', }}>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;