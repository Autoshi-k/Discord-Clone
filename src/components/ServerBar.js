import React, { useState } from 'react';
import { ServerIcon } from './ServerIcon';
import Divider from '@mui/material/Divider';

export default function ServerBar() {
  const [chatRoom, setChatRoom] = useState('direct-messages');
  const handleServerClick = (e) => {
    setChatRoom(e);
  }
  return (
    <div className="server-bar">
      <ServerIcon iconStyle="rounded" isActive={chatRoom === 'direct-messages' ? "active" : null} id="direct-messages" handleServerClick={handleServerClick} />
      <Divider />
      <ServerIcon iconStyle="circular" isActive={chatRoom === '988887' ? "active" : null} id="988887" handleServerClick={handleServerClick} />
      <ServerIcon iconStyle="circular" id="988774" handleServerClick={handleServerClick} />
      <ServerIcon iconStyle="circular" id="982097" handleServerClick={handleServerClick} />
      <ServerIcon iconStyle="circular" id="112987" handleServerClick={handleServerClick} />
    </div>
  )
}
