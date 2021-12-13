import React from 'react'
import { ServerIcon } from '../ServerIcon/ServerIcon'
import Divider from '@mui/material/Divider';

import './ChannelsBar.css';

export default function ChannelsBar() {
  return (
    <div className="channels-bar">
      <ServerIcon iconStyle="rounded" isActive="active"/>
      <Divider />
      <ServerIcon iconStyle="circular" />
      <ServerIcon iconStyle="circular" />
      <ServerIcon iconStyle="circular" />
      <ServerIcon iconStyle="circular" />
    </div>
  )
}
