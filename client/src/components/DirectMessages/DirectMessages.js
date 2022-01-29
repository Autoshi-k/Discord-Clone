import { Divider, ListItem, ListItemText } from "@mui/material";
import GroupsIcon from '@mui/icons-material/Groups';


// Components
import { Chat } from "../Chat/Chat";
import { Sidebar } from "../Sidebar/Sidebar";
import { ListItemUser } from "../ListItemUser/ListItemUser";
import FriendsWindow from '../FriendsWindow/FriendsWindow';

// Redux
import { useDispatch, useSelector } from "react-redux";
// import { addRoom } from '../../features/user';
import { useContext } from "react";
import { SocketContext } from "../../context/socket";
import { newRoom } from "../../features/rooms";
import { changeLocation } from "../../features/location";
// import { Link, Route, Routes } from "react-router-dom";

function DirectMessages() {
  const user = useSelector(state => state.user.value);
  const rooms = useSelector(state => state.rooms.value);
  const location = useSelector(state => state.location.value);

  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  // adding a new conversation
  const addCoversation = () => {
    const newConAdd = prompt('write your friend username & tag');
    if (newConAdd === null) return;
    // getting the promt and spliting it to username and tag
    const mark = newConAdd.indexOf('#');
    let displayName, tag;
    if (mark === -1) {
      displayName = newConAdd;
      tag = null; 
    } else {
      displayName = newConAdd.slice(0, mark);
      tag = newConAdd.slice(mark + 1);
    }
    fetch('/api/users/addConv', { 
      method: 'POST', 
      body: JSON.stringify({ displayName, tag }),
      headers: {
        "content-type": "application/json",
        "Authorization": localStorage.getItem("auth-token")
      }  
    })
    .then(res => res.json())
    .then(data => {
      if (data.err) console.log(data.err);
      dispatch(newRoom(data));
      socket.emit('add private room', data);
    })
  }
 
  return (
  <div className="direct-messages-window">
    <Sidebar> 
      <input type="text" placeholder="search or start a chat"/>
      <Divider />
        <div className="list-item-user direct-to-friends-window" onClick={ () => dispatch(changeLocation({ lobby: 'direct-messages', room: 'friends' })) }>
          <GroupsIcon fontSize='large'/> 
          <div>Friends</div>
        </div>
      <div className="users-list">
        <div className="sidebar-title" onClick={ () => addCoversation() }>direct messages</div>
        { Object.keys(rooms).length ?
          Object.keys(rooms).map((key, index) => {
            const otherParticipantId = Object.keys(rooms[key].participants).filter(participant => rooms[key].participants[participant]._id !== user._id) // will change later in case of multichat
            const toDisplay = rooms[key].participants[otherParticipantId];
            return <ListItemUser 
                    key={index} 
                    room={key} 
                    displayName={toDisplay.displayName}
                    image={toDisplay.image}
                    currentStatus={toDisplay.currentStatus}
                  />
              })
        : <div style={{ flex: 1 }}></div>
        }
      </div>
    </Sidebar>
    {
      location.room === 'friends' ?
      <FriendsWindow />
      :
      <Chat />
    }
  </div>
  )
}

export default DirectMessages;