import { Avatar } from '@mui/material';

const SidebarUserInfo = () => {

  const userInformation = JSON.parse(localStorage.getItem('user-data')); 
  return (
    <div className='sidebar-user-information'>
      <>
        <Avatar sx={{ height: 32, width: 32 }}>
          {/* <img src={ userAuth.picture } alt={ userAuth.displayName } height='40' /> */}
        </Avatar>
        <div className='user-information'>
          <div className='display-name'>{ userInformation.displayName }</div>
          <div className='mini-sub'>#{ userInformation.tag }</div>
        </div>
      </>
    </div>
    )
}

export default SidebarUserInfo;