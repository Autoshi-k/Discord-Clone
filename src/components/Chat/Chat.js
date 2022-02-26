import MessageContainer from '../MessageContainer/MessageContainer';
import EmojiEmotionsRoundedIcon from '@mui/icons-material/EmojiEmotionsRounded';
import { useContext, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '../../context/socket';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AssistantIcon from '@mui/icons-material/Assistant';
import GifBoxRoundedIcon from '@mui/icons-material/GifBoxRounded';
import PageHeader from '../PageHeader/PageHeader';
import { messagesFetch } from '../../features/roomContent';

export function Chat() {
  const socket = useContext(SocketContext);
  // Redux store
  const location = useSelector(state => state.location.value);
  const rooms = useSelector(state => state.rooms.value);
  const roomContent = useSelector(state => state.roomContent.value);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.room === '') return;
    // setCurrentRoom(rooms[location.room]);
    fetch(`/api/messages/getMessages/${location.room}`, {
      method: 'GET',
      headers: {
        "content-type": "application/json",
        "Authorization": localStorage.getItem("auth-token"),
      }
    })
    .then(res => res.json())
    .then(data => dispatch(messagesFetch(data)))
    return () => socket.emit('update last visit', { room: location.room })
  }, [location, rooms, dispatch, socket])


  const [message, setMessage] = useState('');
  const changeMesasgeValue = (e) => {
    setMessage(e.target.value);
  }

  const submitMessage = (e) => {
    if (e.code !== 'Enter') return;
    e.preventDefault();
    // i want to add 'message didnt deliverd yet' 
    socket.emit('send message', { message, to: location.room });
    setMessage('');
  }
  
  const determinateType = (message, index) => {
    // check who is the sender to determinate msg type (primary or secondary)
    if (!index) return 'primary';
    const prevMessage = roomContent.messages[index - 1];
    if (message.userId !== prevMessage.userId) return 'primary';
    const prevDate = new Date(prevMessage.created);
    const nowDate = new Date(message.created);
    if (nowDate.getDay() !== prevDate.getDay()) return 'primary';
    if (nowDate.getHours() !== prevDate.getHours()) {
      return 'primary';
    } else if (nowDate.getMinutes() - prevDate.getMinutes() >= 5) {
      return 'primary';
    }
    return 'secondary';
    // } else return 'primary'

  }
  
  const createMessage = (message, index) => {
    const type = determinateType(message, index);
    return <MessageContainer 
              key={index}
              type={type}
              sender={ roomContent.usersInRoom[message.userId].name }
              image={ roomContent.usersInRoom[message.userId].avatar } 
              sentAt={message.created} 
              content={message.content}
              />
            }

  return (
    <div className="chat-window">
      <PageHeader />
      <div className="chat">

        { 
          roomContent.messages.length ? 
          // roomContent.messages.map((message, index) => createMessage(message, index))
          roomContent.messages.map((message, index) => createMessage(message, index))
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