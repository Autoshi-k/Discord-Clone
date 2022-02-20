// Redux
import { useDispatch, useSelector } from "react-redux";
import { changeLocation } from '../../features/location';
import StatusIcon from "../../Utilities/StatusIcon";

import GroupsIcon from '@mui/icons-material/Groups';

// import Stack from '@mui/material/Stack';

export function ListItemUser({ room, roomName, avatar, statusId }) {
  const location = useSelector(state => state.location.value);
  const dispatch = useDispatch();
  // when ill have servers ill need to make a condition
  // room include roomID, userID
  const changeStateLocation = () => {
    dispatch(changeLocation({ lobby: 'direct-messages', room, subRoom: 'online' }))
  };


  
  return (
    <div className={`list-item-user ${location.room === room ? 'active' : ''}`} onClick={ () => changeStateLocation() }>
      {
        room === 'friends' ?
        <GroupsIcon fontSize='large'/> 
        :
        <StatusIcon 
        badge={true}
        currentStatus={statusId}
        alt={roomName}
        image={avatar}
      />
      }
      <div className="user-name">{roomName}</div>
    </div>
  )
}