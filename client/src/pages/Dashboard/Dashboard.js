import React, { useEffect } from 'react';
import { login } from '../../features/user';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';

// css
import './ChannelsHome.css';
import 'semantic-ui-css/semantic.min.css';
import ServerBar from '../../components/ServerBar/ServerBar';
import DirectMessages from '../../components/DirectMessages/DirectMessages';

const socket = io();
// const socket = io('http//localhost:3001', { transports: ['websocket', 'polling'] });

function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/api/channels', {
      method: 'GET',
      headers: {
        "content-type": "application/json",
        "Authorization": localStorage.getItem("auth-token"),
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.err) { 
        console.log(data.err); 
        return;
      };
      dispatch(login(data[0]));
    })
  }, [])

  useEffect(() => {
    socket.on('connection', () => {
      console.log('connection have being made');
    })

    socket.on('disconnect', () => {
      console.log('user died');
    })
  }, [])
  
  return (
    <>
      <div className="dashboad">
        <ServerBar />
        <DirectMessages />
      </div>
  </>
  )
}

export default Dashboard;