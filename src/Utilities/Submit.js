const Submit = ({ name, avatar, email, password }) => {

  const sumbitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', avatar);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);  
    fetch('/api/user/test', {
      method: 'POST',
      body: formData
    })
  }

  return (
    <div className='submit-warning'>
      careful - you have unsaved changes
      <form onSubmit={sumbitHandler} class='buttons'>
        <div className='off-button'>reset</div>
        <input type='submit' className='primary-button green' value='save changes' />
     </form>
    </div>
  )
}

export default Submit;