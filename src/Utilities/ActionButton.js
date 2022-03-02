import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useContext } from 'react';
import { changeLocation } from '../features/location';
import { SocketContext } from '../context/socket';

const ActionButton = ({ check, clear, chat, linkButton, user, req, friendId }) => {
  const socket = useContext(SocketContext);
  const rooms = useSelector(state => state.rooms.value);
  const dispatch = useDispatch();
  const ignoreBtn = () => {
    socket.emit('remove friend request', { friendId, userFriendId: req.id});
  }
  
  const addBtn = () => {
    socket.emit('accept friend request', { friendId, userFriendId: req.id });
  }

  const startChat = () => {
    // check if room already exist and change location
    const roomExist = rooms.find(room => room.id === req.id);
    if (roomExist) {
      dispatch(changeLocation({ lobby: 'direct-messages', room: roomExist.roomId }))
      return;
    }
    // create new chat
    socket.emit('add chat', { 
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
        <ClearIcon />
      </div>
    )
  }
}

export default ActionButton;