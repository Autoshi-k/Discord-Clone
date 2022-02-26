import { Avatar, Divider } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLocation } from "../../../features/location";
import ModalUpdate from "../../../Utilities/Modal";
import Section from "../../../Utilities/Section";

const MyAccount = () => {
  const user = useSelector(state => state.user.value);
  const color = '#C3406B';

  const dispatch = useDispatch();
  const [nicknameModal, setNicknameModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);

  const handleEditProfile = () => dispatch(changeLocation({ lobby: 'direct-messages', room:'settings', subRoom:'user-profile' })) 
  const handleNicknameEdit = () => setNicknameModal(true);
  const handleEmailEdit = () => setEmailModal(true);
  // const handleNicknameEdit = () => setNicknameModal(true);
  return (
    <div className='my-account'>
      <Section>
        <div className='profile demi-profile'>
          <div className='banner' style={{ backgroundColor:color }}></div>
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
                <div className='change-button'>edit</div>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Divider />
      <Section>
        <h2>passwords and authontication</h2>
        <div className='primary-button'>change password</div>
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
          subTitle='enter a new username and your existing password'
          inputs={[{
            name: 'username',
            type: 'text',
            label: true,
            placeholder: ''
          }, {
            name: 'current password',
            type: 'password',
            label: true,
            placeholder: ''
          }]}
        />
      }
      { emailModal &&
        <ModalUpdate 
          modal={emailModal}
          setModal={setEmailModal} 
          title='enter an email address'
          subTitle='enter a new email address and your existing password'
          inputs={[{
            name: 'email',
            type: 'text',
            label: true,
            placeholder: ''
          }, {
            name: 'current password',
            type: 'password',
            label: true,
            placeholder: ''
          }]}
        />
      }
    </div>
  )
}

export default MyAccount;