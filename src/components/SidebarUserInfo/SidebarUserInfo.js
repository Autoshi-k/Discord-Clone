import { useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';
import { SocketContext } from '../../context/socket';
import { updateUserStatus } from '../../features/user';
import StatusIcon from '../../Utilities/StatusIcon';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';

const SidebarUserInfo = () => {
  const dispatch = useDispatch();

  const socket = useContext(SocketContext);
  const user = useSelector(state => state.user.value);

  const changeStatus = () => {
    dispatch(updateUserStatus(user.currentStatus ? 0 : 1));
    socket.emit('change my status', user.currentStatus ? 0 : 1)
  }

  return (
    <div className='sidebar-user-information'>
      <>
        <div onClick={ () => changeStatus() }>
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
        <Link to='/settings'>
          <SettingsIcon />
        </Link>
      </>
    </div>
    )
}

export default SidebarUserInfo;