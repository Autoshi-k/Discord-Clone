import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { login } from '../features/user';

const Login = () => {
  const user = useSelector(state => state.user.value);
  const dispatch = useDispatch();

  const loginForm = useRef(null);
  const [rediret, setRedirect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = loginForm.current;
    fetch('/api/user/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form['email'].value, password: form['password'].value })
    })
    .then(res => res.headers.get('auth-token'))
    .then(res => window.localStorage.setItem('auth-token', res))
    // after logging in, fetching user information
    // from /api/channels as preparation for redirect to /channels
    .then((fetch('/api/channels', { 
      method: 'GET', 
      headers: {
        "content-type": "application/json",
        "Authorization": localStorage.getItem("auth-token")
      } })
      .then(res => res.json()))
      .then(dataInArry => {
        const data = dataInArry[0]; 
        console.log(data);
        dispatch(login(data));
        localStorage.setItem('user-data', JSON.stringify({ id: data.id, displayName: data.displayName, tag: data.tag }));
        localStorage.setItem('email', data.email);
      })
      .catch(err => {
        // console.log(err)
        // if (err.status === 400) alert('Email or password is wrong');
        // alert(res.err);
      }))
      .catch(err => console.log(err))
    // if (res.status === 200) {
    //   setRedirect(true);
    // })
  }
  return (
    <div>
      { rediret && <Navigate to="/channels" /> }
      <form onSubmit={ handleSubmit } ref={loginForm} action="/api/user/login" method="POST">
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="passowrd" />
        <input type="submit" value="login" />
        <button onClick={ () => setRedirect(true) }>go to channels</button>
      </form>
    </div>
  )
}


export default Login;