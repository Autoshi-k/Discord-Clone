import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/ChannelsHome';
import ChannelsHome from './pages/ChannelsHome';

function App() {

  return (
    <div className="app">
      <Routes>
        <Route path="/channels" element={<ChannelsHome />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
