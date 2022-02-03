import { useDispatch, useSelector } from "react-redux";
import PageHeader from "../../components/PageHeader/PageHeader";
import { Divider } from "@mui/material";

import WumpusNoFriends from '../../assets/WumpusNoFriends.png';
import WumpusWaitingForFriends from '../../assets/WumpusWaitingForFriends.png';
import { useEffect, useRef, useState } from "react";
import { changeLocation } from "../../features/location";

const Friends = () => {
  // while in friends - location have subRoom (auto 'all')
  const location = useSelector(state => state.location.value);
  const relationships = useSelector(state => state.relationships.value);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (relationships.friends.length) return;
    dispatch(changeLocation({ lobby: 'direct-messages', room: 'friends', subRoom: 'add-friend' }));
  }, [])

  const inputUserName = useRef(null);;
  //
  const [addFriendName, setAddFriendName] = useState('');
  const [numberSign, setNumberSign] = useState(false);
  const [error, setError] = useState({ error: false, message: ''});

  const handleChange = (e) => {
    const newInput = e.target.value;
    setNumberSign(newInput.includes('#') ? true : false);
    if (e.key === 'Delete' || e.key === 'Backspace') {
      setAddFriendName(newInput);
    } else if (!numberSign) {
      setAddFriendName(newInput)
    } else if (!isNaN(newInput.slice(-1)) && addFriendName.slice(-4).includes('#')) { 
      setAddFriendName(newInput);
    } else inputUserName.current.value = newInput.slice(0, -1);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (addFriendName.includes('#') && addFriendName.slice(-5)[0] === '#') {
      // is good -- submit
    } else if (addFriendName.includes('#')) {
      setError({error: true, message: 'Hm, didn\'t work. Double checkthat the capitalization, spelling, any spaces, and numbers are correct.'})
    } else { 
      setError({error: true, message: `We need ${addFriendName}'s four digits tag so we know which one they are.`})
    }
  }
  
  console.log(error);
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
              <form className={`friend-search ${error.error && 'error'}`}>
                <input type="text" onChange={ (e) => handleChange(e) } ref={inputUserName} placeholder="Enter a Username#0000" />
                <input type='submit' onClick={ (e) => handleSubmit(e) } value='Send Friend Request'/>
              </form>
              { error.error ?
                <p className="error-message">{ error.message }</p>  
                :
                null
              }
            </div>
            <Divider sx={{ color: '#8E9297' }}/>
            <div className="not-found">
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