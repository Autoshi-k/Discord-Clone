import React, { useEffect } from 'react';
import './App.css';
// import ServerBar from './components/ServerBar/ServerBar';
// import DirectMessages from './components/DirectMessages/DirectMessages';
import 'semantic-ui-css/semantic.min.css';
import ChannelsHome from './pages/ChannelsHome';
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';


function App() {

  // useEffect(() => {
  //   fetch("/auth/google").then(res=>res.json()).then(json=>console.log(json));
  // }, [])
  // const user = "Autoshiii-k";
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
