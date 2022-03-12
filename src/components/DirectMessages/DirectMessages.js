import { Divider } from "@mui/material";

// Components
import { Chat } from "../Chat/Chat";
import { Sidebar } from "../Sidebar";
import { ListItemUser } from "../ListItemUser";
import Friends from "../../pages/Friends/Friends";

// Redux
import { useDispatch, useSelector } from "react-redux";

function DirectMessages() {
  const rooms = useSelector(state => state.rooms.value);
  const location = useSelector(state => state.location.value);
  // console.log('location', location);
  const dispatch = useDispatch();

  const handleNoChat = () => {
    return [1,2,3,4,5,6,7,8,9,10,11,12].map(box => {
      return (
        <div key={box} className='empty-box'>
          <div className={`empty-avatar no-${box}`}></div>
          <div className={`empty-name no-${box}`}></div>
        </div>
      )
    })
  }
 
  return (
  <div className="direct-messages-window">
    <Sidebar> 
      <input type="text" placeholder="search or start a chat"/>
      <Divider />
      <div className="direct-to-friends-window">
        <ListItemUser key={9999999} room='friends' roomName='friends' />
      </div>
      <div className="users-list">
        <div className="sidebar-title">direct messages</div>
        { Object.keys(rooms).length ?
          Object.keys(rooms).map((key, index) => {
            const friend = rooms[key];
            return <ListItemUser 
              key={index} 
              room={friend.roomId} 
              roomName={friend.name}
              avatar={friend.avatar}
              statusId={friend.statusId}
            />
          })
        : <div className='no-chats'>{ handleNoChat() }</div>
        }
      </div>
    </Sidebar>
    {
      location.room === 'friends' ?
      <Friends />
      :
      <Chat />
    }
  </div>
  )
}

export default DirectMessages;