import { useRef } from "react";
import { Link } from "react-router-dom";

import './login.css';

const Signup = () => {

  const signupForm = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = signupForm.current;

    fetch('/api/user/register', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayName: form['displayName'].value,email: form['email'].value, password: form['password'].value })
    })
  }
  return (
    <div className="page">
      <form onSubmit={handleSubmit} ref={signupForm} >
        <h2>create an account</h2>
        <label to='email'>email</label>
        <input type="text" name="email" placeholder="" />
        <label to='displayName'>username</label>
        <input type="text" name="displayName" placeholder="" />
        <label to='password'>password</label>
        <input type="password" name="password" placeholder="" />
        <input className='submit' type="submit" value="sign up" />
        <div className="redirect"><Link to='/signup'>Already have an account?</Link></div>
      </form>
    </div>
  )
}

export default Signup;