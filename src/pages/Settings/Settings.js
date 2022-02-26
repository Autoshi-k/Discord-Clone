import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeLocation } from "../../features/location";
import { login } from "../../features/user";
import ActionButton from "../../Utilities/ActionButton";
import ThinListItem from "../../Utilities/ThinListItem";
import MyAccount from "./settingsViews/MyAccount";
import UserProfile from "./settingsViews/UserProfile";


const Settings = () => {
  const location = useSelector(state => state.location.value);

  const dispatch = useDispatch();

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

  const list = ['my-account', 'user-profile'];
  return (
    <div className='settings'>
      <div className='container-left'>
        <div className='container-list'>
          <div className='list-title bold-title thick'>user settings</div>
          <ul>
            { list.map((item, index) => <ThinListItem key={index} title={item} room='settings' subRoom={item} />) }
          </ul>
        </div>
      </div>
      <div className='container-right'>
        { location.subRoom === list[0] ? 
          <MyAccount />
          : <UserProfile />
        }
        
        <Link to='/channels' >
          <ActionButton linkButton={true} />
        </Link>
      </div>
      
    </div>
  )
}

export default Settings;