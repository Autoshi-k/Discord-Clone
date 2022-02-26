import { Divider } from "@mui/material";
import Profile from "../../../components/Profile";
import { useRef, useState } from "react";
import MyColorPicker from "../../../Utilities/MyColorPicker";
import Submit from "../../../Utilities/Submit";
import Section from "../../../Utilities/Section";

const UserProfile = () => {
  const [avatar, setAvatar] = useState(null);

  const [displayColorPick, setDisplayColorPick] = useState(false);
  const [color, setColor] = useState('#7FE3B0');
  
  const fileSelected = (e) => setAvatar(e.target.files[0]);

  return (
    <div className='user-profile'>
      <div className='user-profile-edit'>
        <Section title='avatar'>
          <div className='buttons'>
            <label className='primary-button' htmlFor='newAvatar'>
              change avatar
              <input name='newAvatar' id='newAvatar' type='file' accept="image/png, image/jpeg" hidden 
               onChange={fileSelected}
              />
            </label>
            <div className='off-button'>remove avatar</div>
          </div>
        </Section>
        <Divider sx={{ backgroundColor: '#42454A' }} />
        <Section title='profile color'>
          <div className='section-color'>
            <div className='container-color'>
              <div className='color default-color' style={{ backgroundColor:'#DEEBE2' }}></div>
              <div className='color-title'>default</div>
            </div>
            <div className='container-color'>
            <div className='color' onClick={ () => setDisplayColorPick(!displayColorPick) } style={{ backgroundColor: color }} ></div>
            { displayColorPick ? 
            <div className='popover'>
              <div className='cover' onClick={ () => setDisplayColorPick(false) }/>
              <MyColorPicker />
            </div> 
            : null }
            <div className='color-title'>custom</div>
            </div>
            
          </div>
        </Section>
        <Divider sx={{ backgroundColor: '#42454A' }} />
        <Section title='about me'>
          <div className='description'>You can use markdowns and link if you'd like.</div>
          <textarea />
        </Section>
      </div>
      <Submit avatar={avatar} />
      <div className='preview'>
        <div className='bold-title' >preview</div>
        <Profile color={color}/>
      </div>
    </div>
  )
}

export default UserProfile;