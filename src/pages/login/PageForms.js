import backgroundImage from '../../assets/background.png';
import './login.css';

const PageForms = ({children}) => {
  return (
    <div className="page">
      <div aria-hidden="true" className="cover-background-page">
        <img src={ backgroundImage } className="cover" alt="clouds" />
      </div>
      { children }
    </div>
  )
}
export default PageForms;