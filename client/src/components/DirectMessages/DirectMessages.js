import { Chat } from "../Chat/Chat";
import { Sidebar } from "../Sidebar/Sidebar";
import { Divider, ListItem } from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { ListItemUser } from "../ListItemUser/ListItemUser";

import './DirectMessages.css'
import { useDispatch, useSelector } from "react-redux";

function DirectMessages({ socket, newRoom }) {
  const user = useSelector(state => state.user.value);
  const rooms = useSelector(state => state);
  // const status = useSelector(state => state.user.status);

  const dispatch = useDispatch();


  // adding a new conversation
  const addCoversation = () => {
    const newConAdd = prompt('write your friend username & tag');
    // getting the promt and spliting it to username and tag
    const mark = newConAdd.indexOf('#');
    let displayName, tag;
    // if there is no #, mark is the whole displayName, else split tag and name
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
    })
  }
  console.log(rooms);
  console.log(user);
  return (
  <div className="direct-messages-window">
    <Sidebar> 
      <input type="text" placeholder="search or start a chat"/>
      <Divider />
      <ListItem>
        <DeleteOutlinedIcon /> <div>Friends</div>
      </ListItem>
      { user.value.rooms.private.length ?  
      <div className="users-list">
        <div className="sidebar-title" onClick={ () => addCoversation() }>direct messages</div>
        { rooms.private.map((room, index) => <ListItemUser key={ index } name={room.displayName } image={ room.image } />)}
      </div>
      :
      null
      }
    </Sidebar>
    <Chat />
  </div>
  )
}

export default DirectMessages;