import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

import './SidebarUserInfo.css';

const SidebarUserInfo = ({ user }) => {

  const navigate = (prop) => {
    // console.log('here');
    if (!prop.user) return <Navigate to="/login" />
  }

  console.log(user);
  const [userAuth, setUserAuth] = useState(false);
  // const userInformation = user.action.user;
  useEffect(() => {
    navigate(user);
    if (user) { setUserAuth(user?.action?.user) }
  }, [user])

  return (
    <div className='sidebar-user-information'>
      { userAuth &&
      <>
        <Avatar sx={{ height: 32, width: 32 }}>
          <img src={ userAuth.picture } alt={ userAuth.displayName } height='40' />
        </Avatar>
        <div className='user-information'>
          <div className='display-name'>{ userAuth.displayName }</div>
          <div className='mini-sub'>#{ userAuth.miniSub }</div>
        </div>
      </>}
    </div>
    )
}

const mapStateToProps = state => {
  // console.log(state);
  return {user: state}
}

export default connect(mapStateToProps)(SidebarUserInfo);