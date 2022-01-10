import { useRef } from "react";


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
    <div>
      <form onSubmit={handleSubmit} ref={signupForm} >
        <input type="text" name="displayName" placeholder="username" />
        <input type="text" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <input type="submit" value="sign up" />
      </form>
    </div>
  )
}

export default Signup;