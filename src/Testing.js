import { useState } from "react";

export const Testing = () => {

  const [image, setImage] = useState(null);
  const sumbitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', 'shaniXDKeK');
    fetch('/api/user/test', {
      method: 'POST',
      // headers: { "content-type": "application/json" },
      body: formData
    })
  }
  const fileSelected = (e) => setImage(e.target.files[0]);
  return (
    <form onSubmit={sumbitHandler} method='POST' encrtype='multipart/form-data' action='/api/user/test'>
      <input onChange={fileSelected} type='file' name='file' accept='image/*' />
      <input type='submit' value='submit' />
    </form>
  )
}