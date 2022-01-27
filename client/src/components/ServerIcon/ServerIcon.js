import discordImage from '../../discord-image.png';
import Avatar from '@mui/material/Avatar';

export function ServerIcon({ iconStyle, isActive, id, handleServerClick }) {
  
  return (
    <div className='server-icon-container'>
      <div className='server-state'></div>
      <div className={ `server-icon ${isActive}` } onClick={() => handleServerClick(id)}>
      <Avatar sx={{ backgroundColor: '#36393f', width: 48, height: 48 }} variant="square">
        <img src={ discordImage } alt="discord" />
      </Avatar>
    </div>
  </div>
  )
}