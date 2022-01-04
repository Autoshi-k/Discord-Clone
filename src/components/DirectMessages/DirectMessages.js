import { Chat } from "../Chat/Chat";
import { Sidebar } from "../Sidebar/Sidebar";
import { PeopleAltIcon } from '@mui/icons-material/PeopleAlt';
import { Divider, ListItem } from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { ListItemUser } from "../ListItemUser/ListItemUser";

import './DirectMessages.css'

function DirectMessages() {

  const friends = [1, 2];
  return (
  <div className="direct-messages-window">
    <Sidebar> 
      <input type="text" placeholder="search or start a chat"/>
      <Divider />
      <ListItem>
        <DeleteOutlinedIcon /> <div>Friends</div>
      </ListItem>
      <div className="users-list">
        <div className="sidebar-title">direct messages</div>
        {friends.map((use, index) => <ListItemUser key={ index } name="IS" image="http://d279m997dpfwgl.cloudfront.net/wp/2021/11/LukeCrywalkerMain_01_00480-1000x563.jpg" />)}
      </div>
      
    </Sidebar>
    <Chat />
  </div>
  )
}

export default DirectMessages;