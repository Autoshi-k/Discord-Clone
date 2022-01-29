// Redux
import { useDispatch } from "react-redux";
import { changeLocation } from '../../features/location';

import StatusIcon from "../../Utilities/StatusIcon";
// import Stack from '@mui/material/Stack';

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
      <StatusIcon 
        badge={true}
        currentStatus={currentStatus}
        alt={displayName}
        image={image}
      />
      <div className="user-name">{displayName}</div>
    </div>
  )
}