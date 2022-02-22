import { Avatar, Divider } from "@mui/material";
import { useSelector } from "react-redux"

const Profile = () => {
  const user = useSelector(state => state.user.value);
  return (
    <div className='profile'>
      <div className='banner' style={{ backgroundColor:'#144bb9' }}></div>
      <div className='container-avatar'>
        <Avatar sx={{ height: 46, width: 46 }} src={user.avatar} alt={ user.name } />
      </div>
      <div className='conatiner-profile'>
        <h1>{user.name}<span>#{user.tag}</span></h1>
        <Divider sx={{color:'#8E9297'}}/>
        <div className='bold-title'>about me</div>
        <div>some hard coded text here!</div>
      </div>
      {/* <div className='primary-button'>edit user profile</div> */}
    </div>
  )
}

export default Profile;