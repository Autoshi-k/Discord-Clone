import { Avatar } from '@mui/material';


function MessageContainer({ type, sender, image, sentAt, content }) {
  // const [help, setHelp] = useState('');
  let dateDisplay = '';
  let timeDisplay = '';
  const sentDate = new Date(sentAt);
  const todayDate = new Date();
  const todayDateObj = {
    year: todayDate.getFullYear(),
    month: todayDate.getMonth() + 1,
    day: todayDate.getDate()
  }
  const time = {
    year: sentDate.getFullYear(),
    month: sentDate.getMonth() + 1,
    day: sentDate.getDate(),
    hours: sentDate.getHours() < 10 ? '0' + sentDate.getHours() : sentDate.getHours(),
    minutes: sentDate.getMinutes() < 10 ? '0' + sentDate.getMinutes() : sentDate.getMinutes()
  }

  if (todayDateObj.year === time.year && todayDateObj.month === time.month && todayDateObj.day === time.day)  {
    dateDisplay = 'Today at';
    timeDisplay = time.hours + ':' + time.minutes;
  } else if (todayDateObj.day - 1 === time.day) {
    dateDisplay = 'Yesterday at';  
    timeDisplay = time.hours + ':' + time.minutes;
  } else dateDisplay = time.month + '/' + time.day + '/' + time.year

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
              <span className='date'>{ dateDisplay } { timeDisplay }</span>
            </div>
          <div className='message-content'>{ content }</div>
          </div>
        </div>
    </div> :
    <div className="message">
      <div className="message-container">
        <span className='date visbale-hover'>{ timeDisplay }</span>
        <div className='message-content secondary'>{ content }</div>
      </div>
    </div>
    }
    </>

  )
}

export default MessageContainer;