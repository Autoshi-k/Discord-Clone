import React, { useEffect } from 'react';
import { SocketContext } from '../../context/socket';
import { initSocket, socket } from '../../Utilities/socket';
// Redux
import { useDispatch } from 'react-redux';
import { login } from '../../features/user';
import { pendingFetch } from '../../features/pending';
import { fetchRooms, } from '../../features/rooms';
import { friendsFetch, initFetch } from '../../features/friends';


// css
import './ChannelsHome.css';
import 'semantic-ui-css/semantic.min.css';

// Components
import ServerBar from '../../components/ServerBar/ServerBar';
import DirectMessages from '../../components/DirectMessages/DirectMessages';

function Dashboard() {
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
      dispatch(initFetch(data.connections));
      dispatch(fetchRooms(data.rooms));
      // check if local storage match to the user who is currently logged in
      if (data.user.id === localStorage.getItem('user-data').id) return;
      localStorage.setItem('user-data', JSON.stringify({ id: data.user.id, name: data.user.name, tag: data.user.tag }));
      localStorage.setItem('email', data.user.email);
    })
  }, [dispatch]);

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