import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../../context/socket';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/user';
import { addNewMessage } from '../../features/newMessages';

// css
import './ChannelsHome.css';
import 'semantic-ui-css/semantic.min.css';
import ServerBar from '../../components/ServerBar/ServerBar';
import DirectMessages from '../../components/DirectMessages/DirectMessages';
import { io } from 'socket.io-client';


let socket; // io({ auth: { userId: JSON.parse(localStorage.getItem('user-data')).id } });

function Dashboard() {
  socket = io({ auth: { userId: JSON.parse(localStorage.getItem('user-data')).id } });

  const dispatch = useDispatch();
  const location = useSelector(state => state.location.value);
  
  console.log('dashboard');
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
      const objData = data[0];
      dispatch(login(objData));
      // check if local storage match to the user who is currently logged in
      if (objData.id === localStorage.getItem('user-data').id) return;
      localStorage.setItem('user-data', JSON.stringify({ id: objData.id, displayName: objData.displayName, tag: objData.tag }));
      localStorage.setItem('email', objData.email);
    })
  }, []);


  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id); 

      socket.on('show number', number => {
        alert(number);
      })
    
      socket.on('test', ({ newMessage, toSocketId }) => {
        console.log('beckyyyy');
        console.log(newMessage);
        // console.log(toSocketId);
        dispatch(addNewMessage({ room: location, message: newMessage }))
        // setNewMessages([...newMessagesRef.current, newMessage]);
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