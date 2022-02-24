import { Children } from "react";

const Submit = (promps) => {

  
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(promps));
    console.log(promps);
    fetch('/api/user/update', {
      method: 'PUT',
      headers: {
        "content-type": "multipart/form-data",
        "Authorization": localStorage.getItem("auth-token"),
      },
      body: promps
    })
  }

  return (
    <div className='submit-warning'>
      careful - you have unsaved changes
      <div onSubmit={(e) => submitHandler(e)} class='buttons'>
        <div className='off-button'>reset</div>
        <input type='submit' className='primary-button green' value='save changes' />
     </div>
    </div>
  )
}

export default Submit;