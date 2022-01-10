import './MessageContainer.css';
import { Comment } from 'semantic-ui-react'
import { ListItem, Avatar, ListItemText, Typography } from '@mui/material';

function MessageContainer({ role }) {
  return ( 
    <>    
    { role === "first" ? 
      <div className="message">
        <div className="message-container">
          <div className="avatar">
            <Avatar  
            sx={{ justifySelf:"flex-start" }}
            src='https://react.semantic-ui.com/images/avatar/small/matt.jpg'>
            </Avatar>
          </div>
          <div className="message-sub-container">
            <div>
              <div className='username'>shani</div>
              <span className='date'>today 7:00</span>
            </div>
          <div className='message-content'>This is my message</div>
          </div>
        </div>
    </div> :
    <div className="message">
      <div className="message-container">
        <span className='date visbale-hover'>to</span>
        <div className='message-content secondary'>This is my second message</div>
      </div>
    </div>
    }
    </>

  )
}

export default MessageContainer;