import MessageContainer from '../MessageContainer/MessageContainer';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { useContext, useState } from 'react';

import './Chat.css';
import { useSelector } from 'react-redux';
import { SocketContext } from '../../context/socket';

export function Chat() {
  const socket = useContext(SocketContext);
  // Redux store
  const user = useSelector(state => state.user.value);
  const location = useSelector(state => state.location.value);
  // const newMessages = useSelector(state => state.newMessages.value);
  // const oldMessages = useSelector(state => state.oldMessages.value);
  const rooms = useSelector(state => state.rooms.value);

  // const messagesInRoom = oldMessages.length ? oldMessages.find(message => message.roomId === location.room.roomId) : null;
  // console.log(messagesInRoom);
  // console.log(newMessages);
  // new message input
  const [message, setMessage] = useState('');
  // const messageInRoom = rooms.indexOf(room => room.roomId === location.room) === -1 ? 
  // null 
  // : rooms..messages;
  
  // console  .log(location.room.roomId);
  
  const changeMesasgeValue = (e) => {
    setMessage(e.target.value);
  }

  const submitMessage = (e) => {
    if (e.code !== 'Enter') return;
    e.preventDefault();
    console.log(message);
    socket.emit('try send new message', { message, to: location.room });
    setMessage('');
  }

  const createMessage = (message, index, prevMessage) => {
    // const prevMessage = array ? array.sender.displayName : null;
    // // check who is the sender to determinate msg role (primary or secondary)
    // const role = prevMessage ? 
    // prevMessage === message.sender.displayName ?
    // 'secondary' : 'primary' 
    // : 'primary';
    console.log(message);
    // return <MessageContainer 
    //           key={ Math.floor(Math.random() * 9999) * index }
    //           role={role}
    //           sender={ }
    //           // sender={message.sender.displayName} 
    //           image={message.sender.image} 
    //           sentAt={message.createdAt} 
    //           content={message.content}
    //           />
            }


  return (
    <div className="chat-window">
      <div className="chat">

        {/* { 
          messageInRoom ? 
          messageInRoom.map((message, index) => createMessage(message, index, index ? messageInRoom[index-1] : null))
          : null
        } */}

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