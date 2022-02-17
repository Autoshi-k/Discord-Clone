import { useDispatch, useSelector } from "react-redux";
import PageHeader from "../../components/PageHeader/PageHeader";

// import WumpusWaitingForFriends from '../../assets/WumpusWaitingForFriends.png';
import { useContext } from "react";
import { SocketContext } from "../../context/socket";
import AddFriend from './AddFriend/AddFriend';
import FriendItemList from "./PendingItemList/PendingItemList";
import FriendList from "./FriendsList/FriendList";
const Friends = () => {
  // while in friends - location have subRoom (auto 'all')
  const location = useSelector(state => state.location.value);

  // add this later when users can have friends
  // useEffect(() => {
  //   // if (relationships.friends.length) return;
  //   // dispatch(changeLocation({ lobby: 'direct-messages', room: 'friends', subRoom: 'add-friend' }));
  // }, [])

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