import { useDispatch, useSelector } from "react-redux";


const ThinListItem = ({ title, icon, room, subRoom, changeLocation, action }) => {
  const location = useSelector(state => state.location.value);
  return (
    // <li className={`list-item thin ${location.subRoom === subRoom ? 'active' : ''}`} onClick={ changeStateLocation }>
    <li className={`list-item thin ${location.subRoom === subRoom ? 'active' : ''}`} onClick={ () => action(room, subRoom) }>
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