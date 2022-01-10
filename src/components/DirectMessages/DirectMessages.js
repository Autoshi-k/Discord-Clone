import { Chat } from "../Chat/Chat";
import { Sidebar } from "../Sidebar/Sidebar";
import { PeopleAltIcon } from '@mui/icons-material/PeopleAlt';
import { Divider, ListItem } from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { connect } from 'react-redux';

import { ListItemUser } from "../ListItemUser/ListItemUser";

import './DirectMessages.css'

function DirectMessages({ userAuth }) {
  console.log(userAuth);
  const friends = [1, 2];
  const Authorization = localStorage.getItem("auth-token");
  console.log(Authorization);

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
  return (
  <div className="direct-messages-window">
    <Sidebar> 
      <input type="text" placeholder="search or start a chat"/>
      <Divider />
      <button onClick={ () => {console.log(userAuth)} }>click me</button>
      <ListItem>
        <DeleteOutlinedIcon /> <div>Friends</div>
      </ListItem>
      <div className="users-list">
        <div className="sidebar-title" onClick={ () => addCoversation() }>direct messages</div>
        {friends.map((use, index) => <ListItemUser key={ index } name="IS" image="http://d279m997dpfwgl.cloudfront.net/wp/2021/11/LukeCrywalkerMain_01_00480-1000x563.jpg" />)}
      </div>
      
    </Sidebar>
    <Chat />
  </div>
  )
}

const mapStateToProps = (state) => {
  // return ({ conversations: state.user?.conversetions })
  console.log(state);
  return ({ userAuth: state })
}

export default connect(mapStateToProps)(DirectMessages);