import { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import User from "../userContext";


function Login(params) {

  const [resAuth, setResAuth] = useState('');
  const {setUser} = useContext(User);

  useEffect(() => {
     function getData () {
      fetch('/api/user')
      .then(res => res.json())
      .then(data => setResAuth(data))
      .catch(err => console.log(err));
    }
    getData();
  }, [])

  console.log(resAuth);
  const updateUser = () => {
    console.log(resAuth);
    setUser(resAuth);
  }
  updateUser();

  return (
    <div>
      <form action="http://localhost:3001/auth/google" method="GET">
        <button type="submit"> GOOGLE BUTTON </button>
      </form>
      { resAuth && updateUser && <Navigate to="/channels" /> }
    </div>
  )
}

export default Login;