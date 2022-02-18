import { useDispatch, useSelector } from "react-redux";
import WumpusWaitingForFriends from '../../../assets/WumpusWaitingForFriends.png';
import WumpusNoFriends from '../../../assets/WumpusNoFriends.png';
import WumpusBlocked from '../../../assets/WumpusBlocked.png';
import WumpusPending from '../../../assets/WumpusPending.png';
import { changeLocation } from "../../../features/location";

const NotFound = () => {
  const location = useSelector(state => state.location.value);
  const dispatch = useDispatch();
  console.log(WumpusWaitingForFriends);
  const objTest = {
    all: {
      src: WumpusWaitingForFriends,
      alt: 'No Friends Found',
      text: 'Wumpus is waiting on friends. You don\'t have to though!',
      button: true
    },
    online: {
      src: WumpusNoFriends,
      alt: 'No Friends Online',
      text: 'No one\'s around to play with Wumpus.'
    },
    pending: {
      src: WumpusPending,
      alt: 'No Pending Requests',
      text: 'There are no pending friend requests. Here\'s Wumpus for now.'
    },
    blocked: {
      src: WumpusBlocked,
      alt: 'No Blocked Users',
      text: 'You can\'t unblock the Wumpus.'
    }
  }
  if (location.subRoom === 'all') {
    return (
      <div>
        <img src={`${objTest[location.subRoom].src}`} alt={objTest[location.subRoom].alt} />
        <div>{objTest[location.subRoom].text}</div>
        { objTest[location.subRoom].button && 
        <button onClick={() => dispatch(changeLocation({ lobby: 'direct-messages', room: 'friends', subRoom: 'add-friend' }))}>
          Add Friend
        </button> }
      </div>
    )
  }

  return (
    <div className='not-found'>
      <div>No one's around to play with Wumpus.</div>
    </div>
  )
}

export default NotFound;