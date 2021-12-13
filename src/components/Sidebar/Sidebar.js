import { Avatar, Divider, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { ListItemUser } from "../ListItemUser/ListItemUser";
import { PeopleAltIcon } from '@mui/icons-material/PeopleAlt';
import './Sidebar.css';
// import person1 from '../../images/person1.jpg';
// import person2 from '../../images/person2.jpg';
// import person3 from '../../images/person3.jpg';

export function Sidebar({ children }) {
  const users = {
    "kdfsjkf78434h3" : {
      name: "Json Smith",
      // image: person1
    },
    "kdfsjsnjncy4h3" : {
      name: "JayXx7",
      // image: person2
    },
    "kdfsjkf78438k3" : {
      name: "Rozzet",
      // image: person3
    }
  }
  return (
    <div className="sidebar">
      { children }
      {/* <div className="list"> 
        <input type="text" placeholder="search or start a chat"/>
        <Divider />
        <ListItemUser key="friends" name="Friends" icon={PeopleAltIcon}/>
        <div class="list-users">
          { Object.keys(users).map((key, index) => <ListItemUser key={index} name={users[key].name} image={users[key].image} />) }
        </div>
      </div> */}
    </div>
  )
}