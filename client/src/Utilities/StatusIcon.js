import { Avatar, Badge } from "@mui/material";
import { styled } from '@mui/material/styles';

import offline from '../assets/offline.png';
import online from '../assets/online.png';
import idle from '../assets/idle.png';
import notDisturb from '../assets/notDisturb.png';

const SmallAvatar = styled(Avatar)(() => ({
  width: 17,
  height: 17,
  backgroundColor: '#2F3136',
  border: `3px solid #2F3136`,
}));

const StatusIcon = ({badge, currentStatus, image, alt}) => {

  const mapStatus = [offline, online, idle, notDisturb];

  return (
    <>
    {
      badge ? 
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          // <SmallAvatar alt="Remy Sharp" src={ currentStatus ? online : idle } height="10" />
          <SmallAvatar alt="Remy Sharp" src={ mapStatus[currentStatus] } height="10" />
        }
      >
        <Avatar sx={{ height: 32, width: 32 }} src={image} alt={ alt } />
      </Badge>
      :
      <Avatar sx={{ height: 10, width: 10 }} src={ mapStatus[currentStatus] } alt={ alt } height='10'/>
    }
      
    </>
  )
}

export default StatusIcon;