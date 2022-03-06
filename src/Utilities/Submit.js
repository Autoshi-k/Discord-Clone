const Submit = ({ avatar, color }) => {

  const sumbitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (avatar) formData.append('image', avatar);
    if (color) formData.append('color', color);
    fetch('/api/user/updateProfile', {
      method: 'POST',
      headers: { "Authorization": localStorage.getItem("auth-token") },
      body: formData
    })
    .then(res => res.json())
    .then(data => { if (data.seccuss) window.location.reload(false) })
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