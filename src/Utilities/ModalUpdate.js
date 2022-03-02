import { useState } from 'react';

const ModalUpdate = ({ name, email, phoneNumber, password, title, subTitle, modal, setModal }) => {
  const [form, setForm] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/user/test', {
      method: 'POST',
      headers: { 'content-type': 'application/json'},
      body: JSON.stringify(form)
    })
  }

  const handleChange = (e) => {
    console.log(e.target);
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const closeModal = () => setModal(false);
  return (
    <>
      <div className='cover-background' onClick={closeModal}></div>
      <div className='modal'>
        <form onSubmit={handleSubmit}>
          <h2>{title}</h2>
          <h3>{subTitle}</h3>
          { name &&
          <>
            <label htmlFor='name'>username</label>
            <input type='text' name='name' onChange={ handleChange } placeholder='' />
          </>
          }
          { email &&
          <>
            <label htmlFor='email'>email</label>
            <input type='text' name='email' onChange={ handleChange } placeholder='' />
          </>
          }
          { phoneNumber &&
          <>
            <label htmlFor='phoneNumber'>phone number</label>
            <input type='text' name='phoneNumber' onChange={ handleChange } placeholder='' />
          </>
          }
          <label htmlFor='password'>current password</label>
          <input type='text' name='password' onChange={ handleChange } placeholder='' />
          { password &&
          <>
            <label htmlFor='newPassword'>new password</label>
            <input type='text' name='newPassword' onChange={ handleChange } placeholder='' />
            <label htmlFor='confirm'>confirm new password</label>
            <input type='text' name='confirm' onChange={ handleChange } placeholder='' />
          </>
          }
          <div className='buttons'>
            <div className='off-button' onClick={closeModal}>cancel</div>
            {/* <div className='primary-button' type="submit">done</div> */}
            <input className='primary-button' value='done' type="submit" />
          </div>
        </form>
      </div>
    </>
  )
}

export default ModalUpdate;