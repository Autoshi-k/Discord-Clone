import { Avatar, Divider, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { ListItemUser } from "../ListItemUser/ListItemUser";
import { PeopleAltIcon } from '@mui/icons-material/PeopleAlt';
import './Sidebar.css';
import SidebarUserInfo from "../SidebarUserInfo/SidebarUserInfo";
// import person1 from '../../images/person1.jpg';
// import person2 from '../../images/person2.jpg';
// import person3 from '../../images/person3.jpg';

export function Sidebar({ children }) {
  return (
    <div className="sidebar">
      { children }
      <SidebarUserInfo />
    </div>
  )
}