import { useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions';


const Login = ({ userAuth, login }) => {

  useEffect(() => {
     function getData () {
      fetch('/api/user')
      .then(res => res.json())
      .then(data => login(data))
      .catch(err => console.log(err));
    }
    getData();
  }, [])

  return (
    <div>
      { console.log(userAuth) }
      <form action="http://localhost:3001/auth/google" method="GET">
        <button type="submit"> GOOGLE BUTTON </button>
      </form>
      { userAuth && <Navigate to="/channels" /> }
    </div>
  )
}

const mapStateToProps = state => {
  return { userAuth: state.user }
}

// export default connect(hey)(Hi);
export default connect(mapStateToProps, { login })(Login);