import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
// import ChannelsHome from './pages/ChannelsHome';
// import WebSocketProvider from './socketwebContext';
import { connect } from 'react-redux';
import { login } from './actions';
import Home from './pages/Home';
// import {io} from "socket.io-client";
import io from 'socket.io-client';
import Signup from './pages/Signup';


export const getUserSessionFromServer = async () => {
  const res = await fetch('/api/user');
  const data = await res.json();
  console.log('data from getSession', data);
  return { name: 'shani' };
}
function App({ userAuth }) {
  // const [user, setUser] = useState(null);
  console.log('app run');



  // useEffect(() => {
  //   async function getUserByFetch () {
  //     login(await getUserSessionFromServer());
  //     console.log('userAuth App', userAuth);
  //   }
  //   getUserByFetch();
  //  }, [])

  //  const [socket, setSocket] = useState(null);

  //  useEffect(() => {
  //   const newSocket = io();
  //   setSocket(newSocket);
  //   return () => newSocket.close();
  // }, [setSocket]);
  
  // console.log('userApp', user);
  
  // useEffect(()=> {
  //   socket = io();

  //   socket.on('connect', (socket1) => {
  //     console.log('a user connected');
  //   });
    
  // }, [])

// console.log(socket);

  // const { ws } = useContext(WebSocketContext);


  
  return (
    // <WebSocketProvider>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/channels" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    // </WebSocketProvider>
  );
}

const mapStateToProps = state => {
  return ({ userAuth: state.user })
}

export default connect(mapStateToProps, { login })(App);
