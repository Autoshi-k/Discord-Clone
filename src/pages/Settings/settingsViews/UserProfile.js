import { Divider } from "@mui/material";
import Profile from "../../../components/Profile";
import Warning from "../../../Utilities/Warning";


const UserProfile = () => {
  return (
    <div className='user-profile'>
      <div className='user-profile-edit'>
        <section>
          <div className='bold-title'>avatar</div>
          <div class='buttons'>
            <div className='primary-button'>change avatar</div>
            <div className='off-button'>remove avatar</div>
          </div>
        </section>
        <Divider sx={{ backgroundColor: '#42454A' }} />
        <section>
          <div className='bold-title'>profile color</div>
          <div>default</div>
          <div>
            <input name='custom-color' type='color' />
            <label to='custom-color'>custom</label>
          </div>
        </section>
        <Divider sx={{ backgroundColor: '#42454A' }} />
        <section>
          <div className='bold-title'>about me</div>
          <div>you can use markdowns and link if you'd like.</div>
          <textarea />
        </section>
        <Warning />
      </div>
      <div className='preview'>
        <div className='bold-title'>preview</div>
        <Profile />
      </div>
    </div>
  )
}

export default UserProfile;