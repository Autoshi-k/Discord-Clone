import './MessageContainer.css';
import { Comment } from 'semantic-ui-react'
import { ListItem, Avatar, ListItemText, Typography } from '@mui/material';

function MessageContainer({ type, sender, image, sentAt, content }) {
  return ( 
    <>    
    { type === 'primary' ? 
      <div className="message">
        <div className="message-container">
          <div className="avatar">
            <Avatar  
            sx={{ justifySelf:"flex-start" }}
            src={ image }>
            </Avatar>
          </div>
          <div className="message-sub-container">
            <div>
              <div className='username'>{ sender }</div>
              <span className='date'>today 7:00</span>
            </div>
          <div className='message-content'>{ content }</div>
          </div>
        </div>
    </div> :
    <div className="message">
      <div className="message-container">
        <span className='date visbale-hover'>to</span>
        <div className='message-content secondary'>{ content }</div>
      </div>
    </div>
    }
    </>

  )
}

export default MessageContainer;