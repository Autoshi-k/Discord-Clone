import { Link } from 'react-router-dom';
import clouds from '../../assets/clouds.svg';
import leftArt from '../../assets/left.svg';
import rightArt from '../../assets/right.svg';

import './Home.css';
const Home = () => {

  return (
    <div className="home">
      {/* hello world */}
      <div className="cover-text">
        <h1>IMAGINE A PLACE...</h1>
        <p>
          ...where you can belong to a school club, a gaming group, or a worldwide art community. 
          Where just you and a handful of friends can spend time together. 
          A place that makes it easy to talk every day and hang out more often.
        </p>
        <div className='home-buttons-container'>
          <Link to="/register"><div className='home-button register'>join discord now</div></Link>
          <Link to="/login"><div className='home-button login'>already have a user?</div></Link>
        </div>

      </div>
      <div aria-hidden="true" className="cover-background">
        <img src={ clouds } className="cover" alt="clouds" />
        <img src={ leftArt } className="cover" alt="left" />
        <img src={ rightArt } className="cover right" alt="right" />
      </div>
    </div>
  )
}

export default Home;