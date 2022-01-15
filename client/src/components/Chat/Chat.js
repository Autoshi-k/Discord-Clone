import MessageContainer from '../MessageContainer/MessageContainer';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { io } from 'socket.io-client';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';

import './Chat.css';
import { useSelector } from 'react-redux';

const socket = io();


export function Chat() {

  const user = useSelector(state => state.user.value);
  const [message, setMessage] = useState('');
  const [newMessages, setNewMessages] = useState([]);
  const newMessagesRef = useRef(newMessages);

  useEffect(() => newMessagesRef.current = newMessages)
  useEffect(() => {
    socket.on('success send new message', msg => {
      setNewMessages([...newMessagesRef.current, msg]);
    })
  }, [])
  
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

    socket.emit('try send new message', msg);
    setMessage('');
  }

  return (
    <div className="chat-window">
      <div className="chat">
        { newMessages.length ?
          
          newMessages.map((message, index) => {
            console.log(message);
            console.log(newMessages);
            const prevMessage = index ? newMessages[index - 1] : null;
            const role = prevMessage ? 
            // if its not the first message, check who is the sender
            prevMessage.sender.displayName === message.sender.displayName ?
            // same sender - role is secondary, new sender - primary 
            'secondary' : 'primary' 
            // in case of first new message (no other messages in state)
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