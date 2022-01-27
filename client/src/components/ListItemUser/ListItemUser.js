import { Avatar } from "@mui/material";

// Redux
import { useDispatch } from "react-redux";
import { changeLocation } from '../../features/location';


export function ListItemUser({ room, displayName, image }) {
  const defaultAvatar = 'https://consequence.net/wp-content/uploads/2020/06/becky-kevin-james.jpg?quality=80';
  const dispatch = useDispatch();
  // when ill have servers ill need to make a condition
  // console.log(room);
  // room include roomID, userID
  const changeStateLocation = () => {
    dispatch(changeLocation({ lobby: 'direct-messages', room }))
  };

  return (
    <div className="list-item-user" onClick={ () => changeStateLocation() }>
      <Avatar sx={{ height: 32, width: 32 }}>
        <img src={ image ? image : defaultAvatar } alt="discord" height="40" />
      </Avatar>
      <div className="user-name">{displayName}</div>
    </div>
  )
}