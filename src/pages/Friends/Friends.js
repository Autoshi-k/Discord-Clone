import { useDispatch, useSelector } from "react-redux";
import PageHeader from "../../components/PageHeader/PageHeader";

// import WumpusWaitingForFriends from '../../assets/WumpusWaitingForFriends.png';
import { useContext, useEffect } from "react";
import { SocketContext } from "../../context/socket";
import AddFriend from './AddFriend/AddFriend';
import FriendItemList from "./PendingItemList/PendingItemList";
import FriendList from "./FriendsList/FriendList";
import { changeLocation } from "../../features/location";
const Friends = () => {

  const location = useSelector(state => state.location.value);
  const friends = useSelector(state => state.friends.value);
  const dispatch = useDispatch();
  
  // need to fix this use effect
  useEffect(() => {
    if (friends.length) return;
    dispatch(changeLocation({ lobby: 'direct-messages', room: 'friends', subRoom: 'add-friend' }));
  }, [friends])

  return (
    <div className="friends-page">
      <PageHeader />
      {
        location.subRoom && 
        <div className={`friends-${location.subRoom}`}>
          { location.subRoom === 'add-friend' ? <AddFriend /> 
            : <ul className='friend-page-list'>{ <FriendList /> }</ul>
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