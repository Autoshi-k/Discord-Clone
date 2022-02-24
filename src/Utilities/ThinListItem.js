import { useDispatch, useSelector } from "react-redux";
import { changeLocation } from "../features/location";


const ThinListItem = ({ title, icon, room, subRoom }) => {
  const location = useSelector(state => state.location.value);

  const dispatch = useDispatch();
  const changeStateLocation = () => { dispatch(changeLocation({ lobby: 'direct-messages', room, subRoom })) };

  return (
    <li className={`list-item thin ${location.subRoom === subRoom ? 'active' : ''}`} onClick={ changeStateLocation }>
      {
        icon ?
        <div>O-O</div>
        :
        null
      }
      <div className="user-name">{title.split('-').join(' ')}</div>
    </li>
  )
}

export default ThinListItem;