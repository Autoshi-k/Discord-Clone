import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { useContext } from 'react';
import { SocketContext } from '../context/socket';

const ActionButton = ({ check, clear, chat, userId, reqId }) => {
  const socket = useContext(SocketContext);

  const ignoreBtn = () => {
    socket.emit('remove friend request', { requestId: [userId, reqId] });
  }
  
  const addBtn = () => {
    socket.emit('remove friend request', { requestId: [userId, reqId] });
    socket.emit('accept friend request', { requestId: [userId, reqId] });
  }

  console.log('hello')

  if (check) {
    return (
      <div className='postive' onClick={() => addBtn() }>
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
      <div onClick={() => addBtn() }>
        <ChatBubbleIcon />
      </div>
    )
  }
}

export default ActionButton;