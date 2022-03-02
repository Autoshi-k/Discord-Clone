const Submit = ({ name, avatar, email, password }) => {

  const sumbitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', avatar);
    fetch('/api/user/test', {
      method: 'POST',
      body: formData
    })
  }

  return (
    <div className='submit-warning'>
      careful - you have unsaved changes
      <form onSubmit={sumbitHandler} className='buttons'>
        <div className='off-button'>reset</div>
        <input type='submit' className='primary-button green' value='save changes' />
     </form>
    </div>
  )
}

export default Submit;