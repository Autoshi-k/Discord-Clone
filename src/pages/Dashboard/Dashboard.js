import React, { useEffect } from 'react';
import { SocketContext } from '../../context/socket';
import { initSocket, socket, Socket } from '../../Utilities/socket';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/user';
import { pendingFetch, newFriendRequests, removeFriendRequest } from '../../features/pending';
import { addNewMessage, fetchRooms, newRoom, updateStatus } from '../../features/rooms';
import { addFriend, friendsFetch } from '../../features/friends';


// css
import './ChannelsHome.css';
import 'semantic-ui-css/semantic.min.css';

// Components
import ServerBar from '../../components/ServerBar/ServerBar';
import DirectMessages from '../../components/DirectMessages/DirectMessages';
import { io } from 'socket.io-client';


// let socket; // io({ auth: { userId: JSON.parse(localStorage.getItem('user-data')).id } });

function Dashboard() {
  // socket = io('127.0.0.1:3001/', { auth: { userId: JSON.parse(localStorage.getItem('user-data')).id } });
  // socket = io('127.0.0.1:3001/', { transports: ['websocket'], auth: { userId: JSON.parse(localStorage.getItem('user-data')).id } });
  const dispatch = useDispatch();

  // fetch user information
  useEffect(() => {
    fetch('/api/user', {
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
      dispatch(login(data.user));
      dispatch(pendingFetch(data.pending));
      dispatch(friendsFetch(data.friends));
      dispatch(fetchRooms(data.rooms));
      socket.emit('change my status', data.user.currentStatus ? data.user.currentStatus : 1);
      // check if local storage match to the user who is currently logged in
      if (data.user._id === localStorage.getItem('user-data').id) return;
      localStorage.setItem('user-data', JSON.stringify({ id: data.user.id, name: data.user.name, tag: data.user.tag }));
      localStorage.setItem('email', data.user.email);
    })
  }, []);

  // socket.on ????
  useEffect(() => {
    initSocket(dispatch);
  }, [dispatch])

  return (
    <>
      <div className="dashboad">
        <SocketContext.Provider value={ socket }>
          <ServerBar />
          <DirectMessages />
        </SocketContext.Provider>
      </div>
  </>
  )
}

export default Dashboard;