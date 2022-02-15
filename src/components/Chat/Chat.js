import MessageContainer from '../MessageContainer/MessageContainer';
import EmojiEmotionsRoundedIcon from '@mui/icons-material/EmojiEmotionsRounded';
import { useContext, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { SocketContext } from '../../context/socket';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AssistantIcon from '@mui/icons-material/Assistant';
import GifBoxRoundedIcon from '@mui/icons-material/GifBoxRounded';
import PageHeader from '../PageHeader/PageHeader';

export function Chat() {
  const socket = useContext(SocketContext);
  // Redux store
  const location = useSelector(state => state.location.value);
  const rooms = useSelector(state => state.rooms.value);
  const [currentRoom, setCurrentRoom] = useState(null); // will change later (in case there are no chats at all - what will i show)
  
  useEffect(() => {
    if (location.room === '') return;
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
      <PageHeader />
      <div className="chat">

        { 
          currentRoom?.messages?.length ? 
          currentRoom.messages.map((message, index) => createMessage(message, index))
          : null
        }

      </div>
      <div className="input-box" onKeyUp={ submitMessage }>
        <div className="add-media"><AddCircleIcon sx={{ fontSize: 30 }} /></div>
        <input 
          type="text"  
          placeholder="say something nice"
          value={message}
          onChange={changeMesasgeValue}  
        />
        <div className="stickers-and-more">
          <GifBoxRoundedIcon sx={{ fontSize: 30 }} />
          <AssistantIcon sx={{ fontSize: 25 }} /> 
          <EmojiEmotionsRoundedIcon sx={{ fontSize: 30 }}/> 
        </div>
      </div>
    </div>
  )
}