import React, { useEffect } from 'react';
import { SocketContext } from '../../context/socket';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/user';

// css
import './ChannelsHome.css';
import 'semantic-ui-css/semantic.min.css';
import ServerBar from '../../components/ServerBar/ServerBar';
import DirectMessages from '../../components/DirectMessages/DirectMessages';
import { io } from 'socket.io-client';
import { addNewMessage, fetchOldRooms, updateStatus } from '../../features/rooms';


let socket; // io({ auth: { userId: JSON.parse(localStorage.getItem('user-data')).id } });

function Dashboard() {
  socket = io({ auth: { userId: JSON.parse(localStorage.getItem('user-data')).id } });

  const dispatch = useDispatch();
  const location = useSelector(state => state.location.value);
  
  // getting the user information and changing the state/localstorage
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
      dispatch(login(data.user));
      dispatch(fetchOldRooms(data.objRooms));
      socket.emit('change my status', data.user.currentStatus ? data.user.currentStatus : 1);
      // check if local storage match to the user who is currently logged in
      if (data.user._id === localStorage.getItem('user-data').id) return;
      localStorage.setItem('user-data', JSON.stringify({ id: data.user._id, displayName: data.user.displayName, tag: data.user.tag }));
      localStorage.setItem('email', data.user.email);
    })
  }, []);


  useEffect(() => {
    socket.on("connect", () => {
      
      socket.on('success send new message', ({ roomId, newMessage }) => {
        const newMessageObj = { roomId, message: newMessage };
        dispatch(addNewMessage(newMessageObj))
      })
      
      socket.on('user changed status', ({ userId, newStatus }) => {
        dispatch(updateStatus({ userId, newStatus }))
      })

    });
  }, []);

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