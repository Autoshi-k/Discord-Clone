import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NotFound from "../NotFound/NotFound";
import PendingItemList from '../PendingItemList/PendingItemList';

const FriendList = () => {
  const location = useSelector(state => state.location.value);
  const { friends, pending } = useSelector(state => state.friends.value);
  const [array, setArray] = useState([]);
  
  const handleSetArray = () => {
    const sub = location.subRoom;
    if (sub === 'pending') return pending;
    if (sub === 'online') return friends.filter(friend => friend.statusId);
    if (sub === 'all') return friends;
    if (sub === 'blocked') return [];
  }

  // location chaged so needs to change the array's values
  useEffect(() => {
    setArray(handleSetArray);
  }, [location.subRoom, friends, pending]);
  

  return (
    <>
      { array.length ? 
      <>
        <h2 className='friends-title'>{location.subRoom} - { array.length }</h2>
        <ul className='friend-page-list' >
          { array.map(request => <PendingItemList key={request.id} request={request} />) }
        </ul>
      </> 
      : <NotFound /> 
      }
      
    </>
  )
}

export default FriendList;