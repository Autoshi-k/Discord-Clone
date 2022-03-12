import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { changeLocation } from "../../features/location";
import { login, logout } from "../../features/user";
import ActionButton from "../../Utilities/ActionButton";
import ThinListItem from "../../Utilities/ThinListItem";
import MyAccount from "./settingsViews/MyAccount";
import UserProfile from "./settingsViews/UserProfile";
import { SocketContext } from '../../context/socket';



const Settings = () => {
  const location = useSelector(state => state.location.value);
  const user = useSelector(state => state.user.value);
  const [loggedOut, setLoggedOut] = useState(false);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  useEffect(() => {
    dispatch(changeLocation({ lobby: null, room: 'settings', subRoom: 'my-account' }))
  }, [dispatch])

  useEffect(() => {
    fetch('/api/user', {
      method: 'GET',
      headers: {
        "content-type": "application/json",
        "Authorization": localStorage.getItem("auth-token"),
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.err) { 
        console.log(data.err); 
        return;
      };
      dispatch(login(data.user));
    })
  }, [dispatch]);

  const handleChangeLocation = (room, subRoom) => locationDispatch(room, subRoom);
  const locationDispatch = (room, subRoom) => dispatch(changeLocation({ lobby: null, room: 'settings', subRoom }));

  const handleLogout = () => {
    // localStorage.clear();
    console.log(socket);
    socket.emit('change status', { id: user.id, newStatus: 0 });
    dispatch(logout());
    setLoggedOut(true);
  }
  // const locationDispatch = (room, subRoom) => console.log(room, subRoom);
  console.log(socket);
  const list = ['my-account', 'user-profile'];
  return (
    <>
      { loggedOut && <Navigate to='/' /> }
      <div className='settings'>
        <div className='container-left'>
          <div className='container-list'>
            <div className='list-title bold-title thick'>user settings</div>
            <ul>
              { list.map((item, index) => <ThinListItem key={index} title={item} room='settings' subRoom={item} action={handleChangeLocation} />) }
              <ThinListItem title='log-out' action={handleLogout} />
            </ul>
          </div>
        </div>
        <div className='container-right'>
          { location.subRoom === list[0] ? 
            <MyAccount />
            : <UserProfile />
          }

            <ActionButton linkButton={true} />
        </div>
        
      </div>
    </>
  )
}

export default Settings;