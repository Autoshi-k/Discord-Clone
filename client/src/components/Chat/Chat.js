import MessageContainer from '../MessageContainer/MessageContainer';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { io } from 'socket.io-client';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';

import './Chat.css';
import { useSelector } from 'react-redux';

let socket;

export function Chat() {
  const user = useSelector(state => state.user.value);
  const location = useSelector(state => state.location.value);
  const [message, setMessage] = useState('');
  const [newMessages, setNewMessages] = useState([]);
  const newMessagesRef = useRef(newMessages);
  
  useEffect(() => newMessagesRef.current = newMessages)
  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem('user-data')).id);
    socket = io({ auth: { userId: JSON.parse(localStorage.getItem('user-data')).id } });
    socket.on("connect", () => {
      console.log(socket.id); 

      socket.on('show number', number => {
        alert(number);
      })
    
      socket.on('test', ({ newMessage, toSocketId }) => {
        console.log('beckyyyy');
        console.log(newMessage);
        // console.log(toSocketId);
        setNewMessages([...newMessagesRef.current, newMessage]);
      })


    });
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
    
    console.log(location.room);
    console.log(location.room.roomId);
    console.log(location.room.userId);
    socket.emit('try send new message', { msg: msg, to: location.room.roomId, reciver: location.room.userId});
    setMessage('');
  }

  const tryMe = () => socket.emit('try', location.room.userId);

  return (
    <div className="chat-window">
      <div className="chat">
        { newMessages.length ?
          
          newMessages.map((message, index) => {
            console.log(message);
            const prevMessage = index ? newMessages[index - 1] : null;
            // check who is the sender to determinate msg role (primary or secondary)
            const role = prevMessage ? 
            prevMessage.sender.displayName === message.sender.displayName ?
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
      <button onClick={ tryMe }>click here motherfucker</button>

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