import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useContext } from 'react';
import { changeLocation } from '../features/location';
import { SocketContext } from '../context/socket';
import { Link } from 'react-router-dom';

const ActionButton = ({ check, clear, chat, linkButton, req, friendId }) => {
  const socket = useContext(SocketContext);
  const user = useSelector(state => state.user.value);

  // const user = useSelector(state => state.user.value);
  const rooms = useSelector(state => state.rooms.value);
  const dispatch = useDispatch();
  const ignoreBtn = () => {
    socket.emit('remove friend request', { id: user.id, friendId, userFriendId: req.id});
  }
  
  const addBtn = () => {
    socket.emit('accept friend request', { id: user.id, friendId, userFriendId: req.id });
  }

  const startChat = () => {
    // check if room already exist and change location
    const roomExist = rooms.find(room => room.id === req.id);
    if (roomExist) {
      dispatch(changeLocation({ lobby: 'direct-messages', room: roomExist.roomId }))
      return;
    }
    console.log(user.id);
    // create new chat
    socket.emit('add chat', { 
      id: user.id,
      type: 1, userFriend: {
        id: req.id,
        name: req.name,
        tag: req.tag,
        statusId: req.statusId,
        avatar: req.avatar
      } });
    console.log('suprise motherfucker')
  }

  if (check) {
    return (
      <div className='action-button positive' onClick={() => addBtn() }>
        <CheckIcon />
      </div>
    )
  }
  if (clear) {
    return (
      <div className='action-button negative' onClick={() => ignoreBtn() }>
        <ClearIcon />
      </div>
    )
  }
  if (chat) {
    return (
      <div className='action-button' onClick={() => startChat() }>
        <ChatBubbleIcon />
      </div>
    )
  }
  if (linkButton) {
    return (
      <div className='action-button'>
        <Link to='/channels' >
          <ClearIcon />

        </Link>
      </div>
    )
  }
}

export default ActionButton;