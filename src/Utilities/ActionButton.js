import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { useContext } from 'react';
import { SocketContext } from '../context/socket';

const ActionButton = ({ check, clear, chat, linkButton, user, req, friendId }) => {
  const socket = useContext(SocketContext);

  const ignoreBtn = () => {
    socket.emit('remove friend request', { friendId, userFriendId: req.id});
  }
  
  const addBtn = () => {
    socket.emit('accept friend request', { friendId, userFriendId: req.id });
  }

  const startChat = () => {
    // change location - maybe in dashbord first check if room exist
    // emit to new/exist chat
    socket.emit('add chat', { type: 1, user, friend: req });
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