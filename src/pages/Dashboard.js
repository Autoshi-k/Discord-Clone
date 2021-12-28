import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

// css
import './ChannelsHome.css';
import 'semantic-ui-css/semantic.min.css';
import ServerBar from '../components/ServerBar/ServerBar';
import DirectMessages from '../components/DirectMessages/DirectMessages';
import {WebSocketContext} from '../socketwebContext';
import { login } from '../actions';

function Dashboard({ userAuth }) {
  // const { socket } = useContext(WebSocketContext);
  // console.log(socket)
  
  return (
    <>
      {/* { userAuth.user === null && <Navigate to="/Login" /> } */}
      <div className="dashboad">
        <ServerBar />
        <DirectMessages />
        {/* this is the dashbord */}
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {userAuth: state}
}

export default connect(mapStateToProps, { login })(Dashboard);