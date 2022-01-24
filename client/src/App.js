import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Routes, Route } from "react-router-dom";

// Pages
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/channels/@me/:roomId" element={<Dashboard />} /> */}
          {/* change to loading screen */}
          <Route path="/channels" element={<Dashboard />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path='channels/@me/:roomId' element={<Chat />} /> */}
        </Routes>
      </div>
  );
}

export default App;
