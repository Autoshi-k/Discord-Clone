import { Chat } from "../Chat/Chat";
import { Sidebar } from "../Sidebar/Sidebar";
import { Divider, ListItem } from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { ListItemUser } from "../ListItemUser/ListItemUser";

import './DirectMessages.css'
import { useDispatch, useSelector } from "react-redux";
import { addRoom } from '../../features/user';

function DirectMessages({ socket, newRoom }) {
  const user = useSelector(state => state.user.value);

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
      dispatch(addRoom(data.newRoom));
    })
  }
  return (
  <div className="direct-messages-window">
    <Sidebar> 
      <input type="text" placeholder="search or start a chat"/>
      <Divider />
      <ListItem>
        <DeleteOutlinedIcon /> <div>Friends</div>
      </ListItem>
      <div className="users-list">
        <div className="sidebar-title" onClick={ () => addCoversation() }>direct messages</div>
        { user.rooms.private.length ?
          user.rooms.private.map((room, index) => {
          const userToDisplay = room.participants[0].id === user.id ? room.participants[1] : room.participants[0];
          return <ListItemUser key={ userToDisplay.id } name={userToDisplay.displayName } image={ userToDisplay.image } />
        })
        : <div style={{ flex: 1 }}></div>
        }
      </div>
    </Sidebar>
    <Chat />
  </div>
  )
}

export default DirectMessages;