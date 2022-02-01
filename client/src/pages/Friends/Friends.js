import { useSelector } from "react-redux";
import PageHeader from "../../components/PageHeader/PageHeader";
import { Divider } from "@mui/material";

import WumpusNoFriends from '../../assets/WumpusNoFriends.png';
import WumpusWaitingForFriends from '../../assets/WumpusWaitingForFriends.png';

const Friends = () => {
  // while in friends - location have subRoom (auto 'all')
  const location = useSelector(state => state.location.value);

  return (
    <div className="friends-page">
      <PageHeader />
      {
        location.subRoom && 
        <div className={`friends-${location.subRoom}`}>
          { location.subRoom === 'add-friend' && (
          <>
            <div className="add-friend-section">
              <h3>add friend</h3>
              <p>you can add a friend with their Discord Tag. It's cAsE sEnSitIvE!</p>
              <form class="friend-search">
                <input type="text" placeholder="Enter a Username#0000" />
                <input type='submit' value='Send Friend Request'/>
              </form>
            </div>
            <Divider sx={{ color: '#8E9297' }}/>
            <div class="not-found">
              <img src={WumpusNoFriends} alt="No Friends Found"/>
              <div>No one's around to play with Wumpus.</div>
            </div>
          </>
          ) }
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