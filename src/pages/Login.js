import { useEffect, useRef, useState } from "react";
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions';

const Login = ({ userAuth, login }) => {

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
    .then((fetch('/api/channels', { method: 'GET', headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("auth-token")
    } })
      .then(res => res.json()))
      .then(data => login(data))
      .catch(err => console.log(err)))
    .catch(err => console.log(err))
    // if (res.status === 200) {
    //   setRedirect(true);
    // })
  }
  console.log(userAuth);
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

const mapStateToProps = state => {
  return { userAuth: state.user }
}

// export default connect(hey)(Hi);
export default connect(mapStateToProps, { login })(Login);