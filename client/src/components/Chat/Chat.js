import MessageContainer from '../MessageContainer/MessageContainer';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { useContext, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { SocketContext } from '../../context/socket';

export function Chat() {
  const socket = useContext(SocketContext);
  // Redux store
  const location = useSelector(state => state.location.value);
  const rooms = useSelector(state => state.rooms.value);
  const [currentRoom, setCurrentRoom] = useState(null); // will change later (in case there are no chats at all - what will i show)
  
  useEffect(() => {
    if (location.room === '') return;
    console.log(rooms[location.room]);  
    setCurrentRoom(rooms[location.room]);
  }, [location, rooms])

  const [message, setMessage] = useState('');
  const changeMesasgeValue = (e) => {
    setMessage(e.target.value);
  }

  const submitMessage = (e) => {
    if (e.code !== 'Enter') return;
    e.preventDefault();
    socket.emit('try send new message', { message, to: location.room });
    setMessage('');
  }
  
  const determinateType = (message, index) => {
    // check who is the sender to determinate msg type (primary or secondary)
    if (index) {
      const prevMessage = currentRoom.messages[index - 1];
      return message.participantId === prevMessage.participantId ? 'secondary' : 'primary';
    } else return 'primary'
  }
  
  console.log(currentRoom);
  console.log(currentRoom?.messages);
  const createMessage = (message, index) => {
    const type = determinateType(message, index);
    return <MessageContainer 
              key={ Math.floor(Math.random() * 9999) * (index + 1) }
              type={type}
              sender={ currentRoom.participants[message.participantId].displayName }
              image={ currentRoom.participants[message.participantId].image } 
              sentAt={message.createdAt} 
              content={message.content}
              />
            }

  return (
    <div className="chat-window">
      <div className="chat">

        { 
          currentRoom?.messages?.length ? 
          currentRoom.messages.map((message, index) => createMessage(message, index))
          : null
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