import { Divider, ListItem } from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

// Components
import { Chat } from "../Chat/Chat";
import { Sidebar } from "../Sidebar/Sidebar";
import { ListItemUser } from "../ListItemUser/ListItemUser";

import './DirectMessages.css'
// Redux
import { useDispatch, useSelector } from "react-redux";
// import { addRoom } from '../../features/user';
import { useContext } from "react";
import { SocketContext } from "../../context/socket";
// import { Link, Route, Routes } from "react-router-dom";

function DirectMessages() {
  const user = useSelector(state => state.user.value);
  const messages = useSelector(state => state.messages.value);

  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  // adding a new conversation
  const addCoversation = () => {
    console.log('hello brother')
    // const newConAdd = prompt('write your friend username & tag');
    // if (newConAdd === null) return;
    // // getting the promt and spliting it to username and tag
    // const mark = newConAdd.indexOf('#');
    // let displayName, tag;
    // if (mark === -1) {
    //   displayName = newConAdd;
    //   tag = null; 
    // } else {
    //   displayName = newConAdd.slice(0, mark);
    //   tag = newConAdd.slice(mark + 1);
    // }
    // fetch('/api/users/addConv', { 
    //   method: 'POST', 
    //   body: JSON.stringify({ displayName, tag }),
    //   headers: {
    //     "content-type": "application/json",
    //     "Authorization": localStorage.getItem("auth-token")
    //   }  
    // })
    // .then(res => res.json())
    // .then(data => {
    //   if (data.err) console.log(data.err);
    //   dispatch(addRoom(data.newRoom));
    //   socket.emit('add private room', data.newRoom._id);
    // })
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
        { messages.length ?
          messages.rooms.map((room, index) => {
          const userToDisplay = room.participants[0].id === user.id ? room.participants[1] : room.participants[0];
          return (
            // <Link to={ `/@me/${room._id}` }>
              <ListItemUser key={ room._id } room={{ roomId: room._id, userId: userToDisplay.id }} name={userToDisplay.displayName } image={ userToDisplay.image } />
            // </Link>
          )
        })
        : <div style={{ flex: 1 }}></div>
        }
      </div>
    </Sidebar>
    <Chat />
    {/* <Routes>
      <Route path={'channels/@me/:roomId'} element={<Chat />} />
    </Routes> */}
  </div>
  )
}

export default DirectMessages;