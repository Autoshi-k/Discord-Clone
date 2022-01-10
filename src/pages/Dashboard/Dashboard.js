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
      dispatch(login(data));
    })
  }, [])
  
  
  
  // const [killme, setKillme] = useState(false);
  // useEffect(() => {
  //   setKillme(true);
  //   console.log('useEffect kill');
  // }, [])

  // useEffect(() => {
  //   if (!killme) return;
  //   console.log('hi');
  //   fetch('/api/channels', { 
  //     method: 'GET', 
  //     headers: {
  //       "content-type": "application/json",
  //       Authorization: localStorage.getItem("auth-token")
  //     } })
  //     .then(res => res.json())
  //     .then(data => { 
  //       login(data[0]);
  //       console.log('hello from deshboard')
  //       console.log(data[0])
  //     })
  //     .catch(err => console.log(err))
  // }, [killme])
  return (
    <>
      <div>{ user.tag }</div>
      <div className="dashboad">
        {/* <ServerBar /> */}
        {/* <DirectMessages /> */}
      </div>
  </>
  )
}

export default Dashboard;