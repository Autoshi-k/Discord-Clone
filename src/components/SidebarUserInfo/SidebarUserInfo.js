import { Avatar } from '@mui/material';
import { connect } from 'react-redux';

import './SidebarUserInfo.css';

const SidebarUserInfo = ({ user }) => {
  console.log(user);

  return (
    <div className='sidebar-user-information'>
      <Avatar sx={{ height: 32, width: 32 }}>
        <img src={ user.picture } alt={ user.displayName } height='40' />
      </Avatar>
      <div className='user-information'>
        <div className='display-name'>{ user.displayName }</div>
        <div className='mini-sub'>#{ user.miniSub }</div>
      </div>
    </div>
    )
}

const mapStateToProps = state => {
  return {user: state.user?.user}
}

export default connect(mapStateToProps)(SidebarUserInfo);