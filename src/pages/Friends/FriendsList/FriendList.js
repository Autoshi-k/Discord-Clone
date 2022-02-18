import { useSelector } from "react-redux";
import NotFound from "../NotFound/NotFound";
import PendingItemList from "../PendingItemList/PendingItemList";

const FriendList = () => {
  const location = useSelector(state => state.location.value);
  const pendingRequests = useSelector(state => state.pendingRequests.value);
  const friends = useSelector(state => state.friends.value);

  const array = location.subRoom === 'pending' ? pendingRequests : location.subRoom === 'all' ? friends : friends.filter(friend => friend.status);

  return (
    <>
      { array.length ? 
      <>
        <h2 className='friends-title'>{location.subRoom} - { array.length }</h2>
        <ul className='friend-page-list'>
          { array.map(request => <PendingItemList key={request.id} request={request} />) }
        </ul>
      </> 
      : <NotFound /> 
      }
      
    </>
  )
}

export default FriendList;