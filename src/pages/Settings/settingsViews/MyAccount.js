import { Avatar, Divider } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLocation } from "../../../features/location";
import ModalUpdate from "../../../Utilities/ModalUpdate";
import Section from "../../../Utilities/Section";

const MyAccount = () => {
  const user = useSelector(state => state.user.value);

  const dispatch = useDispatch();

  // possible modal in this page
  const [nicknameModal, setNicknameModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);

  // actions 
  const handleEditProfile = () => dispatch(changeLocation({ lobby: 'direct-messages', room:'settings', subRoom:'user-profile' })) 
  const handleNicknameEdit = () => setNicknameModal(true);
  const handleEmailEdit = () => setEmailModal(true);
  const handlePasswordEdit = () => setPasswordModal(true);
  
  return (
    <div className='my-account'>
      <Section>
        <div className='profile demi-profile'>
          <div className='banner' style={{ backgroundColor: user.color }}></div>
          <div className='container-profile-details'>
            <div className='container-avatar'>
              <Avatar sx={{ height: 96, width: 96 }} src={user.avatar} alt={ user.name } />
            </div>
            <h1>{user.name}<span>#{user.tag}</span></h1>
            <div className='primary-button' onClick={ handleEditProfile }>edit user profile</div>
          </div>
          <div className='conatiner-profile'>
            <div className='edit-in-profile'>
              <div className='row'>
                <div className='column'>
                  <div className='bold-title'>username</div>
                  <div className='user-information'>{user.name}<span>#{user.tag}</span></div>
                </div>
                <div className='change-button' onClick={handleNicknameEdit}>edit</div>
              </div>
              <div className='row'>
                <div className='column'>
                  <div className='bold-title'>email</div>
                  <div className='user-information'>{user.email} shanidx97@gmail.com</div>
                </div>
                <div className='change-button' onClick={handleEmailEdit}>edit</div>
              </div>
              <div className='row'>
                <div className='column'>
                  <div className='bold-title'>phone number</div>
                  <div className='user-information'>{0 ? '054-59595259' : 'You don\'t have a phone number yet' }</div>
                </div>
                <div className='change-button' onClick={handlePasswordEdit}>edit</div>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Divider />
      <Section>
        <h2>passwords and authontication</h2>
        <div className='primary-button' onClick={handlePasswordEdit}>change password</div>
      </Section>
      <Divider />
      <Section title='account removal'>
        <div>disabling your account means you can recover it any time after taking this action</div>
        <div className='buttons'>
          <div className='primary-button red'>disable account</div>
          <div className='off-button red'>delete account</div>
        </div>
      </Section>
      { nicknameModal &&
        <ModalUpdate 
          modal={nicknameModal}
          setModal={setNicknameModal}
          title='change your username'
          subTitle='enter a new username and your existing password.'
          name={true}
        />
      }
      { emailModal &&
        <ModalUpdate 
          modal={emailModal}
          setModal={setEmailModal} 
          title='enter an email address'
          subTitle='enter a new email address and your existing password.'
          email={true}
        />
      }
      { passwordModal &&
        <ModalUpdate 
          modal={passwordModal}
          setModal={setPasswordModal} 
          title='change your password'
          subTitle='enter your current password and a new passowrd.'
          password={true}
        />
      }
    </div>
  )
}

export default MyAccount;