import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

import online from '../../assets/online.png';
import idle from '../../assets/idle.png';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../context/socket';
import { updateUserStatus } from '../../features/user';

const SmallAvatar = styled(Avatar)(() => ({
  width: 17,
  height: 17,
  backgroundColor: '#2F3136',
  border: `3px solid #2F3136`,
}));


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
          <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <SmallAvatar alt="Remy Sharp" src={ user.currentStatus ? online : idle } height="10" />
          }
          >
            <Avatar sx={{ height: 32, width: 32 }}>
              <img src={ user.image } alt={ user.displayName } height='33' />
            </Avatar>
          </Badge>
        </div>
        <div className='user-information'>
          <div className='display-name'>{ user.displayName }</div>
          <div className='mini-sub'>#{ user.tag }</div>
        </div>
      </>
    </div>
    )
}

export default SidebarUserInfo;