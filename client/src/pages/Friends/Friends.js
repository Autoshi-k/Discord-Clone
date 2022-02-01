import { useSelector } from "react-redux";
import PageHeader from "../../components/PageHeader/PageHeader"
import WumpusNoFriends from '../../assets/WumpusNoFriends.png';

const Friends = () => {
  // while in friends - location have subRoom (auto 'all')
  const location = useSelector(state => state.location.value);

  return (
    <div className="friends-page">
      <PageHeader />
      { location.subRoom && 
        <div className="friends-online">
          <div class="not-found">
            <img src={WumpusNoFriends} alt="No Friends Found"/>
            <div>No one's around to play with Wumpus.</div>
          </div>
        </div>
      }
    </div>
  )
}

export default Friends;