import './MessageContainer.css';
import { Comment } from 'semantic-ui-react'
import { ListItem, Avatar, ListItemText, Typography } from '@mui/material';

function MessageContainer({ role }) {
  return ( 
    <>    
    { role === "first" ? 
      <div className="message-container">
      <ListItem>
        <Avatar  
          sx={{ justifySelf:"flex-start" }}
          src='https://react.semantic-ui.com/images/avatar/small/matt.jpg'></Avatar>
        <span className='username'>shani</span>
        <span className='date'>today 7:00</span>
        <span className='message-content'>This is my message</span>
      </ListItem>
    </div> :
    <span className='message-content'>This is my second message</span>
    }
    </>

  )
}

export default MessageContainer;