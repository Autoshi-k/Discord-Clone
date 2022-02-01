// import './ChatHeader.css';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import GroupsIcon from '@mui/icons-material/Groups';

import { Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import StatusIcon from '../../Utilities/StatusIcon';


function PageHeader() {
  const user = useSelector(state => state.user.value);
  const rooms = useSelector(state => state.rooms.value);
  const location = useSelector(state => state.location.value);

  const [userToDisplay, setUserToDisplay] = useState(null);
  useEffect(() => {
    if (location.room === 'friends') return;
    const currentRoom = rooms[location.room]
    const test =  Object.keys(currentRoom.participants).filter(participant => currentRoom.participants[participant]._id !== user._id)
    setUserToDisplay(rooms[location.room].participants[test]);
  }, [rooms, location])

  return (
    <>
      <div className="header">
        
        {
            location.room === 'friends' ?
            <>
              <div className='friends-header'>            
                <div aria-hidden="true" className="chat-header-at-icon"><GroupsIcon fontSize='large' sx={{ fontSize: 30, color: '#B9BBBE', width: '2rem' }}/> </div>
                <div className='room-name'>Friends</div>
              </div>
              <ul className='friends-header-list'>
                <li className={location.subRoom === 'online' ? 'active' : null}>online</li>
                <li className={location.subRoom === 'all' ? 'active' : null}>all</li>
                <li className={location.subRoom === 'pending' ? 'active' : null}>pending</li>
                <li className={location.subRoom === 'blocked' ? 'active' : null}>blocked</li>
                <li className={`add-friend ${location.subRoom === 'blocked' ? 'active' : null}`}>add friend</li>
              </ul>
            </>
            :
            <>
              <div aria-hidden="true" className="chat-header-at-icon"><AlternateEmailIcon sx={{ fontSize: 30, color: '#B9BBBE', width: '2rem' }} /></div>
              <div className='room-name'>{ userToDisplay ? userToDisplay.displayName : '' }</div>
              <StatusIcon
                currentStatus={ userToDisplay?.currentStatus }
              alt={ 'status-' }
              />
            </>    
        }
        
        </div>
      <Divider />
    </>
  )
}

export default PageHeader;