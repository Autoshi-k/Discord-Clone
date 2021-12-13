import discordImage from '../../discord-image.png';
import Avatar from '@mui/material/Avatar';

import './ServerIcon.css';  

export function ServerIcon({ iconStyle, isActive, size }) {
  
  return (
    <div className={ `server-icon ${isActive}` }>
      
      
      <Avatar sx={{ backgroundColor: '#36393f', width: 48, height: 48 }} variant="square">
        <img src={ discordImage } alt="discord" />
      </Avatar>
    </div>
  )
}