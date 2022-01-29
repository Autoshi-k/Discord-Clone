// import './ChatHeader.css';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


function ChatHeader() {
  const user = useSelector(state => state.user.value);
  const rooms = useSelector(state => state.rooms.value);
  const location = useSelector(state => state.location.value);

  const [userToDisplay, setUserToDisplay] = useState(null);
  console.log('location', location)
  console.log('rooms[location.room]', rooms[location.room]);
  useEffect(() => {
    if (!location.room) return;
    const test =  Object.keys(rooms[location.room].participants).filter(participant => rooms[location.room].participants[participant]._id !== user._id)
    setUserToDisplay(rooms[location.room].participants[test]);

  }, [rooms, location])
  return (
    <>
      <div className="chat-header">
        <DeleteOutlinedIcon sx={{ fontSize: 30, width: '2rem' }} />
        <div className='room-name'>{ userToDisplay ? userToDisplay.displayName : '' }</div>
        <div>O</div>
      </div>
      <Divider />
    </>
  )
}

export default ChatHeader;