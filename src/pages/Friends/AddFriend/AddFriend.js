import { useDispatch, useSelector } from "react-redux";
import { Divider } from "@mui/material";

import WumpusNoFriends from '../../../assets/WumpusNoFriends.png';
import { useContext, useEffect, useRef, useState } from "react";
import { changeLocation } from "../../../features/location";
import { SocketContext } from "../../../context/socket";
import Modal from "../../../Utilities/Modal";

const AddFriend = () => {
  
  const socket = useContext(SocketContext);
  // while in friends - location have subRoom (auto 'all')
  const dispatch = useDispatch();
  const pendingError = useSelector(state => state.friends.value.errorSendingRecentRequest);
  const searchFriend = useRef(null);

  const [modal, setModal] = useState(false);
  useEffect(() => {
    if (pendingError.error === 'user not found') setModal(true);
  }, [pendingError])

  useEffect(() => {
    if (true) return;
    dispatch(changeLocation({ lobby: 'direct-messages', room: 'friends', subRoom: 'add-friend' }));
  }, [dispatch])

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
      
      const addFriendSearch = searchFriend.current['addFriendSearch'].value;
      const userName = addFriendSearch.slice(0, addFriendSearch.indexOf('#'));
      const userTag = addFriendSearch.slice(-4);
      
      socket.emit('add friend', { name: userName, tag: userTag });

    } else if (addFriendName.includes('#')) {
      setError({error: true, message: 'Hm, didn\'t work. Double checkthat the capitalization, spelling, any spaces, and numbers are correct.'})
    } else { 
      setError({error: true, message: `We need ${addFriendName}'s four digits tag so we know which one they are.`})
    }
  }

  
  
  return (
    <>
      <div className="add-friend-section">
        <h3 className='page-title'>add friend</h3>
        <p>you can add a friend with their Discord Tag. It's cAsE sEnSitIvE!</p>
        <form onSubmit={handleSubmit} ref={searchFriend} className={`friend-search ${pendingError.status && 'error'}`}>
          <input type="text" name="addFriendSearch" onChange={ (e) => handleChange(e) } ref={inputUserName} placeholder="Enter a Username#0000" />
          <input className='primary-button' type='submit' value='Send Friend Request'/>
        </form>
        { pendingError.status ?
          <p className="error-message">{ pendingError.message }</p>  
          :
          null
        }
        { modal && 
          <Modal 
            title='friend request failed'
            subTitle={'Hm, didn\'nt work. Double check at the capitalization, spelling, any spaces, and numbers are corrent.'}
            setModal={setModal}
          />
        }
      </div>
      <Divider sx={{ color: '#8E9297' }}/>
      <div className="not-found">
        <img src={WumpusNoFriends} alt="No Friends Found"/>
        <div>No one's around to play with Wumpus.</div>
      </div>
    </>
  )
}

export default AddFriend;