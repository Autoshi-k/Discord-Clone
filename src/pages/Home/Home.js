import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { login } from '../../actions';
import clouds from '../../assets/clouds.svg';
import leftArt from '../../assets/left.svg';
import rightArt from '../../assets/right.svg';
// import {getUserSessionFromServer} from '../../App';
import './Home.css';



const Home = ({ userAuth }) => {

  const [navigate, setNavigate] = useState(false);

  // useEffect(() => {
  //   if (userAuth) {
  //     setNavigate(true);
  //   } else getUserSessionFromServer();
  // }, [userAuth])
  // console.log(userAuth);

  return (
    <div className="home">
      { navigate && <Navigate to="/channels" /> }
      <div className="cover-text">
        <h1>IMAGINE A PLACE...</h1>
        <p>
          ...where you can belong to a school club, a gaming group, or a worldwide art community. 
          Where just you and a handful of friends can spend time together. 
          A place that makes it easy to talk every day and hang out more often.
        </p>
        <Link to="/login">Login</Link>
        <br />
        <Link to="/signup">signup</Link>

      </div>
      <div aria-hidden="true" className="cover-background">
        <img src={ clouds } className="cover" alt="clouds" />
        <img src={ leftArt } className="cover" alt="left" />
        <img src={ rightArt } className="cover right" alt="right" />
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  console.log(state);
  return { userAuth: state.user }
} 

export default connect(mapStateToProps, { login })(Home);