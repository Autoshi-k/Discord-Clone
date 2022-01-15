import React, { useEffect } from 'react';
import { login } from '../../features/user';
import { useDispatch } from 'react-redux';

// css
import './ChannelsHome.css';
import 'semantic-ui-css/semantic.min.css';
import ServerBar from '../../components/ServerBar/ServerBar';
import DirectMessages from '../../components/DirectMessages/DirectMessages';

function Dashboard() {
  const dispatch = useDispatch();

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
  }, [])

  // useEffect(() => {
  //   socket.on('connection', () => {
  //     console.log('connection have being made');
  //   })

  //   return () => {
  //     socket.on('disconnect', () => {
  //     console.log('user died');
  //     })
  //   }
  // }, [])
  
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