import { Chat } from "../Chat/Chat";
import { Sidebar } from "../Sidebar/Sidebar";
import { PeopleAltIcon } from '@mui/icons-material/PeopleAlt';
import { Divider, ListItem } from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { ListItemUser } from "../ListItemUser/ListItemUser";

import './DirectMessages.css'
import { useSelector } from "react-redux";

function DirectMessages() {
  const user = useSelector(state => state.user.value);
  const status = useSelector(state => state.user.status);

  // adding a new conversation
  const addCoversation = () => {
    const newConAdd = prompt('write your friend username & tag');
    // getting the promt and spliting it to username and tag
    const mark = newConAdd.indexOf('#');
    let displayName, tag;
    // if there is no #, mark is the whole displayName, else split tag and name
    // const displayName = mark === -1 ? newConAdd : newConAdd.slice(0, mark);
    if (mark === -1) {
      displayName = newConAdd;
      tag = null; 
    } else {
      displayName = newConAdd.slice(0, mark);
      tag = newConAdd.slice(mark + 1);
    }
    console.log(displayName);
    console.log(tag);
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
      if (data.err) console.log('need to do somethig');
      
    })
  }

  console.log(user);
  return (
  <div className="direct-messages-window">
    <Sidebar> 
      <input type="text" placeholder="search or start a chat"/>
      <Divider />
      <ListItem>
        <DeleteOutlinedIcon /> <div>Friends</div>
      </ListItem>
      { status ?  
      <div className="users-list">
        <div className="sidebar-title" onClick={ () => addCoversation() }>direct messages</div>
        { user.conversations.map((conv, index) => <ListItemUser key={ index } name={conv.displayName } image={ conv.image } />)}
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