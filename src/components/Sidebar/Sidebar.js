import { Avatar, Divider, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { ListItemUser } from "../ListItemUser/ListItemUser";
import './Sidebar.css';
// import person1 from '../../images/person1.jpg';
// import person2 from '../../images/person2.jpg';
// import person3 from '../../images/person3.jpg';
import { PeopleAltIcon } from '@mui/icons-material/PeopleAlt';

export function Sidebar({ children }) {
  const users = {
    "kdfsjkf78434h3" : {
      name: "Json Smith",
      image: "https://cdn.vox-cdn.com/thumbor/8CIbT8aMgmLzG6vTzbWil2LwdWk=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19938259/3zlqxf_copy.jpg"
    },
    "kdfsjsnjncy4h3" : {
      name: "JayXx7",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXdtQ7vH2vak7mlWwZMApPOGAF8mgQXq7m5w&usqp=CAU"
    },
    "kdfsjkf78438k3" : {
      name: "Rozzet",
      image: "https://media.wired.com/photos/610c3edb72b6c4ce4375d1cf/master/pass/Gear-Memes-Gadget-Lab-1267514814.jpg"
    }
  }
  return (
    <div className="sidebar">
      <div className="list"> 
        <input type="text" placeholder="search or start a chat"/>
        <Divider />
        <ListItemUser key="friends" name="Friends" icon="PeopleAltIcon" />
        <div class="list-users">
          { Object.keys(users).map((key, index) => <ListItemUser key={index} name={users[key].name} image={users[key].image} />) }
        </div>
      </div>
    </div>
  )
}