import MessageContainer from '../MessageContainer/MessageContainer';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

import './Chat.css';

export function Chat() {
  return (
    <div className="chat-window">
      <div className="chat">
        <MessageContainer role="first" />
        <MessageContainer role="other" />
        <MessageContainer role="other" />
      </div>

      <div className="input-box">
        <div className="add-media"><DeleteOutlinedIcon sx={{ fontSize: 30 }} /></div>
        <input type="text" placeholder="say something nice"/>
        <div className="stickers-and-more">
          <SentimentVerySatisfiedIcon sx={{ fontSize: 30 }}/> 
          <DeleteOutlinedIcon sx={{ fontSize: 30 }} /> 
          <DeleteOutlinedIcon sx={{ fontSize: 30 }} />
        </div>
      </div>
    </div>
  )
}