import { useState } from 'react';

const ModalUpdate = ({ name, email, phoneNumber, password, title, subTitle, modal, setModal }) => {
  const [form, setForm] = useState({})
  const [error, setError] = useState({
    error: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/user/updateAccount', {
      method: 'POST',
      headers: { 
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('auth-token'),  
      },
      body: JSON.stringify(form)
    })
    .then(res => res.json())
    .then(data => { 
      if (data.seccuss) window.location.reload(false) 
      if (data.error) {
        console.log(data);
        setError({ 
          [data.key] : JSON.stringify(data.message)
        });
        return;
      }
    })
    .catch(err => console.log(err))
  }

  console.log(error);

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
      <div className='modal-cover-background' onClick={closeModal}></div>
      <div className='modal'>
        <form onSubmit={handleSubmit}>
          <h2>{title}</h2>
          <h3>{subTitle}</h3>
          { name &&
          <>
            <label className={`${error.name ? 'error' : ''}`} htmlFor='name'>username<span> - {error.name}</span></label>
            {console.log(error.name)}
            <input type='text' name='name' onChange={ handleChange } placeholder='' />
          </>
          }
          { email &&
          <>
            <label className={`${error.email ? 'error' : ''}`} htmlFor='email'>email<span> - {error.email}</span></label>
            <input type='text' name='email' onChange={ handleChange } placeholder='' />
          </>
          }
          { phoneNumber &&
          <>
            <label className={`${error.phoneNumber ? 'error' : ''}`} htmlFor='phoneNumber'>phone number<span> - {error.phoneNumber}</span></label>
            <input type='text' name='phoneNumber' onChange={ handleChange } placeholder='' />
          </>
          }
          <label className={`${error.password ? 'error' : ''}`} htmlFor='password'>current password<span> - {error.password}</span></label>
          <input type='password' name='password' onChange={ handleChange } placeholder='' />
          { password &&
          <>
            <label className={`${error.newPassword ? 'error' : ''}`} htmlFor='newPassword'>new password<span> - {error.newPassword}</span></label>
            <input type='password' name='newPassword' onChange={ handleChange } placeholder='' />
            <label className={`${error.confirm ? 'error' : ''}`} htmlFor='confirm'>confirm new password<span> - {error.confirm}</span></label>
            <input type='password' name='confirm' onChange={ handleChange } placeholder='' />
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