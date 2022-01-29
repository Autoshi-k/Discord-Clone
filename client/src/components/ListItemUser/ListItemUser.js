import { Avatar } from "@mui/material";
import online from '../../assets/online.png';
import idle from '../../assets/idle.png';

// Redux
import { useDispatch } from "react-redux";
import { changeLocation } from '../../features/location';


import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
// import Stack from '@mui/material/Stack';

const SmallAvatar = styled(Avatar)(() => ({
  width: 17,
  height: 17,
  backgroundColor: '#2F3136',
  border: `3px solid #2F3136`,
}));


export function ListItemUser({ room, displayName, image, currentStatus }) {
  const defaultAvatar = 'https://consequence.net/wp-content/uploads/2020/06/becky-kevin-james.jpg?quality=80';
  const dispatch = useDispatch();
  // when ill have servers ill need to make a condition
  // room include roomID, userID
  const changeStateLocation = () => {
    dispatch(changeLocation({ lobby: 'direct-messages', room }))
  };


  
  return (
    <div className="list-item-user" onClick={ () => changeStateLocation() }>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <SmallAvatar alt="Remy Sharp" src={currentStatus ? online : idle} height="10" />
        }
      >
        <Avatar sx={{ height: 32, width: 32 }}>
          <img src={ image ? image : defaultAvatar } alt="discord" height="34" />
        </Avatar>
      </Badge>
      <div className="user-name">{displayName}</div>
    </div>
  )
}