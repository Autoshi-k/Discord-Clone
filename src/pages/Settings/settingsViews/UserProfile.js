import { Divider } from "@mui/material";
import Profile from "../../../components/Profile";
import { CustomPicker, ChromePicker } from 'react-color';
import { useRef, useState } from "react";
import MyColorPicker from "../../../Utilities/MyColorPicker";
import Submit from "../../../Utilities/Submit";
import Section from "../../../Utilities/Section";

const UserProfile = () => {

  const form = useRef(null);
  const [file, setFile] = useState(null);

  const [displayColorPick, setDisplayColorPick] = useState(false);  
  const submitHandler = async (e) => {
    e.preventDefault();
    await fetch('/api/user/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      encoding: 'binary',
      body: file
    })
  }

  return (
    <div className='user-profile'>
      <form ref={form} onSubmit={(e) => submitHandler(e)} className='user-profile-edit'>
        <Section title='avatar'>
          <div className='buttons'>
            <label className='primary-button' htmlFor='newAvatar'>
              change avatar
              <input name='newAvatar' id='newAvatar' type='file' accept="image/png, image/jpeg" hidden 
               onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className='off-button'>remove avatar</div>
          </div>
        </Section>
        <Divider sx={{ backgroundColor: '#42454A' }} />
        <Section title='profile color'>
          <div className='section-color'>
            <div class='container-color'>
              <div className='color default-color' style={{ backgroundColor:'#DEEBE2' }}></div>
              <div className='color-title'>default</div>
            </div>
            <div className='container-color'>
            <div className='color' onClick={ () => setDisplayColorPick(!displayColorPick) } style={{ backgroundColor:'#D1EB82' }} ></div>
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
        <input name='help' type='text' />
        <div className='submit-warning'>
          careful - you have unsaved changes
          <div className='buttons'>
            <div className='off-button'>reset</div>
            <input type='submit' className='primary-button green' value='save changes' />
          </div>
        </div>
      </form>
      <div className='preview'>
        <div className='bold-title'>preview</div>
        <Profile />
      </div>
    </div>
  )
}

export default UserProfile;