import React from 'react';
// import './ChannelsHome.css';
import ServerBar from '../components/ServerBar/ServerBar';
import DirectMessages from '../components/DirectMessages/DirectMessages';
import 'semantic-ui-css/semantic.min.css';


function ChannelsHome() {

  return (
    <div className="home-page">
        <>
          <ServerBar />
          <DirectMessages />
        </>
    </div>
  );
}

export default ChannelsHome;
