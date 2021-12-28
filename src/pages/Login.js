import { useEffect, useRef, useState } from "react";
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions';

// let user;
const Login = ({ userAuth, login }) => {

  const [user, setUser] = useState(null);
  let test;
// console.log(userAuth);
  const loginForm = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = loginForm.current;
    // console.log(form);
    // console.log(form['email'].value);
    // const [user, setUser] = useState(null);
    fetch('/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form['email'].value, password: form['password'].value })
    })
    .then(res => {
      console.log(res.status);
    if (res.status === 200) {
      fetch('/api/user')
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
    }
    // console.log(res);
    })
  }
  console.log(user);
  console.log(test);
  return (
    <div>
      <form onSubmit={ handleSubmit } ref={loginForm} action="/login" method="POST">
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="passowrd" />
        <input type="submit" value="login" />
      </form>
    </div>
  )
}

const mapStateToProps = state => {
  // console.log(state);
  return { userAuth: state.user }
}

// export default connect(hey)(Hi);
export default connect(mapStateToProps, { login })(Login);