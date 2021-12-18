import React, { useEffect, useState } from 'react';
import './App.css';
// import ServerBar from './components/ServerBar/ServerBar';
// import DirectMessages from './components/DirectMessages/DirectMessages';
import 'semantic-ui-css/semantic.min.css';
import ChannelsHome from './pages/ChannelsHome';
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import User from './userContext';

function App() {

  // const x = {email: ''}
  const [user, setUser] = useState({});
  console.log(user);

  return (
    <div className="app">
    <User.Provider value={ { user, setUser } }>
      <Routes>
        <Route path="/channels" element={<ChannelsHome />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </User.Provider>
    </div>
  );
}

export default App;
