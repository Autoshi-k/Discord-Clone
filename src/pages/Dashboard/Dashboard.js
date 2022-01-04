import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

// css
import './ChannelsHome.css';
import 'semantic-ui-css/semantic.min.css';
import ServerBar from '../../components/ServerBar/ServerBar';
import DirectMessages from '../../components/DirectMessages/DirectMessages';
import { login } from '../../actions';

function Dashboard({ userAuth }) {
  // console.log(userAuth);
  useEffect(() => {
    console.log('useEffect fetch');
    fetch('/api/channels/', { method: 'GET', headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("auth-token")
    } })
    .then(res => res.json())
    .then(data => login(data))
    .catch(err => console.log(err))
    // .then(data => console.log(data))
  }, [])

  console.log(userAuth);
  return (
    <>
      <div className="dashboad">
        <ServerBar />
        <DirectMessages />
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {userAuth: state}
}

export default connect(mapStateToProps, { login })(Dashboard);