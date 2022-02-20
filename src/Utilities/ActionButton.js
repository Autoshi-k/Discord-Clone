import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { useContext } from 'react';
import { SocketContext } from '../context/socket';

const ActionButton = ({ check, clear, chat, user, req }) => {
  const socket = useContext(SocketContext);

  const ignoreBtn = () => {
    socket.emit('remove friend request', { requestId: [user.id, req.id] });
  }
  
  const addBtn = () => {
    socket.emit('remove friend request', { requestId: [user.id, req.id] });
    socket.emit('accept friend request', { requestId: [user.id, req.id] });
  }

  const startChat = () => {
    // change location - maybe in dashbord first check if room exist
    // emit to new/exist chat
    console.log('heelooo')
    socket.emit('add chat', { type: 1, user, friend: req });
  }

  if (check) {
    return (
      <div className='positive' onClick={() => addBtn() }>
        <CheckIcon />
      </div>
    )
  }
  if (clear) {
    return (
      <div className='negative' onClick={() => ignoreBtn() }>
        <ClearIcon />
      </div>
    )
  }
  if (chat) {
    return (
      <div onClick={() => startChat() }>
        <ChatBubbleIcon />
      </div>
    )
  }
}

export default ActionButton;