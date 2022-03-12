import { useDispatch, useSelector } from "react-redux";
import PageHeader from "../../components/PageHeader/PageHeader";

import { useEffect } from "react";
import AddFriend from './AddFriend/AddFriend';
import FriendList from "./FriendsList/FriendList";
import { changeLocation } from "../../features/location";
const Friends = () => {

  const location = useSelector(state => state.location.value);
  const friends = useSelector(state => state.friends.value);
  const dispatch = useDispatch();
  
  // need to fix this use effect
  useEffect(() => {
    if (friends.length) return;
    dispatch(changeLocation({ room: 'friends', subRoom: 'add-friend' }));
  }, [friends, dispatch])

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
    </div>
  )
}

export default Friends;