import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Routes, Route, Navigate } from "react-router-dom";
// import ChannelsHome from './pages/ChannelsHome';
// import WebSocketProvider from './socketwebContext';

// Redux
import { connect } from 'react-redux';
import { login } from './actions';
// Pages
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
// import socketIOClient from 'socket.io-client';

// export const getUserSessionFromServer = async () => {
//   const res = await fetch('/api/user');
//   const data = await res.json();
//   console.log(data);
//   login(data);
//   console.log('data from getSession');
// }

function App({ userAuth }) {
  console.log('app run');

  // const [response, setResponse] = useState("");

  // useEffect(() => {
  //   const socket = socketIOClient('/');
  //   socket.on('connect', data => {
  //     setResponse(data);
  //   });

  //   // clean up the socket
  //   return () => socket.disconnect();
  // }, []);

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


  console.log(userAuth);
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
