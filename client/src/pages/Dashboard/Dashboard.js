import React, { useContext, useEffect, useState } from 'react';
import { login } from '../../features/user';
import { useDispatch, useSelector } from 'react-redux';

// css
import './ChannelsHome.css';
import 'semantic-ui-css/semantic.min.css';
import ServerBar from '../../components/ServerBar/ServerBar';
import DirectMessages from '../../components/DirectMessages/DirectMessages';

function Dashboard() {
  const user = useSelector(state => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/api/channels', {
      method: 'GET',
      headers: {
        "content-type": "application/json",
        "Authorization": localStorage.getItem("auth-token"), // need to add state - when i get 401 need to navigate
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.err) { 
        console.log(data.err); 
        return;
      };
      console.log(data);
      dispatch(login(data[0]));
    })
  }, [])
  
  return (
    <>
      {/* <div>{ user.tag }</div> */}
      <div className="dashboad">
        <ServerBar />
        <DirectMessages />
      </div>
  </>
  )
}

export default Dashboard;