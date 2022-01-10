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
    const username = newConAdd.slice(0, mark);
    const tag = newConAdd.slice(mark + 1);
    fetch('/api/users/addConv', { 
      method: 'POST', 
      body: JSON.stringify({ username, tag }),
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
        { user.conversetions.map((conv, index) => <ListItemUser key={ index } name={conv.nickname } image="http://d279m997dpfwgl.cloudfront.net/wp/2021/11/LukeCrywalkerMain_01_00480-1000x563.jpg" />)}
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