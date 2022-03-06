import { useRef, useState } from "react";
import { Link, Navigate } from 'react-router-dom';

// import './login.css';
import PageForms from "./PageForms";
const Login = () => {

  const loginForm = useRef(null);
  const [rediret, setRedirect] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = loginForm.current;
    fetch('/api/auth/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form['email'].value, password: form['password'].value })
    })
    .then(res => {
      if (res.status === 200) window.localStorage.setItem('auth-token', res.headers.get('auth-token'))
      console.log(res);
      return res.json();
    })
    .then(data => {
      console.log(data);
      if (data.failed) {
        console.log(data.failed);
        setError({ 
          email: data.key ? data.key === 'email' ? true : false : true, 
          password: data.key ? data.key === 'password' ? true: false : true,
          message: JSON.stringify(data.failed) 
        });
        return;
      } else {
        localStorage.setItem('user-data', JSON.stringify({ id: data.id, name: data.name, tag: data.tag }));
        localStorage.setItem('email', data.email);
        setRedirect(true);
      }
    })
    .catch(err => console.log('err', err))
  }

  console.log(error); 
  return (
      <PageForms>
        { rediret && <Navigate to="/channels" /> }
        <form onSubmit={ handleSubmit } ref={loginForm}>
          <h2>welcome back!</h2>
          <h3>We're so excited to see you again!</h3>
          <label className={`${error.email ? 'error' : ''}`} to='email'>email<span> - {error.message}</span></label>
          <input type="text" name="email" placeholder="" />
          <label className={`${error.password ? 'error' : ''}`} to='password'>password<span> - {error.message}</span></label>
          <input type="password" name="password" placeholder="" />
          <input className='submit' type="submit" value="login" />
          <div className="redirect">need an account? <Link to='/register'>Resigster</Link></div>
        </form>
    </PageForms>
  )
}


export default Login;