import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';

const SidebarUserInfo = () => {

  const user = useSelector(state => state.user.value);

  return (
    <div className='sidebar-user-information'>
      <>
        <Avatar sx={{ height: 32, width: 32 }}>
          <img src={ user.image } alt={ user.displayName } height='33' />
        </Avatar>
        <div className='user-information'>
          <div className='display-name'>{ user.displayName }</div>
          <div className='mini-sub'>#{ user.tag }</div>
        </div>
      </>
    </div>
    )
}

export default SidebarUserInfo;