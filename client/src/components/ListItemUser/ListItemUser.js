import { Avatar, ListItemText } from "@mui/material";
import './ListItemUser.css';

// Redux
import { useDispatch } from "react-redux";
import { changeLocation } from '../../features/location';


export function ListItemUser({ room, name, image }) {
  const defaultAvatar = 'https://consequence.net/wp-content/uploads/2020/06/becky-kevin-james.jpg?quality=80';
  const dispatch = useDispatch();
  // when ill have servers ill need to make a condition
  // console.log(room);
  // room include roomID, userID
  const changeStateLocation = () => {
    console.log('becky');
    // dispatch(changeLocation({ lobby: 'private-messages', room }))
  };

  return (
    <div className="list-item-user" onClick={ () => changeStateLocation() }>
      <Avatar sx={{ height: 32, width: 32 }}>
        <img src={ image ? image : defaultAvatar } alt="discord" height="40" />
      </Avatar>
      {/* <div className="user-name">{ name }hii</div> */}
      <div className="user-name">hii</div>
    </div>
  )
}