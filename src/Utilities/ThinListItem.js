import { useDispatch, useSelector } from "react-redux";
import { changeLocation } from "../features/location";


const ThinListItem = ({ title, icon }) => {
  const location = useSelector(state => state.location.value);
  const room = 'setting';

  const dispatch = useDispatch();
  const changeStateLocation = () => {
    dispatch(changeLocation({ lobby: 'direct-messages', room, subRoom: 'online' }))
  };

  return (
    <li className={`list-item thin ${location.room === room ? 'active' : ''}`} onClick={ () => changeStateLocation() }>
      {
        icon ?
        <div>O-O</div>
        :
        null
      }
      <div className="user-name">{title}</div>
    </li>
  )
}

export default ThinListItem;