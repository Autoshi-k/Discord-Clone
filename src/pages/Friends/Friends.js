import { useDispatch, useSelector } from "react-redux";
import PageHeader from "../../components/PageHeader/PageHeader";

import WumpusWaitingForFriends from '../../assets/WumpusWaitingForFriends.png';
import { useContext } from "react";
import { changeLocation } from "../../features/location";
import { SocketContext } from "../../context/socket";
import user from "../../features/user";
import AddFriend from './AddFriend/AddFriend';
import FriendItemList from "./FriendItemList/FriendItemList";
const Friends = () => {
  
  const socket = useContext(SocketContext);
  // while in friends - location have subRoom (auto 'all')
  const user = useSelector(state => state.user.value);
  const location = useSelector(state => state.location.value);
  const pendingRequests = useSelector(state => state.pendingRequests.value);
  
  const dispatch = useDispatch();


  // add this later when users can have friends
  // useEffect(() => {
  //   // if (relationships.friends.length) return;
  //   // dispatch(changeLocation({ lobby: 'direct-messages', room: 'friends', subRoom: 'add-friend' }));
  // }, [])

  const showPageContent = () => {
    if (location.subRoom === 'pending') {
      pendingRequests.map(request => {
        <FriendItemList isSender={request.sender === user.id} request={request} />
      })
    }
  }

  
  return (
    <div className="friends-page">
      <PageHeader />
      {
        location.subRoom && 
        <div className={`friends-${location.subRoom}`}>
          { location.subRoom === 'add-friend' && <AddFriend /> }
          { pendingRequests && location.subRoom === 'pending' && pendingRequests.length ?
            <ul className='friend-page-list'>
              { pendingRequests.map(request => {
              return <FriendItemList isSender={request.senderId === user.id} request={request} />
              })   
              }
            </ul>
          : null 
          }
        </div>
      }
        {/* <div className="friends-online">
          <div class="not-found">
            <img src={WumpusNoFriends} alt="No Friends Found"/>
            <div>No one's around to play with Wumpus.</div>
          </div>
        </div> */}
    </div>
  )
}

export default Friends;