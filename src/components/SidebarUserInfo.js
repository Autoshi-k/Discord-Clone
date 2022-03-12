import { useDispatch, useSelector } from 'react-redux';
import { useState, useContext } from 'react';
import { SocketContext } from '../context/socket';
import { updateUserStatus } from '../features/user';
import StatusIcon from '../Utilities/StatusIcon';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';

const SidebarUserInfo = () => {
  const dispatch = useDispatch();

  const socket = useContext(SocketContext);
  const user = useSelector(state => state.user.value);
  const [showList, setShowList] = useState(false);


  return (
    <div className='sidebar-user-information'>
      <>
        { showList && <StatusList setShowList={setShowList}/> }
        <div className='user-info-avatar'>
          <div onClick={ () => setShowList(!showList) }>
            <StatusIcon
              badge={true}
              currentStatus={user.statusId}
              alt={user.name}
              image={user.avatar}
            />
          </div>
          <div className='user-information'>
            <div className='display-name'>{ user.name }</div>
            <div className='mini-sub'>#{ user.tag }</div>
          </div>
        </div>
        <div className='settings-button'>
          <Link to='/settings' style={{ color: 'unset' }}>
            <SettingsIcon />
          </Link>
        </div>
      </>
    </div>
    )
}

export default SidebarUserInfo;


const StatusList = ({setShowList}) => {
  const socket = useContext(SocketContext);
  const user = useSelector(state => state.user.value);
  const handleChangeStatus = (index) => {
    socket.emit('change status', { id: user.id, newStatus: index });
    setShowList(false);
  }
  return (
    <ul className='status-list'>
    { ['offline', 'online', 'idle', 'notDisturb'].map((item, index) => {
      return (
        <li key={index} onClick={ () => handleChangeStatus(index) }>
          <div className={`icon ${item}`}></div>
          <span>{item}</span>
        </li>
      )
    })}
  </ul>
  )
}