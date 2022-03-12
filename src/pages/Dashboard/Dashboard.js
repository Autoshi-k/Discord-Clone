import React, { useEffect } from 'react';
import { SocketContext } from '../../context/socket';
import { initSocket, socket } from '../../Utilities/socket';

// Redux
import { useDispatch } from 'react-redux';
import { login } from '../../features/user';
import { fetchRooms, } from '../../features/rooms';
import { initFetch } from '../../features/friends';


// css
import './ChannelsHome.css';
import 'semantic-ui-css/semantic.min.css';

// Components
import ServerBar from '../../components/ServerBar';
import DirectMessages from '../../components/DirectMessages/DirectMessages';
import { changeLocation } from '../../features/location';



function Dashboard() {
  const dispatch = useDispatch();
  // let socket;
  // fetch user information
  useEffect(() => {
    // if (localStorage.getItem('auth-token')) return;
    fetch('/api/user', {
      method: 'GET',
      headers: {
        "content-type": "application/json",
        "Authorization": localStorage.getItem("auth-token"),
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.err) return;
      dispatch(login(data.user));
      dispatch(initFetch(data.connections));
      dispatch(fetchRooms(data.rooms));
      localStorage.setItem('user-data', JSON.stringify({ 
        id: data.user.id, 
        name: data.user.name, 
        tag: data.user.tag, 
        email: data.user.email 
      }));
    })
    .catch(err => console.log(err));
  }, [dispatch]);
  
  useEffect(() => {
    initSocket(dispatch);
  }, [dispatch])
  
  useEffect(() => {
    dispatch(changeLocation({ lobby: 'direct-messages', room: 'friends', subRoom: 'all' }));
  }, [dispatch])
  
  console.log('sockett !!! ',socket);
  return (
    <>
      <div className='dashboad'>
        <SocketContext.Provider value={ socket }>
          <ServerBar />
          <DirectMessages />
        </SocketContext.Provider>
      </div>
  </>
  )
}

export default Dashboard;