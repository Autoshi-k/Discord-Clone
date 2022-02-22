import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLocation } from "../../features/location";
import { login } from "../../features/user";
import ThinListItem from "../../Utilities/ThinListItem";
import UserProfile from "./settingsViews/UserProfile";


const Settings = () => {
  const location = useSelector(state => state.location.value);
  const user = useSelector(state => state.user.value);

  const dispatch = useDispatch();

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
  }, []);

  const list = ['my account', 'user profile'];
  return (
    <div className='settings'>
      <div className='container-left'>
        <div className='container-list'>
          <div className='list-title bold-title thick'>user settings</div>
          <ul>
            { list.map((item, index) => <ThinListItem key={index} title={item} />) }
          </ul>
        </div>
      </div>
      <div className='container-right'>
        <UserProfile />
      </div>
    </div>
  )
}

export default Settings;