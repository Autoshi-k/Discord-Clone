import { useSelector } from "react-redux";
import PendingItemList from "../PendingItemList/PendingItemList";
import FriendItemList from "../FriendListItem/FriendListItem";


const FriendList = () => {
  const location = useSelector(state => state.location.value);
  const pendingRequests = useSelector(state => state.pendingRequests.value);
  const friends = useSelector(state => state.friends.value);

  const friendsFiltered = location.subRoom === 'all' ? friends : friends.filter(friend => friend.status);

  return (
    <ul className='friend-page-list'>
      {
        location.subRoom === 'pending' ?
        pendingRequests.map(request => <PendingItemList request={request} />)
        : friendsFiltered.map(friend => <FriendItemList request={friend} />)
      }
    </ul>
  )
}

export default FriendList;