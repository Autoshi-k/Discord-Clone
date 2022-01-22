import MessageContainer from '../MessageContainer/MessageContainer';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import moment from 'moment';
import { useContext, useEffect, useRef, useState } from 'react';

import './Chat.css';
import { useSelector } from 'react-redux';
import { SocketContext } from '../../context/socket';

export function Chat() {
  const socket = useContext(SocketContext);
  // Redux store
  const user = useSelector(state => state.user.value);
  const location = useSelector(state => state.location.value);
  const newMessages = useSelector(state => state.newMessages.value);
  // new message input
  const [message, setMessage] = useState('');
  
  const changeMesasgeValue = (e) => {
    setMessage(e.target.value);
  }

  const submitMessage = (e) => {
    if (e.code !== 'Enter') return;
    e.preventDefault();
    
    const msg = {
      senderDisplayName: user.displayName,
      senderId: user.id,
      senderImage: user.image,
      thisTime: moment(),
      type: 'Image',
      content: message
    }

    socket.emit('try send new message', { msg: msg, to: location.room.roomId });
    setMessage('');
  }

  return (
    <div className="chat-window">
      <div className="chat">
        { newMessages.messages.length ? 
          
          newMessages.messages.map((messageObj, index) => {
            const message = messageObj.message; 
            const prevMessage = index ? newMessages.messages[index - 1] : null;
            // check who is the sender to determinate msg role (primary or secondary)
            const role = prevMessage ? 
            prevMessage.message.sender.displayName === message.sender.displayName ?
            'secondary' : 'primary' 
            : 'primary';

            return <MessageContainer 
                     key={ 500 - index }
                     role={role}
                     sender={message.sender.displayName} 
                     image={message.sender.image} 
                     sentAt={message.createdAt} 
                     content={message.content}
                   />
          })
      :
      null
      }
      </div>
      <div className="input-box" onKeyUp={ submitMessage }>
        <div className="add-media"><DeleteOutlinedIcon sx={{ fontSize: 30 }} /></div>
        <input 
          type="text"  
          placeholder="say something nice"
          value={message}
          onChange={changeMesasgeValue}  
        />
        <div className="stickers-and-more">
          <SentimentVerySatisfiedIcon sx={{ fontSize: 30 }}/> 
          <DeleteOutlinedIcon sx={{ fontSize: 30 }} /> 
          <DeleteOutlinedIcon sx={{ fontSize: 30 }} />
        </div>
      </div>
    </div>
  )
}