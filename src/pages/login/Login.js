import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate } from 'react-router-dom';
import { fetchRooms } from "../../features/rooms";
import { login } from '../../features/user';

// import './login.css';
import PageForms from "./PageForms";
const Login = () => {
  const dispatch = useDispatch();

  const loginForm = useRef(null);
  const [rediret, setRedirect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = loginForm.current;
    fetch('/api/auth/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form['email'].value, password: form['password'].value })
    })
    .then(res => res.headers.get('auth-token'))
    .then(res => window.localStorage.setItem('auth-token', res))
    // after logging in, fetching user information
    // from /api/channels as preparation for redirect to /channels
    .then((fetch('/api/user', { 
      method: 'GET', 
      headers: {
        "content-type": "application/json",
        "Authorization": localStorage.getItem("auth-token")
      } })
      .then(res => res.json()))
      .then(data => {
        dispatch(login(data.user));
        // need to dispatch connections
        dispatch(fetchRooms(data.rooms));
        localStorage.setItem('user-data', JSON.stringify({ id: data.user.id, name: data.user.name, tag: data.user.tag }));
        localStorage.setItem('email', data.user.email);
      })
      .catch(err => {
        console.log(err)
      }))
      .catch(err => console.log(err))
  }
  return (
      <PageForms>
        { rediret && <Navigate to="/channels" /> }
        <form onSubmit={ handleSubmit } ref={loginForm} action="/api/user/login" method="POST">
          <h2>welcome back!</h2>
          <h3>We're so excited to see you again!</h3>
          <label to='email'>email</label>
          <input type="text" name="email" placeholder="" />
          <label to='password'>password</label>
          <input type="password" name="password" placeholder="" />
          <input className='submit' type="submit" value="login" />
          <button onClick={ () => setRedirect(true) }>go to channels</button>
          <div className="redirect">need an account? <Link to='/register'>Resigster</Link></div>
        </form>
    </PageForms>
  )
}


export default Login;